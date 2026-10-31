export default function DailyMillionDescription(){
    return(
        <section className="relative mx-auto flex flex-col items-center justify-center py-16 px-4 sm:py-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in text-white">

            <div>
                <h4 className="font-bold italic py-6 text-center [text-shadow:-5px_5px_3px_#000000] text-3xl text-white">
                About the Irish Daily Million Draws:
                </h4>
                <div>
                    <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                        The Daily Million is a popular game operated by the Irish National Lottery that takes place every day of the week, including weekends and bank holidays. Unlike the main Irish Lotto, the Daily Million jackpot is fixed at a guaranteed €1 million per draw. It does not roll over if there is no top-prize winner; instead, multiple players matching the top tier will share the €1 million prize pool.
                    </p>
                    <div className="border-t border-b border-zinc-400 mt-2 py-5">
                        <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            Draw Schedule & Entry Cut-Off Times:
                        </span>
                        <div className="pl-5">
                            <ul className="list-disc pl-5 text-sm font-normal text text-zinc-200 lg:text-left text-center">
                                <li className="px-2 py-2">
                                    <strong>Draw Frequency: </strong>Twice daily, 365 days a year.
                                </li>
                                <li className="px-2 py-2">
                                    <strong>Afternoon (Midday) Draw: </strong>Takes place at <b>2:00 PM GMT</b>. Ticket sales close strictly at <b>1:45 PM GMT.</b>
                                </li>
                                <li className="px-2 py-2">
                                    <strong>Evening Draw: </strong>Takes place at <b>9:00 PM GMT</b>. Ticket sales close strictly at <b>8:45 PM GMT.</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-b border-zinc-400 mt-2 py-5">
                        <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            Game Rules - How Daily Million & Daily Million Plus Work:
                        </span>
                        <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                            The Daily Million operates on a compact <b>6/39 matrix</b>. To play a line, you select 6 numbers from a pool of 1 to 39, or opt for a random &#34;Lucky Pick&#34;. During the live broadcast, 6 main numbers and 1 <b>Bonus Ball</b> are drawn. A single main game panel costs <b>€1.00.</b>
                        </p>
                        <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                            For an extra <b>€0.50 per line</b>, you can add the <b>Daily Million Plus</b> option. This enters your exact same 6 numbers into a secondary draw configuration that immediately follows the main game, offering an extra chance to win a top fixed prize of <b>€500,000.</b>
                        </p>
                    </div>
                    <div className="border-b border-zinc-400 mt-2 py-5">
                         <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            Daily Million vs. Daily Million Plus Prize Tiers:
                        </span>
                        <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                            Both draws feature <b>7 prize tiers</b> based on how many numbers you successfully match.
                        </p>
                        <table className="w-3al border-zinc-400 text-left text-sm text-zinc-200">
                            <thead className="text-xs text-left font-semibold uppercase tracking-wider text-zinc-200 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="px-2 py-2">Numbers Matched</th>
                                    <th scope="col" className="px-6 py-4">Main Daily Million Prize</th>
                                    <th scope="col" className="px-6 py-4">Daily Million Plus Prize</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 border-t border-slate-200 text-left">
                                <tr>
                                    <td className="px-2 py-2">Match 6 (Jackpot)</td>
                                    <td className="px-2 py-2">€1,000,000</td>
                                    <td className="px-2 py-2">€500,000</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 5 + Bonus</td>
                                    <td className="px-2 py-2">€10,000</td>
                                    <td className="px-2 py-2">€5,000</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 5</td>
                                    <td className="px-2 py-2">€500</td>
                                    <td className="px-2 py-2">€250</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 4 + Bonus</td>
                                    <td className="px-2 py-2">€100</td>
                                    <td className="px-2 py-2">€50</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 4</td>
                                    <td className="px-2 py-2">€25</td>
                                    <td className="px-2 py-2">€15</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 3 + Bonus</td>
                                    <td className="px-2 py-2">€10</td>
                                    <td className="px-2 py-2">€5</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2">Match 3</td>
                                    <td className="px-2 py-2">€3</td>
                                    <td className="px-2 py-2">€2 Scratch Card</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border-b border-zinc-400 mt-2 py-5">
                        <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            Checking Tickets & Claiming Deadlines:
                        </span>
                        <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                            To verify your ticket, ensure you check your numbers against the correct draw time (2 PM or 9 PM) printed on your receipt. The overall odds of winning any prize in the main game are <b>1 in 28</b>, which improves to <b>1 in 14</b> if you include the Plus option.
                        </p>
                        <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            The 90-Day Expiry Rule:
                        </span>
                        <p className="text-sm font-normal text text-zinc-200 text-left py-2 px-2 md:py-4 md:px-0">
                           In alignment with all games governed by the Irish National Lottery, all winning tickets for the Daily Million expire exactly <b>90 days</b> from the specific draw date. Any prizes left unclaimed after this period are allocated to the National Lottery&apos;s Good Causes fund to support community, sports, and heritage projects across Ireland.
                        </p>
                    </div>
                    <div className="border-b border-zinc-400 mt-2 py-5">
                        <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                            Frequently Asked Questions (FAQ):
                        </span>
                        <div className="mt-2 ml-4">
                            <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                                What happens if the €1 Million Daily Million jackpot isn&apos;t won?
                            </span>
                            <p className="text-sm font-normal text text-zinc-200 text-left py-1 px-2 md:py-1 md:px-0">
                                Because the Daily Million jackpot is fixed, it <b>does not roll over</b> to the next draw. If no one matches all 6 numbers, the €1 million remains in the lottery fund, and the next draw still features the exact same €1 million top prize.
                            </p>
                        </div>
                        <div className="mt-2 ml-4">
                            <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                                Can I play both the 2 PM and 9 PM draws with the same ticket?
                            </span>
                            <p className="text-sm font-normal text text-zinc-200 text-left py-1 px-2 md:py-1 md:px-0">
                                Yes. When purchasing a ticket at an authorised retailer or online, you can select whether you want to play in the next upcoming draw, or purchase a multi-draw ticket that covers consecutive afternoon and evening draws over several days.
                            </p>
                        </div>
                        <div className="mt-2 ml-4">
                            <span className="font-bold py-2 text-left text-1xl text-zinc-200 ">
                                Are Daily Million prizes subject to tax in Ireland?
                            </span>
                            <p className="text-sm font-normal text text-zinc-200 text-left py-1 px-2 md:py-1 md:px-0">
                               No. All lottery windfalls won within the Republic of Ireland are completely <b>tax-free</b> and paid as a lump sum. If you are playing from abroad via online ticket courier services, you should consult your local jurisdiction's tax policies regarding lottery winnings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



// Meta Data for Your Content Management System (CMS)

// • Meta Title: Latest Irish Daily Million Results | 2PM & 9PM Winning Numbers
// • Meta Description: Get the latest Irish Daily Million and Daily Million Plus results instantly. View winning numbers, bonus balls, and fixed prize updates for today's 2 PM and 9 PM draws.
// • Keywords: daily million results, irish daily million numbers, 2pm daily million draw, 9pm daily million results, daily million plus numbers, irish lottery checker.