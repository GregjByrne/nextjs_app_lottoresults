import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { RULESETS, GAME_BY_CATEGORY } from "@/constants/rulesets";
import { mulberry32 } from "./random";

const SIMS = 200_000;

type MetricKey = "sum" | "range" | "consecutive" | "oddEven" | "lowHigh";
type Tails = { le: Float64Array; ge: Float64Array };

export type Metric = {
  key: MetricKey;
  label: string;
  value: string;
  detail: string;
  verdict: "typical" | "uncommon" | "rare";
};

export type Typicality = {
  inputDate: string;
  numbers: number[];
  score: number; // 0-100: % of simulated fair draws that are LESS typical than this one
  headline: string;
  metrics: Metric[];
  simulated: number;
};

type Model = {
  low: number;
  counts: Record<MetricKey, Uint32Array>;
  tails: Record<MetricKey, Tails>;
  sortedAvg: Float64Array;
};

const models = new Map<string, Model>(); // deterministic (seeded), so safe to memoise per process

function tails(counts: Uint32Array, total: number): Tails {
  const n = counts.length;
  const le = new Float64Array(n);
  const ge = new Float64Array(n);
  let run = 0;
  for (let v = 0; v < n; v++) { run += counts[v]; le[v] = run / total; }
  run = 0;
  for (let v = n - 1; v >= 0; v--) { run += counts[v]; ge[v] = run / total; }
  return { le, ge };
}

// 1 = dead centre of the distribution, near 0 = far into a tail
const typ = (t: Tails, v: number) => Math.min(1, 2 * Math.min(t.le[v], t.ge[v]));

function metricsOf(nums: number[], low: number): Record<MetricKey, number> {
  const s = [...nums].sort((a, b) => a - b);
  let sum = 0, odd = 0, lowCount = 0, consecutive = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s[i];
    if (s[i] % 2 === 1) odd++;
    if (s[i] <= low) lowCount++;
    if (i > 0 && s[i] === s[i - 1] + 1) consecutive++;
  }
  return { sum, range: s[s.length - 1] - s[0], consecutive, oddEven: odd, lowHigh: lowCount };
}

function buildModel(pool: number, pick: number): Model {
  const key = `${pool}/${pick}`;
  const hit = models.get(key);
  if (hit) return hit;

  const rand = mulberry32(7919 + pool * 31 + pick);
  const low = Math.floor(pool / 2);
  const counts: Record<MetricKey, Uint32Array> = {
    sum: new Uint32Array(pick * pool + 1),
    range: new Uint32Array(pool),
    consecutive: new Uint32Array(pick),
    oddEven: new Uint32Array(pick + 1),
    lowHigh: new Uint32Array(pick + 1),
  };
  const per: Record<MetricKey, Uint16Array> = {
    sum: new Uint16Array(SIMS), range: new Uint16Array(SIMS), consecutive: new Uint16Array(SIMS),
    oddEven: new Uint16Array(SIMS), lowHigh: new Uint16Array(SIMS),
  };

  const order = Array.from({ length: pool }, (_, i) => i + 1);
  const keys = Object.keys(counts) as MetricKey[];

  for (let s = 0; s < SIMS; s++) {
    for (let i = 0; i < pick; i++) {
      const j = i + Math.floor(rand() * (pool - i));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    const m = metricsOf(order.slice(0, pick), low);
    for (const k of keys) { counts[k][m[k]]++; per[k][s] = m[k]; }
  }

  const t = {} as Record<MetricKey, Tails>;
  for (const k of keys) t[k] = tails(counts[k], SIMS);

  const avg = new Float64Array(SIMS);
  for (let i = 0; i < SIMS; i++) {
    let a = 0;
    for (const k of keys) a += typ(t[k], per[k][i]);
    avg[i] = a / keys.length;
  }
  avg.sort();

  const model = { low, counts, tails: t, sortedAvg: avg };
  models.set(key, model);
  return model;
}

function countBelow(sorted: Float64Array, x: number) {
  let lo = 0, hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < x - 1e-12) lo = mid + 1; else hi = mid;
  }
  return lo;
}

