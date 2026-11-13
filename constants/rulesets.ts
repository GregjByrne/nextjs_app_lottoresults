// constants/rulesets.ts
export type Ruleset = {
  id: string;
  game: "lotto" | "euromillions" | "dailymillion";
  startDate: string;        // inclusive
  endDate: string | null;   // inclusive, null = current
  mainCount: number;        // num_1..num_N
  mainMax: number;
  extraKind: "bonus" | "stars";
  extraCount: number;       // 1 bonus, 2 stars (the next columns after main)
  extraMax: number;
};

export const RULESETS: Ruleset[] = [
  { id: "lotto-45-a", game: "lotto", startDate: "2006-11-04", endDate: "2015-09-04", mainCount: 6, mainMax: 45, extraKind: "bonus", extraCount: 1, extraMax: 45 },
  { id: "lotto-47",   game: "lotto", startDate: "2015-09-05", endDate: "2026-09-04", mainCount: 6, mainMax: 47, extraKind: "bonus", extraCount: 1, extraMax: 47 },
  { id: "lotto-45-b", game: "lotto", startDate: "2026-09-05", endDate: null,         mainCount: 6, mainMax: 45, extraKind: "bonus", extraCount: 1, extraMax: 45 },
  { id: "em-9",  game: "euromillions", startDate: "2008-02-01", endDate: "2011-05-05", mainCount: 5, mainMax: 50, extraKind: "stars", extraCount: 2, extraMax: 9 },
  { id: "em-11", game: "euromillions", startDate: "2011-05-06", endDate: "2016-09-26", mainCount: 5, mainMax: 50, extraKind: "stars", extraCount: 2, extraMax: 11 },
  { id: "em-12", game: "euromillions", startDate: "2016-09-27", endDate: null,         mainCount: 5, mainMax: 50, extraKind: "stars", extraCount: 2, extraMax: 12 },
  { id: "dm-39", game: "dailymillion", startDate: "2012-09-11", endDate: null,         mainCount: 6, mainMax: 39, extraKind: "bonus", extraCount: 1, extraMax: 39 },
];

export const GAME_BY_CATEGORY: Record<number, Ruleset["game"]> = {
  1: "lotto", 2: "lotto", 3: "lotto", 4: "euromillions", 5: "euromillions",
  11: "dailymillion", 12: "dailymillion", 15: "dailymillion", 16: "dailymillion",
};

export type Part = "main" | "extra";

// Which columns/pick/pool a ruleset uses for the main numbers or the extras (bonus/stars)
export function partShape(r: Ruleset, part: Part) {
  return part === "main"
    ? { start: 0, pick: r.mainCount, pool: r.mainMax }
    : { start: r.mainCount, pick: r.extraCount, pool: r.extraMax };
}