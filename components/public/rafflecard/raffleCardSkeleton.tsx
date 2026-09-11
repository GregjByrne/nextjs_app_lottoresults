export default function RaffleCardSkeleton({ numbersCount = 1 }: { numbersCount?: number }) {
  return (
    <div className="w-full">
      <div className="shadow my-2 lg:flex lg:justify-between bg-white rounded-t-md w-full border border-gray-400 rounded-md animate-pulse">
        <div className="w-full grid grid-flow-col grid-rows-1 gap-4">
          <div className="lg:w-full flex flex-col justify-center">
            {/* Title */}
            <div className="flex px-4 md:px-9 py-4 justify-center">
              <div className="h-5 w-52 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-row flex-wrap justify-center">
              {Array.from({ length: numbersCount }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-20 md:w-34 my-2 mx-1 sm:mx-2 rounded-full border border-gray-300 bg-gray-100"
                />
              ))}
            </div>

            <hr className="lg:w-full border-solid border-t border-gray-300 relative p-0" aria-hidden="true" />

            <div className="flex px-4 md:px-9 py-4 justify-center">
              <div className="h-4 w-3/4 max-w-md bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
