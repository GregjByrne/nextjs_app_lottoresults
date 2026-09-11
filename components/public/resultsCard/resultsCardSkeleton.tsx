function ResultsCardSkeletonItem() {

  return(
    <div className="shadow my-2 lg:flex lg:justify-between bg-white rounded-t-md w-full border border-gray-400 rounded-md animate-pulse">
      <div className="w-full grid grid-flow-col grid-rows-1 gap-4">
        <div className="lg:w-full flex flex-col justify-evenly">
          <div className="px-4 md:px-9">
          {/* Header: title/date left, prize label/amount right */}
          <div className="bg-white flex justify-between pt-3 pb-3 rounded-t-lg">
            <div className="w-60 -mb-1 space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="text-right space-y-2 flex flex-col items-end">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-6 w-32 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Winning numbers + bonus numbers */}
          <div className="pb-5 flex justify-center items-center lg:block">
            <div className="justify-center flex flex-row flex-wrap gap-6 lg:gap-10">
              <div className="flex-col">
                <div className="h-4 w-32 bg-gray-200 rounded my-1.5" />
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-1.5 md:gap-2 flex-wrap">
                    {Array.from({ length: 6 }).map((_, i) => (
                    <div
                    key={i}
                    className="rounded-full bg-gray-200 w-7 md:w-10 h-7 md:h-10"
                    />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-col">
              <div className="h-4 w-24 bg-gray-200 rounded my-1.5" />
              <div className="flex flex-col space-y-4">
              <div className="flex gap-4 md:gap-4 flex-wrap">
              {Array.from({ length: 1 }).map((_, i) => (
              <div
              key={i}
              className="rounded-full bg-gray-200 w-7 md:w-10 h-7 md:h-10 ring-gray-200 ring-2 ring-offset-4 mx-0.5 md:mx-auto"
              />
              ))}
              </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        <hr className="lg:w-full border-solid border-t border-gray-300 relative p-0" aria-hidden="true" />
        {/* Accordion trigger footer */}
          <div className="rounded-b-lg">
            <div className="border-t border-grey-300 py-2 px-4 flex flex-col justify-center items-center">
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ResultsCardSkeletonItem key={i} />
      ))}
    </div>
  );
}
