import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { BonusBall, WinningBall } from "@/components/public/resultsCard/winningBall";
import { convertResults, getCategoryGroups } from "@/utils/publicFunctions/resultCardFunctions";
import { getWinningsByCategoryAndDate } from "@/lib/publicQueries/winningRows";
import { getResultsByCategoryAndDate, getLatestDate } from "@/lib/publicQueries/lottoRecords";
import { LottoCategoryName, WinCategoryName } from "@/constants/lottoCategories";
import { notFound } from "next/navigation";
import { BonusNumberLabel, TopPriceLabel } from "@/constants/lottoLookups";
import WinningRows from "@/components/public/resultsCard/winningRows";


export default async function ResultsCard({catid}: {catid: number}){

   const latestDate = await getLatestDate(catid);
   if(!latestDate){
       return notFound();
    }
   const categoryGroup = getCategoryGroups(catid);
   const winningDetails = await getWinningsByCategoryAndDate(categoryGroup, latestDate);
   if(!winningDetails || winningDetails.length === 0){
       return notFound();
    }
    const results = await getResultsByCategoryAndDate(categoryGroup, latestDate);
    if(!results || results.length === 0){
       return notFound();
    }

    const rows = results;
    const winnigrows = winningDetails;
    const resultSections = convertResults(rows);

    return(
      <div className="w-full">
      {resultSections.map(section => (
        <div key={section.lottoCatId} className="shadow my-2 lg:flex lg:justify-between bg-white rounded-t-md w-full border border-gray-400 rounded-md ">
            <div className="w-full grid grid-flow-col grid-rows-1 gap-4">
              <div className="lg:w-full flex flex-col justify-evenly">
                <div className="px-4 md:px-9">
                  <div className="bg-white flex justify-between pt-3 pb-3 rounded-t-lg">
                    <div className="w-60 -mb-1">
                        <h3 className="font-serif text-xl font-bold text-red-600">{LottoCategoryName[section.lottoCatId]}</h3>
                        <span className="font-serif text-gray-500">{section.inputDate}</span>
                    </div>
                    <div className="text-right font-serif text-gray-500">
                        <p className="text-bold text-base ">
                          <span className="font-bold">{TopPriceLabel[section.lottoCatId]}</span>
                        </p>
                        <p className="font-black text-xl">{section.winValue.toLocaleString("en-IE", {
                                                                                            style:"currency", 
                                                                                            currency:"EUR",
                                                                                            minimumFractionDigits: 0,
                                                                                            maximumFractionDigits: 0,
                                                                                            })}
                        </p>
                    </div>
                  </div>
                  <div className="pb-5 flex justify-center items-center lg:block">
                    <div className="justify-center flex flex-row flex-wrap gap-6 lg:gap-10">
                      <div className="flex-col">
                        <div className="leading-5 font-bold py-1.5">Winning numbers</div>
                        <div className="flex flex-col space-y-4">
                          <div className="flex gap-1.5 md:gap-2 flex-wrap">
                            {section.nums.map(num =>(
                                <WinningBall key={num} winningNum={num} />
                            ))}
                          </div>
                        </div>
                      </div>
                        <div className="flex-col">
                        <div className="leading-5 font-bold py-1.5">{BonusNumberLabel[section.lottoCatId]}</div>
                        <div className="flex flex-col space-y-4">
                          <div className="flex gap-4 md:gap-4 flex-wrap">
                            {section.bonusNums.map((num, indx) => (
                              <BonusBall key={indx} bonusNum={num}  />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="lg:w-full border-solid border-t border-gray-300 relative p-0" aria-hidden='true'></hr>
                <div className="rounded-b-lg">
                  <div className="overflow-hidden group">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <div className="border-t border-grey-300 py-2 px-4 flex flex-col justify-center group-hover:bg-gray-lighter-01">
                          <div className="flex justify-center cursor-pointer leading-normal text-base font-bold group-hover:text-blue-prompt items-center">
                            <AccordionTrigger className="cursor-pointer">View prize breakdown</AccordionTrigger>
                          </div>
                        </div>
                        <AccordionContent>
                        <div aria-hidden="true" className="duration-700 transition-all ease-in-out flex-1 overflow-hidden">
                            <div className="bg-gray-100 pt-1">
                              <div className="text-center p-2 m-2 bg-message-info-light rounded-md border border-blue-lighter-02">
                                <p className="text-sm">
                                   {section.winNews}
                                </p>
                              </div>
                              <div>
                                <table className="table-fixed w-full">
                                  <thead>
                                    <tr className="text-sm">
                                      <th className="p-2 md:pl-9 min-h-12 w-1/4 text-left">Match</th>
                                      <th className="sm:px-3 p-2 min-h-12 w-1/4 text-right">Winners</th>
                                      <th className="p-2 pr-3 md:pr-9 min-h-12 w-1/4 text-right">Prize</th>
                                    </tr>
                                     {winnigrows
                                      .filter(w => w.lottoCatId === section.lottoCatId)
                                      .map((wrow, idx) =>(
                                          <WinningRows 
                                              key={idx} 
                                              winCat={WinCategoryName[wrow.winCatId]} 
                                              numWinners={wrow.numWinners} 
                                              winAmount={wrow.winAmount} 
                                          /> 
                                      ))}
                                  </thead>
                                </table>
                              </div>
                            </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                  </div>
                </div>
            </div>
          </div>
        </div>))}
        </div>
    );
};