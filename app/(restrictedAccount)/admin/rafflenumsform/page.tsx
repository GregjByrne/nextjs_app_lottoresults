import { Suspense } from "react";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";
import RaffleNumbersTable from "@/components/restricted/resultsinput/insertRaffleNums/raffleNumbers";

export default async  function RaffleNumbersForm(){

    return(
        <div className="w-full space-y-4">
            <Suspense fallback={<RaffleNumbersFormSkeleton />}>
                <RaffleNumbersFormData />
            </Suspense>
        </div>
    );
};

async function RaffleNumbersFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <RaffleNumbersTable lottoCategorys={lottoCatResults ?? []} />;
}

function RaffleNumbersFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}