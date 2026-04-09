import GlowLayout from "../layouts/GlowLayout";
import { motion } from "framer-motion";

export default function Dashboard() {
  const level = localStorage.getItem("glowLevel");

  const logout = () => {
    localStorage.removeItem("glow");
    localStorage.removeItem("glowLevel");
    window.location = "/";
  };

  return (
    <GlowLayout>
      <div className="w-full max-w-5xl bg-slate-950 rounded-2xl p-7">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl text-blue-400">
            ⚡ GLOW CYBER ARENA
          </h1>
          <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">
            Logout
          </button>
        </div>

        <p className="text-yellow-400 mb-6 text-center">
          ⚠ System suggested a level. Final choice is yours.
        </p>

        <div className="grid grid-cols-2 gap-6">

          <LevelCard
            title="Basic"
            recommended={level === "Basic"}
            link="/verybasic"
          />

          <LevelCard
            title="Intermediate"
            recommended={level === "Intermediate"}
            link="/advanced"
          />

          <LevelCard
            title="Advanced"
            recommended={level === "Advanced"}
            link="/basic"
          />

        </div>
      </div>
    </GlowLayout>
  );
}

function LevelCard({ title, recommended, link }) {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      href={link}
      className={`block p-6 rounded-xl border ${
        recommended
          ? "border-green-400 bg-green-500/20"
          : "border-blue-400/40 bg-blue-600/20"
      }`}
    >
      <h3 className="text-lg text-blue-300">{title}</h3>
      <p className="text-xs text-slate-400 mt-1">
        {recommended ? "Recommended for you" : "Available"}
      </p>
    </motion.a>
  );
}
