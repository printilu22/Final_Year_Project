"use client";

import { useState } from "react";
import LetterGlitch from "@/src/Backgrounds/LetterGlitch/LetterGlitch";
import Navbar from "@/components/Navbar";
import DecryptedText from "@/src/TextAnimations/DecryptedText/DecryptedText";
import { FileType, Form } from "@/components/form";
import { ResultCard } from "@/components/result-card";
import { predictEncryption } from "../api/recommendations/route";

export default function Predictor() {
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (values: {
    encryptedText: string;
  }) => {
    try {
      setResult([]);
      setError(null);
      setLoading(true);
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encryptedText: values.encryptedText }),
      });

      const data = await response.json();
      if (data.prediction) {
        const predictionArray = Array.isArray(data.prediction)
          ? data.prediction
          : [data.prediction];
        setResult(predictionArray);
      } else {
        throw new Error(data.error || "Failed to get prediction");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <LetterGlitch glitchSpeed={10} centerVignette outerVignette smooth />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-10">
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
              text="Encryption Algorithm Predictor"
            />
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            <DecryptedText
              animateOn="view"
              speed={0.05}
              maxIterations={1}
              revealDirection="start"
              text="Fill in the encrypted text and we'll predict "
            />
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <DecryptedText
              animateOn="view"
              speed={0.05}
              maxIterations={1}
              revealDirection="start"
              text="the encryption algorithm used."
            />
          </p>
        </div>

        {/* ─── Form + Results grid ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Form type="predictor" onSubmit={handlePredict} loading={loading} />
          <ResultCard headline="Most Probable Algorithm" results={result} loading={loading} />
        </div>
      </div>
    </main>
  );
}
