import { connection } from "next/server";
import { getFrequency } from "@/lib/analytics/frequency";
import FrequencyChart from "./frequencyChart";

export default async function DailyMillionFrequency({
  lottoCatId,
  label,
}: {
  lottoCatId: 11 | 15;
  label: string; // e.g. "9pm draw"
}) {
  await connection();
  const [main, bonus] = await Promise.all([
    getFrequency(lottoCatId, ["dm-39"], "main"),
    getFrequency(lottoCatId, ["dm-39"], "extra"),
  ]);

  return (
    <>
      <FrequencyChart title={`How often each main number has been drawn (${label})`} data={main} />
      <FrequencyChart title={`How often each bonus number has been drawn (${label})`} data={bonus} noun="bonus" />
    </>
  );
}