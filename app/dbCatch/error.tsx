"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
 
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong loading results.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}