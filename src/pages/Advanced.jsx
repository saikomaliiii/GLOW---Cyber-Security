import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  "Nmap",
  "Wireshark",
  "Metasploit",
  "Burp Suite",
  "Splunk"
];

export default function Advanced() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center items-center bg-black relative overflow-hidden">

        {/* BACKGROUND GRID */}
        <div className="absolute inset-0 bg-[radial-gradient(#22d3ee22_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* MAIN PANEL */}
        <div className="relative max-w-5xl w-full bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-cyan-400/40 shadow-[0_0_40px_#22d3ee44]">

          {/* HEADER */}
          <h1 className="text-4xl text-cyan-300 mb-2 text-center font-bold tracking-widest">
            INTERMEDIATE - CYBER SECURITY TOOLS
          </h1>

          <p className="text-center text-cyan-400/70 mb-10 text-sm tracking-[0.3em]">
            CYBER INTELLIGENCE TERMINAL
          </p>

          {/* MODULE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {modules.map((m,i)=>(

              <motion.div
                key={i}
                onClick={()=>navigate(`/advanced/${i+1}`)}

                whileHover={{ scale:1.05 }}
                whileTap={{ scale:0.98 }}

                className="
                  group
                  relative
                  cursor-pointer
                  bg-gradient-to-br
                  from-cyan-900/20
                  to-black
                  p-6
                  rounded-xl
                  border
                  border-cyan-400/30
                  hover:border-cyan-400
                  hover:shadow-[0_0_30px_#22d3ee88]
                  transition
                  duration-300
                "
              >

                {/* SCAN LINE */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 animate-pulse" />

                {/* MODULE ID */}
                <div className="text-cyan-400 text-xs mb-2 tracking-widest">
                  [ OPERATION {i+1} ]
                </div>

                {/* TITLE */}
                <h3 className="text-xl text-white font-bold mb-2">
                  {m.split(" – ")[0]}
                </h3>

                {/* SUBTITLE */}
                <p className="text-slate-400 text-sm mb-4">
                  {m.split(" – ")[1]}
                </p>

                {/* ACCESS BUTTON */}
                <div
                  className="
                    inline-block
                    px-4
                    py-1.5
                    text-xs
                    tracking-widest
                    bg-cyan-500/90
                    text-black
                    rounded
                    font-bold
                    group-hover:bg-cyan-400
                    transition
                  "
                >
                  INITIATE →
                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </GlowLayout>
  );
}