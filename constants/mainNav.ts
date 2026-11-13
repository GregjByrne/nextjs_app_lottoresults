import { ALL_STATS_SECTIONS } from "./statsNav";

export type NavLink = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavLink[] };

export const MAIN_NAV: NavItem[] = [
  {
    label: "Lottery Results",
    children: [
      { label: "Irish Lotto Results", href: "/" },
      { label: "EuroMillions Results", href: "/euromillions-results" },
      { label: "Daily Million Results", href: "/daily-million-results" },
    ],
  },
  {
    label: "Lottery Statistics",
    // built from the stats config, so a new game appears automatically
    children: ALL_STATS_SECTIONS.map((s) => ({
      label: `${s.gameName} Statistics`,
      href: s.base,
    })),
  },
  { label: "Previous Results", href: "/previous-results" },
  { label: "Lottery News", href: "/lottery-news" },
];