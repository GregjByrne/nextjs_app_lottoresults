import z  from "zod";
// **************************************************************************
// Insert Lottery Numbers Schema
export const formSchema = z.object({
  num_1: z.number().min(1).max(50),
  num_2: z.number().min(1).max(50),
  num_3: z.number().min(1).max(50),
  num_4: z.number().min(1).max(50),
  num_5: z.number().min(1).max(50),
  num_6: z.number().min(1).max(50),
  num_7: z.number().min(1).max(50),
  winValue: z.number().min(0),
  lottoCat: z.number().min(1, "Select Lottery Category"),
  inputDate: z.date(),
});
export type ResultFormValues = z.infer<typeof formSchema>;

//  Restrict the component to numeric keys - > See formFieldGroups
export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number | undefined ? K : never
}[keyof T];
// Insert Lottery Numbers Schema
// *************************************************************************

// *************************************************************************

// *************************************************************************
// Insert Lottery Winning Amounts Schema
export const winRowSchema = z.object({
  winCatId: z.number().min(1),
  numWinners: z.number().min(0),
  winAmount: z.number().min(0),
  emIrishWinners: z.number().min(0),
  emUkWinners: z.number().min(0),
  emUkWinAmount: z.number().min(0),
});

// Winning Table Row Array[objects]
export const winResultsSchema = z.object({
  lottoCat: z.number().min(1, "Select Lottery Category"),
  inputDate: z.date(),
  winRows: z.array(winRowSchema), // no fixed length
});

export type WinResultFormValues = z.infer<typeof winResultsSchema>;
// Insert Lottery Winning Amounts Schema
// *************************************************************************

// *************************************************************************
// Insert Lottery Winning News Schema
export const winningNewsSchema = z.object({
  lottoCat: z.number().min(1, "Select Lottery Category"),
  inputDate: z.date(),
  winNews: z.string(),
  // winNews: z.string().min(5, 'News Input must be at least 5 characters'),
  
});

export type WinNewsFormValues = z.infer<typeof winningNewsSchema>;
// Insert Lottery Winning News Schema
// *************************************************************************

// *************************************************************************
//
export const raffleNumbersSchema = z.object({
  lottoCat: z.number().min(1, "Select Lottery Category"),
  inputDate: z.date(),
  raffleNumbers: z.array(
    z.object({
      raffleNumber: z.string().min(1, "Enter a raffle number"),
    })
  ).min(1, "At least one raffle number is required"),
});

export type RaffleNumbersFormValues = z.infer<typeof raffleNumbersSchema>;

// *************************************************************************

// *************************************************************************
// Insert Lottery Raffle Numbers Schema
export const raffleNewsSchema = z.object({
  lottoCat: z.number().min(1, "Select Lottery Category"),
  inputDate: z.date(),
  raffleNews: z.string(),
});

export type RaffleNewsFormValues = z.infer<typeof raffleNewsSchema>;

// *************************************************************************