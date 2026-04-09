import { motion } from "framer-motion";
import CyberAssistant from "../components/CyberAssistant";

export default function GlowLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-cyan-950 text-white relative overflow-hidden">

      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,255,0.15),transparent_60%)]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        {children}
      </motion.div>

      <CyberAssistant />

    </div>
  );
}
