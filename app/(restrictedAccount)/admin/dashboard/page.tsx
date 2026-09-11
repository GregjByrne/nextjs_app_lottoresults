import ResultForm from "@/components/restricted/resultsinput/form/resultsform";
import { getLottoCategorys } from "@/lib/adminQueries/select/admingetinfo";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function DashboardPage(){
     
    return(
        <div className="w-full space-y-4">
            <Suspense fallback={<DashboardPageFormSkeleton />}>
            <DashboardPageFormData />
            </Suspense>
        </div>
    );
};

async function DashboardPageFormData() {
  await auth.protect(); // first line, inside the Suspense-wrapped child

  const lottoCatResults = await getLottoCategorys();

  return <ResultForm lottoCategorys={lottoCatResults}  />
}

function DashboardPageFormSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}
