"use client";

import { VolleyballIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MAIN_NAV, type NavItem } from "@/constants/mainNav";

// true on the client after hydration, false on the server (avoids a hydration mismatch for the portal)
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

function itemActive(pathname: string, item: NavItem) {
  const match = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  return item.href ? match(item.href) : !!item.children?.some((c) => match(c.href));
}

export default function MainHeader() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const [openMenu, setOpenMenu] = useState<number | null>(null); // desktop dropdown
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null); // mobile accordion
  const navRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setOpenMenu(null);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setSidebarOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const linkBase = "rounded-md px-3 py-2 text-sm text-gray-200 hover:text-blue-500 transition-colors";

  const mobileLayer = (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-100 bg-black/60 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        inert={!sidebarOpen}
        aria-label="Menu"
        className={`fixed inset-y-0 right-0 z-101 flex h-dvh w-80 max-w-[85vw] flex-col bg-slate-900 text-white shadow-xl transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <span className="font-serif text-lg font-bold bg-linear-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="rounded-md p-2 hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {MAIN_NAV.map((item, i) => {
              const active = itemActive(pathname, item);
              const row = `flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium ${
                active ? "bg-white/15 text-white" : "text-gray-200 hover:bg-white/10"
              }`;

              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link href={item.href!} onClick={closeAll} className={row}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = expanded === i;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className={row}
                  >
                    {item.label}
                    <svg
                      className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    >
                      <path d="M5.25 7.5 10 12.25 14.75 7.5z" />
                    </svg>
                  </button>
                  {isOpen && (
                    <ul className="ml-3 mt-1 space-y-1 border-l border-white/15 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={closeAll}
                            className="block rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );

  return (
    <header className="sticky top-0 z-40 block w-full px-4 py-2 mx-auto text-white bg-slate-900 shadow-md rounded-b-md lg:px-8 lg:py-3">
      <div className="container flex items-center justify-between mx-auto text-gray-100">
        {/* Logo */}
        <div className="flex justify-between gap-2">
          <VolleyballIcon className="mt-3" size={16} color="#5b53d5" />
          <Link href="/" onClick={closeAll} className="mr-2 block cursor-pointer py-1.5 text-base text-gray-200">
            <span className="font-serif text-xl font-bold bg-linear-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent">
              Irish Lotto Results
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {MAIN_NAV.map((item, i) => {
              const active = itemActive(pathname, item);
              const cls = `${linkBase} ${active ? "text-white font-medium" : ""}`;

              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link href={item.href!} onClick={closeAll} className={cls}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(i)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openMenu === i}
                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                    className={`${cls} inline-flex items-center gap-1`}
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${openMenu === i ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    >
                      <path d="M5.25 7.5 10 12.25 14.75 7.5z" />
                    </svg>
                  </button>

                  {openMenu === i && (
                    <div className="absolute left-0 top-full z-50 min-w-60 pt-2">
                      <ul className="overflow-hidden rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-white/10">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={closeAll}
                              className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-blue-400"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
          aria-expanded={sidebarOpen}
          aria-controls="mobile-sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Rendered on document.body so no header stacking context or containing block can trap it */}
      {isClient && createPortal(mobileLayer, document.body)}
    </header>
  );
}