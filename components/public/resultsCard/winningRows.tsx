'use client';

const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const EURO_MILLIONS_CAT_ID = 4;


export default function WinningRows({winCat, numWinners, emIrishWinners, winAmount, lottoCatId}: 
    {
        winCat: string,
        numWinners: number,
        emIrishWinners: number,
        winAmount: number,
        lottoCatId: number,  
    } ){
    const showIrishWinners = lottoCatId === EURO_MILLIONS_CAT_ID;
    return (
        <tr className="min-h-12 border-b border-gray-300">
            <td className="text-left pl-2 md:pl-9 pr-2 text-sm">{winCat}</td>
            <td className="text-right pr-2 text-sm">{numWinners}</td>
            {showIrishWinners && (
                <td className="text-right pr-2 text-sm">{emIrishWinners}</td>
            )}
            <td className="text-right pl-2 py-2 pr-3 md:pr-9 text-sm">
                {euro.format(winAmount)}
            </td>
        </tr>
  );
}