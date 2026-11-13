'use client';

import {
  Bar, BarChart, CartesianGrid, Rectangle, ReferenceArea, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import type { FrequencyResult } from '@/lib/analytics/frequency'; // type only, erased at build

const COLORS = { within: '#94a3b8', above: '#d97706', below: '#2563eb' } as const;

export default function FrequencyChart({ title, data, noun = "number", description }:
  { title: string; data: FrequencyResult; noun?: string; description?: string }) {
  const { rows, expected, band, draws } = data;
  const low = expected - band;
  const high = expected + band;

  const status = (count: number): keyof typeof COLORS =>
    count > high ? 'above' : count < low ? 'below' : 'within';

  const outside = rows.filter((r) => status(r.count) !== 'within').length;
  const byChance = Math.round(rows.length * 0.0455 * 10) / 10; // ~4.55% fall outside ±2σ by chance

  return (
    <div className=" mb-4 pb-2 border-b border-gray-400">
      <section className="w-full rounded-md border border-gray-400 bg-white p-4 shadow my-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
       <p className="mt-1 text-sm text-gray-600">
        {description ??
          `Based on ${draws.toLocaleString("en-IE")} draws. If every ${noun} were equally likely, each would appear about ${expected.toFixed(0)} times. The shaded band shows normal random variation.`}
       </p>

        <div
          className="mt-3 h-72 w-full"
          role="img"
          aria-label={`${title}. Bar chart of how many times each number has been drawn. ${outside} of ${rows.length} ${noun}s fall outside the normal range; about ${byChance} would be expected by chance.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="number" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} width={40} domain={[0, 'auto']} />
              <ReferenceArea y1={low} y2={high} fill="#6366f1" fillOpacity={0.12} ifOverflow="extendDomain" />
              <ReferenceLine y={expected} stroke="#4338ca" strokeDasharray="6 4" />
              <Tooltip
                cursor={{ fill: 'rgba(99,102,241,0.08)' }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const r = payload[0].payload as { number: number; count: number };
                  const s = status(r.count);
                  const diff = r.count - expected;
                  return (
                    <div className="rounded border border-gray-300 bg-white px-3 py-2 text-xs shadow">
                      <p className="font-semibold">
                        <span className="capitalize">{noun}</span> {r.number}
                      </p>
                      <p>Drawn {r.count} times</p>
                      <p>{diff >= 0 ? '+' : ''}{diff.toFixed(1)} vs expected ({expected.toFixed(1)})</p>
                      <p>
                        {s === 'within' ? 'Within normal variation'
                          : s === 'above' ? 'Above the normal range' : 'Below the normal range'}
                      </p>
                    </div>
                  );
                }}
              />
              <Bar
                  dataKey="count"
                  isAnimationActive={false}
                  shape={(props) => (
                      <Rectangle
                      {...props}
                      fill={COLORS[status(props.payload.count)]}
                      radius={[2, 2, 0, 0]}
                      />
                  )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
          <li><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.above }} />Above normal range</li>
          <li><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.within }} />Within normal range</li>
          <li><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.below }} />Below normal range</li>
        </ul>

        <p className="mt-2 text-sm text-gray-700">
          {outside} of {rows.length} numbers sit outside the band. With this many numbers, about {byChance} would
          be expected to do so by chance alone. Past frequency does not predict future draws.
        </p>

        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-indigo-700">View as a table</summary>
          <table className="mt-2 w-full text-left text-xs">
            <thead><tr><th className="p-1">Number</th><th className="p-1">Times drawn</th><th className="p-1">vs expected</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.number} className="border-t">
                  <td className="p-1">{r.number}</td>
                  <td className="p-1">{r.count}</td>
                  <td className="p-1">{(r.count - expected >= 0 ? '+' : '') + (r.count - expected).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>
    </div>
  );
}