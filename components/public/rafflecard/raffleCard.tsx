import { getLatestDate } from "@/lib/publicQueries/lottoRecords";
import { getRaffleNumbers } from "@/lib/publicQueries/rafflenumbers";
import { getRaffleNews } from "@/lib/publicQueries/rafflenews";

export default async function RaffleCard({ catid }: { catid: number }) {
  const latestDate = await getLatestDate(catid);

  if (!latestDate) return null;

  const inputDate = new Date(latestDate);

  const [raffleNumbers, raffleNews] = await Promise.all([
    getRaffleNumbers(catid, inputDate),
    getRaffleNews(catid, inputDate),
  ]);

  if (raffleNumbers.length === 0) return null; // no raffle data for this draw, don't render an empty card

  const raffleSelection = [
    {
      lottoCatId: catid,
      nums: raffleNumbers.map((r) => r.raffleNumber),
      raffleNews: raffleNews?.raffleNews ?? "",
    },
  ];

  return (
    <div className="w-full">
      {raffleSelection.map((section) => (
        <div key={section.lottoCatId} className="shadow my-2 lg:flex lg:justify-between bg-white rounded-t-md w-full border border-gray-400 rounded-md ">
          <div className="w-full grid grid-flow-col grid-rows-1 gap-4">
            <div className="lg:w-full flex flex-col justify-center">
              <div className="flex px-4 md:px-9 py-4 justify-center">
                <h6 className="text-lg font-bold text-gray-800">Winning Raffle Numbers</h6>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {section.nums.map((num, idx) => (
                  <div key={idx} className="flex justify-center font-bold py-1 px-1 h-9 md:w-34 my-2 mx-1 sm:mx-2 text-sm sm:text-base rounded-full border border-gray-300 bg-gray-100">
                    {num}
                  </div>
                ))}
              </div>
              <hr className="lg:w-full border-solid border-t border-gray-300 relative p-0" aria-hidden="true" />
              <div className="flex px-4 md:px-9 py-4 justify-center">
                <p className="text-sm text-gray-600">{section.raffleNews}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}