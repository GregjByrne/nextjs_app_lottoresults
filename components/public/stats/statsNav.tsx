'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { StatsSection } from '@/constants/statsNav';

export default function StatsNav({ section }: { section: StatsSection }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const activeRef = useRef<HTMLAnchorElement>(null);

  const items = [
    { href: section.base, label: 'Overview' },
    ...section.pages.map((p) => ({ href: `${section.base}/${p.slug}`, label: p.title })),
  ];

  // Keep the current tab visible when the strip is scrollable
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [pathname]);

  return (
    <nav aria-label={`${section.gameName} statistics`} className="my-2">
      <div
        className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden
                   mask-[linear-gradient(to_right,black_calc(100%-32px),transparent)]
                   md:mx-0 md:px-0 md:mask-none"
      >
        <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
          {items.map((i) => {
            const active = pathname === i.href;
            return (
              <li key={i.href} className="shrink-0">
                <Link
                  ref={active ? activeRef : undefined}
                  href={i.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-full border px-3 py-1.5 text-sm whitespace-nowrap ${
                    active
                      ? 'border-indigo-700 bg-indigo-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900 hover:bg-indigo-50'
                  }`}
                >
                  {i.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}