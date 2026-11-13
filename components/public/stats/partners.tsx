import { connection } from "next/server";
import { getPartners } from "@/lib/analytics/partners";
import PartnerExplorer from "./partnerExplorer";

export default async function Partners({ lottoCatId, rulesetIds, part = "main", title, noun }: {
  lottoCatId: number; rulesetIds: string[]; part?: "main" | "extra"; title: string; noun?: string;
}) {
  await connection();
  const data = await getPartners(lottoCatId, rulesetIds, part);
  return <PartnerExplorer title={title} data={data} noun={noun} />;
}