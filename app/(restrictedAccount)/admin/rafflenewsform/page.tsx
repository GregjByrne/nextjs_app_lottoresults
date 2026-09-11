import RaffleNewsTable from "@/components/restricted/resultsinput/insertRaffleNews/raffleNews";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async  function RaffleNewsForm(){
    
    return(
        <div className="w-full space-y-4">
             <Suspense fallback={<RaffleNewsFormSkeleton />}>
                <RaffleNewsFormData />
            </Suspense>
        </div>
    );
};


async function RaffleNewsFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <RaffleNewsTable lottoCategorys={lottoCatResults ?? []}  />
}

function RaffleNewsFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}