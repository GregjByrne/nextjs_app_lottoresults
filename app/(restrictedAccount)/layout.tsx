import { Toaster } from "sonner";
import SideBar from "@/components/restricted/adminCommon/sidenav";
import { ClerkProvider } from '@clerk/nextjs'
import { Suspense } from "react";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function SideBarSkeleton() {
  return (
    <div className="fixed top-0 left-0 h-full z-40 md:w-64 bg-black/60 backdrop-blur-md animate-pulse" />
  );
}

export default function RestrictedAccount({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <div className="bg-black/60 backdrop-blur-md text-white">
              <main className="h-screen">
              <div className="flex"> 
                <Suspense fallback={<SideBarSkeleton />}>
                  <SideBar />
                </Suspense>
                <div className="ml-20 md:ml-64 min-h-screen flex-1 p-8 bg-black/60 backdrop-blur-md border border-indigo-200 border-t-indigo-500 rounded-sm">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                  {children}
                  </div>
              </div>
              </main>
              <Toaster richColors position="top-right" />
      </div> 
      </ClerkProvider>
  );
}