"use client";

import { Shield, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import LetterGlitch from "@/src/Backgrounds/LetterGlitch/LetterGlitch";
import DecryptedText from "@/src/TextAnimations/DecryptedText/DecryptedText";
import Navbar from "@/components/Navbar";
import PixelCard from "@/src/Components/PixelCard/PixelCard";
import SpotlightCard from "@/src/Components/SpotlightCard/SpotlightCard";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex justify-center">
      {/* Glitch BG */}
      <div className="absolute inset-0 -z-10">
        <LetterGlitch glitchSpeed={10} centerVignette outerVignette smooth />
      </div>

      <Navbar />

      {/* ─── Hero banner ───────────────────────────────────────────── */}
      <div className="container w-10/12 px-4 py-12 mt-10">
        <div
          className="
            text-center mb-16 gap-4
            px-4 py-12
            backdrop-blur-lg bg-slate-700/20
            border border-white/20 rounded-md
            shadow-lg
          "
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <Lock className="h-8  w-8  text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-6">
            <DecryptedText
              text="One Platform, Two Powerful Tools"
              animateOn="view"
              speed={0.5}
              maxIterations={5}
              revealDirection="start"
            />
          </h1>

          <p className="text-muted-foreground text-lg max-w-5xl mx-auto">
            <DecryptedText
              text="Whether you need data-driven recommendations or an
                    instant"
              animateOn="view"
              speed={0.04}
              maxIterations={1}
              revealDirection="start"
            />
          </p>
          <p className="text-muted-foreground text-lg max-w-5xl mx-auto">
            <DecryptedText
              text="cipher identification, our AI-powered suite
                    has you covered."
              animateOn="view"
              speed={0.04}
              maxIterations={1}
              revealDirection="start"
            />
          </p>
        </div>

        {/* ─── Split card: Advisor | Predictor ─────────────────────── */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 gap-8
            max-w-5xl mx-auto
          "
        >
          {/* Advisor tile */}
          <SpotlightCard className="custom-spotlight-card " spotlightColor="rgba( 22, 163, 74, 0.2)">

            <div
              className="
              backdrop-blur-lg bg-slate-700/20
              border border-white/20 rounded-md
              shadow-lg p-8 space-y-4 max-h-64
              
            "
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                Advisor
                <Shield className="h-5 w-5 text-primary" />
              </h2>

              <p className="text-muted-foreground">
                Unsure which encryption algorithm suits your project?
                Describe your constraints &mdash; computational power,
                security level, real-time needs &mdash; and let our AI
                recommend the top options.
              </p>

              <Link
                href="/advisor"
                className="
                inline-flex items-center gap-1
                text-primary hover:underline font-medium
              "
              >
                Go to Advisor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SpotlightCard>


          <SpotlightCard className="custom-spotlight-card " spotlightColor="rgba( 22, 163, 74, 0.2)">

            <div
              className="
              backdrop-blur-lg bg-slate-700/20
              border border-white/20 rounded-md
              shadow-lg p-8 space-y-4 h-64
              
            "
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                Predictor
                <Lock className="h-5 w-5 text-primary" />
              </h2>

              <p className="text-muted-foreground">
                Already have an encrypted sample? Paste it in and our
                machine-learning model will analyze its statistical and
                structural features to identify the most likely algorithm
                behind the cipher.
              </p>

              <Link
                href="/predictor"
                className="
                inline-flex items-center gap-1
                text-primary hover:underline font-medium
              "
              >
                Go to Predictor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </main>
  );
}
