"use client";

import { useState, useEffect } from "react";
import { Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoaderOverlay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 100); // Adjust delay if needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="animate-pulse flex items-center gap-3">
            <Shield className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-green-500 mt-4">Initializing Secure Environment...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoaderOverlay;
