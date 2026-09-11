'use client';
export default function WinningRows({winCat, numWinners, winAmount}: 
    {
        winCat: string,
        numWinners: number,
        winAmount: number,
        
    } ){
    return(
        <tr className="min-h-12 border-b border-gray-300">
            <td className="text-left pl-2 md:pl-9 pr-2 text-sm">{winCat}</td>
            <td className="text-right pr-2 text-sm">{numWinners}</td>
            <td className="text-right pl-2 py-2 pr-3 md:pr-9 text-sm flex flex-row flex-wrap justify-end">{winAmount}</td>
        </tr>
    );
}