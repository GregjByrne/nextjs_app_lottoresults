import ListResults from "@/components/restricted/resultsUpdate/listresults";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function ReviewResults(){
    
    return(
            <div className="w-full space-y-4">
                 <Suspense fallback={<ReviewResultsFormSkeleton />}>
                    <ReviewResultsFormData />
                </Suspense>
            </div>
        );
    
};


async function ReviewResultsFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <ListResults lottoCategorys={lottoCatResults ?? []}  />
}

function ReviewResultsFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}