import WinNewsTable from "@/components/restricted/resultsinput/insertNews/winnNewsForm";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async  function WinningNewsForm(){
    
    return(
        <div className="w-full space-y-4">
             <Suspense fallback={<WinningNewsFormSkeleton />}>
                <WinningNewsFormData />
            </Suspense>
        </div>
    );
};


async function WinningNewsFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <WinNewsTable lottoCategorys={lottoCatResults ?? []}  />
}

function WinningNewsFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}