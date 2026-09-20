export interface ResultsRows {
  id: number;
  lottoCatId:	number;
  inputDate:	string;
  num_1:	number;	
  num_2:	number;	
  num_3:	number;
  num_4:	number;
  num_5:	number;
  num_6:	number;
  num_7:	number;
  winValue: number;
  winType?: number;
  winNews: string | null;
};

export interface TransformedResult {
  lottoCatId: number;
  inputDate: string;
  nums: number[];
  bonusNums: number[];
  winValue: number;
  winNews: string | null;
};

export interface NumberCounts {
  numsCount: number;
  bonusStartCount: number;
  bonusEndCount: number;
};

export type CategoryGroup = number[];