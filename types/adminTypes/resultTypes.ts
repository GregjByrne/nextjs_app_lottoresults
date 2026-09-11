// import { RowDataPacket } from "mysql2";

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
  winType: number;
  winNews: string;
};

export interface WinningRows {
  inputDate:	string;
  lottoCatId:	number;	
  winCatId:	number;	
  numWinners:	number;
  winAmount:	number;
  emIrishWinners:	number;
  emUkWinners:	number;
  emUkWinAmount:	number;
  status: number;
};

export interface TransformedResult {
  lottoCatId: number;
  inputDate: string;
  nums: number[];
  bonusNums: number[];
  winValue: number;
  winType: number;
  winNews: string;
};

export interface NumberCounts {
  numsCount: number;
  bonusStartCount: number;
  bonusEndCount: number;
};

export interface CategoryTable {
  id: number;
  lottoCat:	string;
  lottoTypeId:	number;	
  status:	number;	
}

export interface CategoryType {
  id: number;
  lottoType:	string;
  status:	number;	
}

export type CategoryGroup = number[];

export interface ResultsWinNews {
  inputDate: Date;
  lottoCatId: number;
  winNews: string;
};
