export default function ChartSkeleton({ height = "h-80" }: { height?: string }) {
  return <div className={`${height} w-full animate-pulse rounded-md bg-white/60`} />;
}