import Link from "next/link";

export default function MainFooter(){
    return(
        <footer className="bg-[#1B3465] bg-footer-star md:bg-footer-star-tablet bg-no-repeat bg-bottom-right w-full">
            <search className="bg-[#1E2A3C] mt-2 flex lg:justify-center lg:items-center h-6 text-white overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    
                </div>
            </search>
            <div className="max-w-5xl lg:mt-12 lg:my-0 lg:mx-auto  text-white">
                <div className="flex flex-col items-center lg:items-stretch lg:flex-row lg:gap-7 lg:pb-10 pb-4 border-b">
                        <div className="w-full text-center lg:text-left lg:w-64 grow">
                            <div>
                                <h3 className="grow text-center lg:text-left font-montserrat lg:font-buendia">Link:</h3>
                            </div>
                            <div className="flex flex-col gap-2 text-lg p-4 lg:p-0 lg:flex">
                                <div>
                                    <Link href="/#IrishLotto" className="text-sm text-white hover:text-blue-500 hover-underline-animation center">Irish Lottery</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-center lg:text-left lg:w-64 grow">
                            <div>
                                <h3 className="grow text-center lg:text-left font-montserrat lg:font-buendia">Link:</h3>
                            </div>
                            <div className="flex flex-col gap-2 text-lg p-4 lg:p-0 lg:flex">
                                <div>
                                    <Link href="/#EuroMillions" className="text-sm text-white hover:text-blue-500 hover-underline-animation center">Euro Millions</Link>
                                </div>
                            </div>

                        </div>
                        <div className="w-full text-center lg:text-left lg:w-64 grow">
                            <div>
                                <h3 className="grow text-center lg:text-left font-montserrat lg:font-buendia">Link:</h3>
                            </div>
                            <div className="flex flex-col gap-2 text-lg p-4 lg:p-0 lg:flex">
                                <div>
                                    <Link href="/#DailyMillion" className="text-sm text-white hover:text-blue-500 hover-underline-animation center">Daily Million</Link>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="flex flex-col items-center lg:items-stretch lg:flex-row lg:gap-7 lg:pb-10 pb-4 border-b">
                    <p className="text-sm font-normal text text-white lg:text-left text-center py-4 px-4 lg:px-0">
                        Irish Lotto is one of Ireland&apos;s best-known lottery games, with draws now scheduled every Monday, Wednesday and Saturday. For players interested in Irish Lotto betting, the game offers a familiar national lottery format based on choosing six main numbers from a 45-ball pool, with an additional bonus ball drawn to support extra prize opportunities. Its simple structure, regular draw schedule and long-running popularity make Irish Lotto a strong choice for customers who enjoy traditional lotto markets alongside other major draws such as EuroMillions and Daily Million.
                    </p>
                </div>
                <div className="flex lg:flex-row pt-6 pb-8 flex-col px-4 lg:px-0">
                    <div className="flex flex-row">
                        <div className="text-xs text-white  pl-4 lg:mr-40 pb-4 lg:pb-0">
                            <div>
                                Lottery results are provided for informational purposes only and should be checked against the official lottery operator before making any claims or decisions. We do our best to ensure results are accurate and up to date, but we cannot accept responsibility for errors, delays, or omissions.
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-white shrink-0">
                        <div className="lg:size-fit flex justify-end">
                           ©2026 Conuresites
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1E2A3C] flex lg:justify-center lg:items-center h-2 text-white overflow-hidden">
                
            </div>
      </footer>
    );
};