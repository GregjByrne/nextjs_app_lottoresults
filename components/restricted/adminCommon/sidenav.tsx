'use client'

import { FileInputIcon, FileSearchCornerIcon, SquareMenuIcon, SquareXIcon, VolleyballIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import LogoutLink from "@/components/restricted/adminCommon/logout";

export default function SideBar(){

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return(
        <div className={`fixed top-0 left-0 h-full z-40 md:w-64 bg-black/60 backdrop-blur-md transition-width duration-300 text-white
                        ${isOpen ? "w-64" : "w-20"}`}>
            <div className="mt-2 ml-1 flex flex-col items-start p-4">
                <div className="flex flex-row">
                    <VolleyballIcon className={`mt-2 md:block ${isOpen ? "block" : "hidden"}`} size={16} color="#5b53d5" />
                    <h2 className={`text-xl font-bold md:block ms-3 font-serif bg-linear-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent ${isOpen ? "block" : "hidden"}`}>Lottery Results</h2>
                    <div className="mt-2 ml-4 flex items-end">
                    <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <SquareXIcon size={24} color="white" /> : <SquareMenuIcon size={24} color="white" />}
                    </button>
                    </div>
                </div>
                
            </div>
            <nav className=" mt-4 pl-2 text-sm"> 
                <ul className={`md:block ${isOpen ? "block" : "hidden"}`}>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
                        <Link className={'flex items-center rounded-sm hover:bg-blue-600 w-50'} href='/admin/dashboard'>
                            <FileInputIcon size={16} color="#3921e8" />
                            <span className="ml-4 md:block">
                                Winning Numbers:
                            </span>
                         </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/winamountform' ? 'active' : ''}`}>
                        <Link className="flex items-center rounded-sm hover:bg-blue-600 w-50"  href='/admin/winamountform'>
                            <FileInputIcon size={16} color="#3921e8" />
                            <span className="ml-4">
                                Winning Amounts:
                            </span>
                        </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/winnewsform' ? 'active' : ''}`}>
                         <Link className="flex items-center rounded-sm hover:bg-blue-600 w-50"  href='/admin/winnewsform'>
                            <FileInputIcon size={16} color="#3921e8" />
                                <span className="ml-4">
                                Winning News:
                            </span>
                        </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/rafflenumsform' ? 'active' : ''}`}>
                         <Link className="flex items-center rounded-sm hover:bg-blue-600 w-50"  href='/admin/rafflenumsform'>
                            <FileInputIcon size={16} color="#3921e8" />
                                <span className="ml-4">
                                Raffle Numbers:
                            </span>
                        </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/rafflenewsform' ? 'active' : ''}`}>
                         <Link className="flex items-center rounded-sm hover:bg-blue-600 w-50"  href='/admin/rafflenewsform'>
                            <FileInputIcon size={16} color="#3921e8" />
                                <span className="ml-4">
                                Raffle News:
                            </span>
                        </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/reviewresults' ? 'active' : ''}`}>
                         <Link className="flex items-center rounded-sm hover:bg-blue-600 w-50"  href='/admin/reviewresults'>
                            <FileSearchCornerIcon size={16} color="#3921e8"  />
                            <span className="ml-4">
                                Review Results:
                            </span>
                        </Link>
                    </li>
                    <li className={`py-1 adminNavLink ${pathname === '/admin/logout' ? 'active' : ''}`}>
                        <LogoutLink />
                    </li>
                </ul>
            </nav>
        </div>

    );
};