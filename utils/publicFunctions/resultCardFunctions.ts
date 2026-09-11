import { NumberCounts, ResultsRows, TransformedResult } from "@/types/publicTypes/resultsTypes";
import { HasBonusNumbers } from "@/constants/bonusRules";

// *********************************************************************************************

// Internal Functions for ResultsCard Component

// *********************************************************************************************


export function FromatLongDate(inputDate: string) {
   const fdate = new Date(inputDate);
   const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    };

    return fdate.toLocaleDateString('en-GB', options);
    // toLocaleDateString can cause a Hydration Mismatch error if the server's timezone/locale is different from the user's browser
};


// Defines the Lotto Results structure required for the function convertResults();
function getNumsCount(lottoCatId: ResultsRows['lottoCatId']): NumberCounts {
    
    if(lottoCatId === 5){
        return{
            numsCount: 5,
            bonusStartCount: 6,
            bonusEndCount: 6,
        }
    }else if(lottoCatId === 4){
      return{
            numsCount: 5,
            bonusStartCount: 6,
            bonusEndCount: 7,
        }
    }
    else{
        return{
            numsCount: 6,
            bonusStartCount: 7,
            bonusEndCount: 7,
        }
    }
};

// *********************************************************************************************

// Export Functions for ResultsCard Component

// *********************************************************************************************

// Convert singular Category to Category Groups
export function getCategoryGroups(lottoCatId: number): number[] {
  switch(lottoCatId){
    case 1:
      return [1, 2, 3];
    case 4:
      return [4, 5];
    case 11:
      return [11, 12];
    case 15:
      return [15, 16];
    default:
      return [];
  }
};

// Converts Database LottoResult Arrays / Objects in required structure
export function convertResults(rows: ResultsRows[]): TransformedResult[] {
  return rows.map(row => {
    const nums = [];
    const bonusNums = [];
    const counts = getNumsCount(row.lottoCatId);

    for (let i = 1; i <= counts.numsCount; i++) {
      nums.push(row[`num_${i}` as keyof ResultsRows] as number);
    };
    if(HasBonusNumbers[row.lottoCatId]){
      for (let i = counts.bonusStartCount; i <= counts.bonusEndCount; i++) {
        bonusNums.push(row[`num_${i}` as keyof ResultsRows] as number);
      };
    }
    
    return {
      lottoCatId: row.lottoCatId,
      inputDate: FromatLongDate(row.inputDate),
      nums,
      bonusNums,
      winValue: row.winValue,
      winType: row.winType,
      winNews: row.winNews,
    };
  });
};