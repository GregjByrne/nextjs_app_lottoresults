'use client';

import { useState } from 'react';
import FrequencyChart from './frequencyChart';
import type { PartnerData } from '@/lib/analytics/partners';

export default function PartnerExplorer({ title, data, noun = 'number' }:
  { title: string; data: PartnerData; noun?: string }) {
  const { draws, pool, pick, appearances, matrix, topPairs, chance } = data;
  const [selected, setSelected] = useState(topPairs[0]?.a ?? 1);

  const q = (pick - 1) / (pool - 1);
  const n = appearances[selected];
  const expected = n * q;
  const band = 2 * Math.sqrt(n * q * (1 - q));

  const partners: { number: number; count: number }[] = [];
  for (let y = 1; y <= pool; y++) if (y !== selected) partners.push({ number: y, count: matrix[selected][y] });

  const most = [...partners].sort((a, b) => b.count - a.count || a.number - b.number).slice(0, 3);
  const least = [...partners].sort((a, b) => a.count - b.count || a.number - b.number).slice(0, 3);
  const list = (items: { number: number; count: number }[]) =>
    items.map((p) => `${p.number} (${p.count}×)`).join(', ');

  const top = topPairs[0];
  const verdict = top.count > chance.topHigh
    ? 'higher than chance usually produces'
    : 'within the normal range for chance';

  return (
    <div className=" mb-4 pb-2 border-b border-gray-400">
      <section className="my-2 w-full rounded-md border border-gray-400 bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">Choose a {noun} to see which {noun}s were drawn alongside it.</p>

        <div role="group" aria-label={`Choose a ${noun}`} className="mt-2 flex flex-wrap gap-1">
          {Array.from({ length: pool }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setSelected(num)}
              aria-pressed={num === selected}
              className={`h-8 w-8 rounded-full border text-xs font-semibold ${
                num === selected
                  ? 'border-indigo-700 bg-indigo-700 text-white'
                  : 'border-gray-400 bg-white text-gray-900 hover:bg-indigo-50'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <FrequencyChart
          title={`${noun[0].toUpperCase()}${noun.slice(1)}s drawn alongside ${selected}`}
          noun={noun}
          data={{ draws: n, expected, band, rows: partners }}
          description={`In the ${n.toLocaleString('en-IE')} draws where ${selected} came up, each other ${noun} would be expected about ${expected.toFixed(1)} times if the draw is fair. The shaded band shows normal random variation.`}
        />

        <p className="mt-2 text-sm text-gray-800">
          <strong>Most often alongside {selected}:</strong> {list(most)}.{' '}
          <strong>Least often:</strong> {list(least)}.
        </p>

        <h3 className="mt-4 text-base font-semibold text-gray-900">Most common pairs overall</h3>
        <table className="mt-1 w-full text-left text-sm">
          <thead>
            <tr><th className="p-1">Pair</th><th className="p-1">Times together</th><th className="p-1">Expected</th><th className="p-1">Ratio</th></tr>
          </thead>
          <tbody>
            {topPairs.map((p) => (
              <tr key={`${p.a}-${p.b}`} className="border-t">
                <td className="p-1 font-medium">{p.a} &amp; {p.b}</td>
                <td className="p-1">{p.count}</td>
                <td className="p-1">{p.expected.toFixed(1)}</td>
                <td className="p-1">{(p.count / p.expected).toFixed(2)}×</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-gray-700">
          Across {draws.toLocaleString('en-IE')} draws, the most common pair appeared {top.count}×. In a fair draw run of
          this length the most common pair typically appears {chance.topTypical}× (almost never more than {chance.topHigh}×),
          so this is {verdict}. With this many possible pairs, some always look standout by chance. Past results do not
          predict future draws.
        </p>
      </section>
    </div>
  );
}