import { cacheLife, cacheTag } from "next/cache";
import type { Part } from "@/constants/rulesets";
import { fetchDrawNumbers } from "./drawNumbers";
import { mulberry32, quantile } from "./random";

const SIMULATIONS = 200;

export type PartnerData = {
  draws: number;
  pool: number;
  pick: number;
  appearances: number[];   // index 1..pool: draws containing that number
  matrix: number[][];      // matrix[a][b]: draws containing both a and b
  topPairs: { a: number; b: number; count: number; expected: number }[];
  chance: { topTypical: number; topHigh: number }; // most frequent pair in a fair draw run
};

function simulatePairMax(draws: number, pick: number, pool: number, seed: number) {
  const rand = mulberry32(seed);
  const order = Array.from({ length: pool }, (_, i) => i);
  const maxima: number[] = [];

  for (let s = 0; s < SIMULATIONS; s++) {
    const counts = new Uint16Array(pool * pool);
    for (let d = 0; d < draws; d++) {
      for (let i = 0; i < pick; i++) {
        const j = i + Math.floor(rand() * (pool - i));
        const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      for (let i = 0; i < pick; i++) {
        for (let k = i + 1; k < pick; k++) {
          const a = order[i], b = order[k];
          counts[a < b ? a * pool + b : b * pool + a]++;
        }
      }
    }
    let max = 0;
    for (let i = 0; i < counts.length; i++) if (counts[i] > max) max = counts[i];
    maxima.push(max);
  }

  maxima.sort((x, y) => x - y);
  return { topTypical: quantile(maxima, 0.5), topHigh: quantile(maxima, 0.95) };
}

export async function getPartners(
  lottoCatId: number,
  rulesetIds: string[],
  part: Part = "main"
): Promise<PartnerData> {
  "use cache";
  cacheTag("lottorecords");
  cacheLife("results");

  const { draws, pick, pool } = await fetchDrawNumbers(lottoCatId, rulesetIds, part);
  if (pick < 2) throw new Error("Partners need at least two numbers per draw");

  const appearances = new Array<number>(pool + 1).fill(0);
  const matrix = Array.from({ length: pool + 1 }, () => new Array<number>(pool + 1).fill(0));

  for (const nums of draws) {
    for (let i = 0; i < nums.length; i++) {
      appearances[nums[i]]++;
      for (let j = i + 1; j < nums.length; j++) {
        matrix[nums[i]][nums[j]]++;
        matrix[nums[j]][nums[i]]++;
      }
    }
  }

  const n = draws.length;
  const expected = (n * pick * (pick - 1)) / (pool * (pool - 1));
  const pairs: PartnerData["topPairs"] = [];
  for (let a = 1; a <= pool; a++) {
    for (let b = a + 1; b <= pool; b++) pairs.push({ a, b, count: matrix[a][b], expected });
  }
  pairs.sort((x, y) => y.count - x.count || x.a - y.a || x.b - y.b);

  return {
    draws: n, pool, pick, appearances, matrix,
    topPairs: pairs.slice(0, 10),
    chance: simulatePairMax(n, pick, pool, 4242 + pool + pick),
  };
}