// lookup map -> Linked to enums types/lotto.ts
import { LottoCategory, WinningCategory } from "@/types/enums/lottoEnums";

export const LottoCategoryName: Record<number, string> = {
  [LottoCategory.LottoResults]: "Lotto Results",
  [LottoCategory.LottoPlus1]: "Lotto Plus 1",
  [LottoCategory.LottoPlus2]: "Lotto Plus 2",
  [LottoCategory.EuroMillions]: "Euro Millions",
  [LottoCategory.EuroMillionsPlus]: "Euro Millions Plus",
  [LottoCategory.DailyMillion9pm]: "Daily Million (9pm)",
  [LottoCategory.DailyMillionPlus9pm]: "Daily Million Plus (9pm)",
  [LottoCategory.DailyMillion2pm]: "Daily Million (2pm)",
  [LottoCategory.DailyMillionPlus2pm]: "Daily Million Plus (2pm)",
};

// Import 
// const name = LottoCategoryName[row.lottoCatId];

export const WinCategoryName: Record<number, string> = {
  [WinningCategory.Jackpot_T1]: "Jackpot",
  [WinningCategory.FivePlusTwo_T2]: "5 + 2 Lucky Stars",
  [WinningCategory.FivePlusOne_T1]: "Match 5 + Bonus",
  [WinningCategory.FivePlusOne_T2]: "5 + 1 Star",
  [WinningCategory.Five_T1]: "Match 5",
  [WinningCategory.FourPlusOne_T1]: "Match 4 + Bonus",
  [WinningCategory.FourPlusTwo_T2]: "4 + 2 Stars",
  [WinningCategory.FourPlusOne_T2]: "4 + 1 Star",
  [WinningCategory.Four_T1]: "Match 4",
  [WinningCategory.ThreePlusOne_T1]: "Match 3 + Bonus",
  [WinningCategory.ThreePlusTwo_T2]: "3 + 2 Stars",
  [WinningCategory.TwoPlusTwo_T2]: "2 + 2 Stars",
  [WinningCategory.ThreePlusOne_T2]: "3 + 1 Star",
  [WinningCategory.Three_T1]: "Match 3",
  [WinningCategory.OnePlusTwo_T2]: "1 + 2 Stars",
  [WinningCategory.TwoPlusOne_T2]: "2 + 1 Star",
  [WinningCategory.Two_T2]: "Match 2",
  [WinningCategory.TwoPlusOne_T1]: "Match 2 + Bonus",
  [WinningCategory.TopPrize_T1]: "Top Prize",
};

export const RAFFLE_ELIGIBLE_CATEGORY_IDS = [1, 4]; // Irish Lotto, Euro Millions — adjust to your actual IDs