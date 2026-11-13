import PreviousNav from "@/components/public/previous/previousNav";
import { PREVIOUS_NAV } from "@/constants/previousResults";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="relative mx-auto flex flex-col items-center justify-center pb-16 px-4 sm:pb-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in">
        <h1 className="mb-2 text-2xl font-bold text-white">Previous Lottery Results</h1>
        <PreviousNav items={PREVIOUS_NAV} />
        <p className="text-sm py-4 mt-1 text-gray-200">
          Looking for past Irish National Lottery numbers? Browse our complete archive of previous lottery results for the Irish Lotto, Daily Million, and EuroMillions. Whether you are checking an older ticket or analysing historical data, we cover every main draw alongside Lotto Plus 1, Lotto Plus 2, Daily Million Plus, and EuroMillions Plus. Easily search winning numbers, bonus balls, Lucky Stars for all draws to see if you are a winner.
        </p>
        <div className="mt-4 w-full">{children}</div>
      </section>
    </div>
  );
}