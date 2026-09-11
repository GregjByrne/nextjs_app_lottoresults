import Link from "next/link";

export default function AdminFooter(){

    return(
        <footer className="absolute bottom-0 block w-full px-4 py-2 mx-auto text-white bg-slate-900 shadow-md rounded-t-md lg:px-8 lg:py-3">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-gray-100">
            <Link href='/' className="mr-2 block cursor-pointer py-1.5 text-base text-gray-200">
              <h1 className="font-serif text-xl font-bold">Irish Lotto Results</h1>
            </Link>
            <div className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Link href='/'
                  className="flex items-center p-1 text-sm gap-x-2 text-gray-200 hover:underline underline-offset-4">
                    Admin Link
                </Link>
            </div>
        </div>
      </footer>
    );
}