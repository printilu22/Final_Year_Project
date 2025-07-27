"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import DecryptedText from "@/src/TextAnimations/DecryptedText/DecryptedText";

export default function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY < 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/advisor", label: "Advisor" },
    { href: "/predictor", label: "Predictor" },
  ];

  return (
    <motion.nav
      animate={{ width: atTop ? "80%" : "30%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="
        fixed top-5 left-1/2 -translate-x-1/2
        flex justify-center items-center gap-6
        px-6 py-3 h-12
        backdrop-blur-lg bg-slate-700/20
        border border-white/20 rounded-full
        shadow-lg z-50
      "
    >
      <LayoutGroup id="nav-links">
        {navItems.map(({ href, label }) => {
          const active =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          return (
            <motion.div key={href} className="relative px-3 py-1">
              {/* Gliding neon pill */}
              {active && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded-full bg-green-400/30 backdrop-blur-sm"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              <Link
                href={href}
                className={`
                  relative font-medium transition-colors
                  ${active ? "text-green-300" : "text-muted-foreground hover:text-green-200"}
                `}
              >
                <DecryptedText
                  animateOn="view"
                  speed={0.4}
                  maxIterations={4}
                  revealDirection="start"
                  text={label}
                />
              </Link>
            </motion.div>
          );
        })}
      </LayoutGroup>
    </motion.nav>
  );
}
