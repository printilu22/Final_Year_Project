"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";
import GlassCard from "./Glasscard";

interface ResultCardProps {
  results: string[];
  loading: boolean;
  headline: string;
}

const ProgressLoader = () => {
  const [progress, setProgress] = useState(0);

  // piece-wise mapping: elapsed-ms → progress-percent
  const calc = (ms: number) => {
    if (ms <= 480) return (ms / 480) * 33;                              // 0-33 %
    if (ms <= 600) return 33;                                           // pause #1 (120 ms)
    if (ms <= 1_260) return 34 + ((ms - 600) / 660) * 46;                 // 34-80 %
    if (ms <= 1_380) return 80;                                           // pause #2 (120 ms)
    if (ms <= 1_500) return 80 + ((ms - 1_380) / 120) * 20;               // 80-100 %
    return 100;
  };

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const loop = (t: number) => {
      const p = Math.min(calc(t - start), 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const message =
    progress < 33
      ? "Sending request"
      : progress < 80
        ? "Generating response"
        : "Formatting text";

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[400px] h-full w-full">
      {/* --- progress bar -------------------------------------------------- */}
      <div className="w-full h-2 bg-muted rounded overflow-hidden">
        <div
          className="h-full bg-green-400 animate-glitch"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* --- glitch text --------------------------------------------------- */}
      <div className="relative text-green-400 font-mono text-sm tracking-widest">
        <div className="absolute inset-0 animate-glitch">
          <span className="opacity-70">{message}</span>
        </div>
        <div className="absolute inset-0 animate-glitch-delay">
          <span className="opacity-30">{message}</span>
        </div>
        <span className="relative z-10">{message}</span>
      </div>
    </div>
  );
};
/* ------------------------------------------------------------------ */

export function ResultCard({ results, loading, headline }: ResultCardProps) {
  return (
    <GlassCard className="p-6 min-h-[500px] h-full">
      <div className="space-y-4 h-full">
        {/* headline */}
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">{headline}</h2>
        </div>

        {/* body */}
        {loading ? (
          headline === "Most Probable Algorithm" ? (
            <ProgressLoader />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] h-full text-muted-foreground">
              <Loader2 className="text-green-700 h-6 w-6 animate-spin " />
            </div>
          )
        ) : results.length ? (
          <div className="space-y-4">
            {results.map((algorithm) => (
              <Card key={algorithm} className="p-4 bg-muted">
                <p className="font-medium">{algorithm}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px] h-full text-muted-foreground">
            <p>Fill out the form to get algorithm recommendations</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
