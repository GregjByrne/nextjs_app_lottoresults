import { VolleyballIcon } from "lucide-react";
import Link from "next/link";

const navLinks = [
    {
        href: '#IrishLotto',
        label: 'Irish Lotto',
    },
    {
        href: '#EuroMillions',
        label: 'Euro Millions',
    },
    {
        href: '#DailyMillion',
        label: 'Daily Million',
    },
]

export default function MainHeader(){
    return(
        <header className="sticky top-0 z-40 block w-full px-4 py-2 mx-auto text-white bg-slate-900 opacity-98 shadow-md rounded-b-md lg:px-8 lg:py-3">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-gray-100">
          <div className="flex justify-between gap-2">
           <VolleyballIcon className="mt-3" size={16} color="#5b53d5" />
            <Link href='/' className="mr-2 block cursor-pointer py-1.5 text-base text-gray-200">
              <h1 className="font-serif text-xl font-bold bg-linear-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent">Irish Lotto Results</h1>
            </Link>
            </div>
            <nav className="flex gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
              {navLinks.map(({ href, label }) => (
                <Link 
                  href={href}
                  key={label}
                  className="flex items-center p-1 text-sm gap-x-2 text-gray-200 underline-offset-4 hover:text-blue-500 hover-underline-animation center"
                >
                  {label}
                </Link>
              ))}
            </nav>
        </div>
      </header>
    );
};