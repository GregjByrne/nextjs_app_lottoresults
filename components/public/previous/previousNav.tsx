"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PreviousNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  return (
    <nav aria-label="Previous results by game" className="my-2">
      <ul className="flex flex-wrap gap-1 sm:gap-2">
        {items.map((i) => {
          const active = pathname === i.href;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full border px-1 sm:px-3 py-1.5 text-sm ${
                  active
                    ? "border-indigo-700 bg-indigo-700 text-white"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-indigo-50"
                }`}
              >
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}