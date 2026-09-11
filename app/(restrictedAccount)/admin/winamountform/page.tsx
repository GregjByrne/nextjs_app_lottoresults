
import { Suspense } from "react";
import WinningAmountTable from "@/components/restricted/resultsinput/insertAmount/winsTable";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";

export default async  function WinningAmountForm(){

    return(
        <div className="w-full space-y-4">
            <Suspense fallback={<WinningAmountFormSkeleton />}>
                <WinningAmountFormData />
            </Suspense>
        </div>
    );
};

async function WinningAmountFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <WinningAmountTable lottoCategorys={lottoCatResults ?? []} />;
}

function WinningAmountFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}