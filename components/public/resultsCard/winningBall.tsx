'use client';
export function WinningBall({ winningNum }: {winningNum: number}){
    return(
        <div className="flex font-bold rounded-full justify-center items-center relative text-white bg-red-800 w-7 md:w-10 h-7 md:h-10 text-base md:text-2xl">{winningNum}</div>
    );
}


export function BonusBall({bonusNum}: {bonusNum: number}){
    return(
         <div className="flex font-bold rounded-full justify-center items-center relative text-white bg-red-800 w-7 md:w-10 h-7 md:h-10 text-base md:text-2xl ring-red-800 ring-2 ring-offset-4 mx-0.5 md:mx-auto">{bonusNum}</div>
    );
}