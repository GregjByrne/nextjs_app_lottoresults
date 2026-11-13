export type GameKey = "lotto" | "euromillions" | "dailymillion";



export type DrawDef = {
  catId: number;
  label: string;
  mainCount: number;   // numbers in the main part
  extraCount: number;  // bonus (1) or Lucky Stars (2)
  extraLabel: string;
};

export type PreviousGame = {
  key: GameKey;
  name: string;
  href: string;
  pageSize: number;    // draw dates per page
  draws: DrawDef[];    // display order within a date
};


export const PREVIOUS_GAMES: Record<GameKey, PreviousGame> = {
  lotto: {
    key: "lotto",
    name: "Irish Lotto",
    href: "/previous-results",
    pageSize: 20,
    draws: [
      { catId: 1, label: "Lotto", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
      { catId: 2, label: "Lotto Plus 1", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
      { catId: 3, label: "Lotto Plus 2", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
    ],
  },
  euromillions: {
    key: "euromillions",
    name: "EuroMillions",
    href: "/previous-results/euromillions",
    pageSize: 20,
    draws: [
      { catId: 4, label: "EuroMillions", mainCount: 5, extraCount: 2, extraLabel: "Lucky Stars" },
      { catId: 5, label: "EuroMillions Plus", mainCount: 5, extraCount: 0, extraLabel: "" },
    ],
  },
  dailymillion: {
    key: "dailymillion",
    name: "Daily Million",
    href: "/previous-results/daily-million",
    pageSize: 14,
    draws: [
      { catId: 11, label: "Daily Million 9pm", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
      { catId: 12, label: "Daily Million Plus 9pm", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
      { catId: 15, label: "Daily Million 2pm", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
      { catId: 16, label: "Daily Million Plus 2pm", mainCount: 6, extraCount: 1, extraLabel: "Bonus" },
    ],
  },
};

export const PREVIOUS_NAV = Object.values(PREVIOUS_GAMES).map((g) => ({
  href: g.href,
  label: g.name,
}));