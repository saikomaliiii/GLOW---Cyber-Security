import { useState } from "react";

export default function CyberAssistant() {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "CYBER OPS ASSISTANT ONLINE — Awaiting command." }
  ]);

  // 💀 INTELLIGENT RESPONSE ENGINE
  const respond = (q) => {

  const t = q.toLowerCase();

  // =========================
  // 🟢 VERY BASIC LEVEL
  // =========================

  if (t.includes("beginner") || t.includes("start") || t.includes("no knowledge"))
    return "Recommended Path: VERY BASIC → Cyber Foundations. Begin with 'Network Foundations' module.";

  if (t.includes("network") || t.includes("internet"))
    return "Go to VERY BASIC → Module 1: Network Foundations.";

  if (t.includes("what is cybersecurity") || t.includes("cyber basics"))
    return "Go to VERY BASIC → Module 2: Cybersecurity Basics.";

  if (t.includes("hacker") || t.includes("attack types"))
    return "Go to VERY BASIC → Module 3: Hackers & Attacks.";

  if (t.includes("password") || t.includes("authentication"))
    return "Go to VERY BASIC → Module 4: Passwords & Authentication.";

  if (t.includes("privacy") || t.includes("safe online"))
    return "Go to VERY BASIC → Module 5: Digital Safety & Privacy.";

  // =========================
  // 🟡 INTERMEDIATE TOOLS
  // =========================

  if (t.includes("scan") || t.includes("nmap"))
    return "INTERMEDIATE → Operation 1: Nmap. Use for network reconnaissance.";

  if (t.includes("traffic") || t.includes("packets") || t.includes("wireshark"))
    return "INTERMEDIATE → Operation 2: Wireshark. Analyze network traffic.";

  if (t.includes("exploit") || t.includes("metasploit"))
    return "INTERMEDIATE → Operation 3: Metasploit. Exploitation framework.";

  if (t.includes("web attack") || t.includes("burp") || t.includes("sql") || t.includes("xss"))
    return "INTERMEDIATE → Operation 4: Burp Suite. Web application testing.";

  if (t.includes("logs") || t.includes("siem") || t.includes("splunk"))
    return "INTERMEDIATE → Operation 5: Splunk. Threat detection via logs.";

  // =========================
  // 🔴 ADVANCED OPERATIONS
  // =========================

  if (t.includes("advanced authentication"))
    return "ADVANCED → Unit 1: Authentication Operations.";

  if (t.includes("phishing") || t.includes("email scam"))
    return "ADVANCED → Unit 2: Phishing Detection.";

  if (t.includes("malware") || t.includes("virus") || t.includes("ransomware"))
    return "ADVANCED → Unit 3: Malware Defense.";

  if (t.includes("network security") || t.includes("soc"))
    return "ADVANCED → Unit 4: Network Security.";

  if (t.includes("incident response") || t.includes("breach"))
    return "ADVANCED → Unit 5: Incident Response Simulation.";

  // =========================
  // 🧠 CAREER & LEARNING PATH
  // =========================

  if (t.includes("roadmap") || t.includes("career"))
    return "Suggested Path: VERY BASIC → INTERMEDIATE → ADVANCED. Progress through modules sequentially.";

  // =========================
  // 👋 GREETING
  // =========================

  if (t.includes("hi") || t.includes("hello"))
    return "Cyber Mentor AI active. State learning objective.";

  // =========================
  // ❌ UNKNOWN / OUTSIDE SCOPE
  // =========================

  return "Query not mapped. Start from VERY BASIC level or specify a cybersecurity topic.";
};

  const send = () => {
    if (!input.trim()) return;

    const user = { role: "user", text: input };
    const bot = { role: "bot", text: respond(input) };

    setMessages([...messages, user, bot]);
    setInput("");
  };

  return (
    <>
      {/* 💀 FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-black border border-green-500 text-green-400 px-4 py-3 rounded-full shadow-[0_0_15px_#00ff00]"
      >
        AI
      </button>

      {/* 🛡️ CHAT WINDOW */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-96 h-[500px] bg-black border border-green-500 flex flex-col shadow-[0_0_25px_#00ff00]">

          {/* HEADER */}
          <div className="p-3 border-b border-green-700 text-green-400 flex justify-between items-center">
            CYBER OPS ASSISTANT
            <span className="text-xs text-green-600">ONLINE</span>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 text-green-300 font-mono space-y-2">

            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                {m.role === "bot" ? ">> " : "$ "}
                {m.text}
              </div>
            ))}

          </div>

          {/* INPUT */}
          <div className="flex border-t border-green-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1 bg-black p-3 outline-none text-green-400 font-mono"
              placeholder="Enter query..."
            />
            <button
              onClick={send}
              className="px-4 text-green-400 hover:text-green-200"
            >
              EXEC
            </button>
          </div>

        </div>
      )}
    </>
  );
}