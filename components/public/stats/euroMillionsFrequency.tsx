import { connection } from "next/server";
import { getFrequency } from "@/lib/analytics/frequency";
import FrequencyChart from "./frequencyChart";

export default async function EuroMillionsFrequency() {
  await connection();
  const [main, stars] = await Promise.all([
    getFrequency(4, ["em-9", "em-11", "em-12"], "main"),
    getFrequency(4, ["em-12"], "extra"),
  ]);
  return (
    <>
      <FrequencyChart title="How often each main number has been drawn (since 2008)" data={main} />
      <FrequencyChart title="How often each Lucky Star has been drawn (12-star era, since 27 Sep 2016)" data={stars} noun="star" />
    </>
  );
}