const pct = (p: number) => `${(p * 100).toFixed(1)}%`;
const verdictOf = (t: number): Metric["verdict"] => (t < 0.02 ? "rare" : t < 0.1 ? "uncommon" : "typical");

export async function getLatestTypicality(lottoCatId: number): Promise<Typicality | null> {
  "use cache";
  cacheTag("lottorecords");
  cacheLife("results");

  const row = await prisma.lottorecords.findFirst({
    where: { lottoCatId },
    orderBy: { inputDate: "desc" },
    select: { inputDate: true, num_1: true, num_2: true, num_3: true, num_4: true, num_5: true, num_6: true },
  });
  if (!row) return null;

  const iso = row.inputDate.toISOString().slice(0, 10);
  const game = GAME_BY_CATEGORY[lottoCatId];
  const rules = RULESETS.find(
    (r) => r.game === game && iso >= r.startDate && (r.endDate === null || iso <= r.endDate)
  );
  if (!rules) return null;

  const pool = rules.mainMax;
  const pick = rules.mainCount;
  const numbers = [row.num_1, row.num_2, row.num_3, row.num_4, row.num_5, row.num_6].slice(0, pick);

  const model = buildModel(pool, pick);
  const m = metricsOf(numbers, model.low);
  const keys = Object.keys(model.counts) as MetricKey[];
  const typicality = {} as Record<MetricKey, number>;
  for (const k of keys) typicality[k] = typ(model.tails[k], m[k]);

  const avg = keys.reduce((a, k) => a + typicality[k], 0) / keys.length;
  const score = Math.round((100 * countBelow(model.sortedAvg, avg)) / SIMS);

  const share = (k: MetricKey) => model.counts[k][m[k]] / SIMS;
  const mean = (k: MetricKey) => model.counts[k].reduce((a, c, v) => a + c * v, 0) / SIMS;
  const atLeast = model.tails.consecutive.ge[m.consecutive];

  const metrics: Metric[] = [
    {
      key: "sum", label: "Total of the numbers", value: String(m.sum),
      detail: `The average draw adds up to ${mean("sum").toFixed(0)}. ${pct(share("sum"))} of random draws add up to exactly ${m.sum}.`,
      verdict: verdictOf(typicality.sum),
    },
    {
      key: "range", label: "Spread (highest minus lowest)", value: String(m.range),
      detail: `The average spread is ${mean("range").toFixed(0)}. ${pct(share("range"))} of random draws have exactly this spread.`,
      verdict: verdictOf(typicality.range),
    },
    {
      key: "consecutive", label: "Consecutive pairs", value: String(m.consecutive),
      detail: m.consecutive === 0
        ? `No two numbers were next to each other, which happens in ${pct(share("consecutive"))} of random draws.`
        : `${pct(atLeast)} of random draws have at least ${m.consecutive} consecutive pair${m.consecutive > 1 ? "s" : ""}.`,
      verdict: verdictOf(typicality.consecutive),
    },
    {
      key: "oddEven", label: "Odd / even split", value: `${m.oddEven} odd, ${pick - m.oddEven} even`,
      detail: `${pct(share("oddEven"))} of random draws split exactly this way.`,
      verdict: verdictOf(typicality.oddEven),
    },
    {
      key: "lowHigh", label: `Low (1–${model.low}) / high (${model.low + 1}–${pool})`,
      value: `${m.lowHigh} low, ${pick - m.lowHigh} high`,
      detail: `${pct(share("lowHigh"))} of random draws split exactly this way.`,
      verdict: verdictOf(typicality.lowHigh),
    },
  ];

  const rarest = metrics.find((x) => x.verdict === "rare") ?? metrics.find((x) => x.verdict === "uncommon");
  const headline =
    score >= 80 ? "A very typical draw"
    : score >= 20 ? "An ordinary draw"
    : score >= 5 ? "A slightly unusual draw"
    : "An unusual draw";

  return {
    inputDate: iso,
    numbers,
    score,
    headline: rarest && score < 20 ? `${headline}: ${rarest.label.toLowerCase()} stood out` : headline,
    metrics,
    simulated: SIMS,
  };
}