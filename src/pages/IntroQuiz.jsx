import GlowLayout from "../layouts/GlowLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroQuiz() {
  const navigate = useNavigate();

  const [stage, setStage] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setStage("quiz"), 4000);
    return () => clearTimeout(t);
  }, []);

  const questions = [
    { q: "Which protocol maps IP address to MAC address?", a: ["DNS", "ARP", "SMTP", "HTTP"], c: 1 },
    { q: "Which attack targets human psychology?", a: ["SQL Injection", "DDoS", "Phishing", "XSS"], c: 2 },
    { q: "Default port for HTTPS?", a: ["21", "80", "443", "25"], c: 2 },
    { q: "Which is NOT part of CIA triad?", a: ["Confidentiality", "Integrity", "Availability", "Authorization"], c: 3 },
    { q: "Which password is strongest?", a: ["admin123", "password", "Qw12!", "9$F!aZ#2"], c: 3 }
  ];

  const answer = i => {
    if (i === questions[qIndex].c) setScore(s => s + 1);

    if (qIndex === 4) {
      const finalScore = i === questions[qIndex].c ? score + 1 : score;

      let lvl;
      if (finalScore >= 4) lvl = "Advanced";
      else if (finalScore === 3) lvl = "Intermediate";
      else lvl = "Basic";

      setLevel(lvl);
      localStorage.setItem("glowLevel", lvl);

      setStage("result");
    } else {
      setQIndex(q => q + 1);
    }
  };

  return (
    <GlowLayout>
      <AnimatePresence>

        {stage === "intro" && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3 }}
              className="text-blue-400 text-4xl font-bold"
            >
              PHISHING • FIREWALL • ENCRYPTION • MALWARE • IDS
            </motion.div>
          </motion.div>
        )}

        {stage === "quiz" && (
          <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
            <div className="bg-slate-900 p-6 rounded-xl w-[420px]">
              <h2 className="text-blue-400 mb-4">
                Question {qIndex + 1}/5
              </h2>

              <p className="text-slate-200 mb-4">
                {questions[qIndex].q}
              </p>

              {questions[qIndex].a.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  className="block w-full text-left bg-slate-800 hover:bg-blue-600/30 px-4 py-2 rounded mb-2"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "result" && (
          <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-xl text-center">
              <h2 className="text-2xl text-blue-400 mb-3">
                Cyber Readiness Result
              </h2>

              <p className="text-green-400 text-xl mb-6">
                You belong to: {level} Level
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-500 px-6 py-2 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        )}

      </AnimatePresence>
    </GlowLayout>
  );
}
