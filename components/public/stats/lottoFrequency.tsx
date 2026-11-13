import { connection } from "next/server";
import { getFrequency } from "@/lib/analytics/frequency";
import FrequencyChart from "./frequencyChart";

const POOLED_45 = ["lotto-45-a", "lotto-45-b"]; // keep this order the same everywhere (cache key)

export default async function LottoFrequency() {
  await connection();
  const [main, bonus] = await Promise.all([
    getFrequency(1, POOLED_45, "main"),
    getFrequency(1, POOLED_45, "extra"),
  ]);

  return (
    <>
      <FrequencyChart title="How often each main number has been drawn (6/45 rules)" data={main} />
      <FrequencyChart title="How often each bonus number has been drawn (6/45 rules)" data={bonus} noun="bonus" />
    </>
  );
}