// components/ClientWrapper.tsx
"use client";

import { motion } from "framer-motion";
import LoaderOverlay from "@/components/LoaderOverlay";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoaderOverlay />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.02 }}
      >
        {children}
      </motion.div>
    </>
  );
}
