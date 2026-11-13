import Link from "next/link";
import StatsNav from "@/components/public/stats/statsNav";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";

export default function IrishLottoStatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4">
      <p className="text-sm text-gray-200">
        <Link href={S.resultsHref} className="underline">← Latest {S.gameName} Results</Link>
      </p>
      <StatsNav section={S} />
      {children}
    </div>
  );
}