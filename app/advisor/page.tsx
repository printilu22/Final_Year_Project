// app/advisor/page.tsx            ← put it in the App-Router side
// or pages/advisor.tsx            ← if you must keep the Pages router
"use client";

import { useState } from "react";
import LetterGlitch from "@/src/Backgrounds/LetterGlitch/LetterGlitch";
import Navbar from "@/components/Navbar";
import DecryptedText from "@/src/TextAnimations/DecryptedText/DecryptedText";
// …rest of component unchanged

import { FileType, Form } from "@/components/form";
import { ResultCard } from "@/components/result-card";

export default function Advisor() {
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async (data: {
    fileType: FileType;
    computationalPower: string;
    securityLevel: string;
    realTime: boolean;
    crossPlatform: boolean;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const algorithms = await res.json();
      setResult(algorithms);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden flex justify-center">
      <div className="absolute inset-0 -z-10">
        <LetterGlitch glitchSpeed={10} centerVignette outerVignette smooth />
      </div>

      <Navbar />

      <div className="container w-10/12 px-4 py-12 mt-10">
        <div
          className="
            text-center mb-12 gap-2
            px-6 py-6
            backdrop-blur-lg bg-slate-700/20
            border border-white/20 rounded-md
            shadow-lg
            transition-colors duration-300
          "
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <DecryptedText
              animateOn="view"
              speed={0.5}
              maxIterations={5}
              revealDirection="start"
              text="Encryption Algorithm Advisor"
            />
          </h1>

          <p className="text-muted-foreground max-w-5xl mx-auto">
            <DecryptedText
              animateOn="view"
              speed={0.05}
              maxIterations={1}
              revealDirection="start"
              text="Fill in the form and we'll suggest "
            />
          </p>
          <p className="text-muted-foreground max-w-5xl mx-auto">
            <DecryptedText
              animateOn="view"
              speed={0.05}
              maxIterations={1}
              revealDirection="start"
              text="the best encryption algorithms for your scenario."
            />
          </p>
        </div>

        {/* ─── Form + Results grid ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Form type="advisor" onSubmit={getRecommendations} loading={loading} />
          <ResultCard headline="Most Recommended Algorithms" results={result} loading={loading} />
        </div>
      </div>
    </main>
  );
}
