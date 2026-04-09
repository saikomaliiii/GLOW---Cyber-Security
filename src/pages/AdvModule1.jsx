import { useState } from "react";

export default function NmapImmersiveLab() {
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState([
    "NMAP TRAINING ENVIRONMENT v1.0",
    "Type 'help' to view available commands.",
  ]);

  // 💀 REALISTIC NMAP SIMULATION ENGINE
  const simulateNmap = (input) => {
    const targetMatch = input.match(/\b\d{1,3}(\.\d{1,3}){3}\b/);
    const target = targetMatch ? targetMatch[0] : "unknown";

    const portsMatch = input.match(/-p\s*([0-9,\-]+)/);
    const ports = portsMatch ? portsMatch[1] : "22,80,443";

    let res = [
      "Starting Nmap 7.94 ( https://nmap.org )",
      `Scanning ${target}...`,
      "Host is up (0.0015s latency).",
      "",
    ];

    // 🔹 Host discovery only
    if (input.includes("-sn")) {
      res.push(
        `Nmap scan report for ${target}`,
        "Host is up.",
        "",
        "Nmap done: 1 IP address (1 host up) scanned."
      );
      return res;
    }

    // 🔹 Port scan results
    res.push("PORT     STATE SERVICE");

    const portList = ports === "-" ? ["1-65535"] : ports.split(",");

    portList.forEach((p) => {
      if (p === "22") res.push("22/tcp   open  ssh");
      else if (p === "80") res.push("80/tcp   open  http");
      else if (p === "443") res.push("443/tcp  open  https");
      else res.push(`${p}/tcp   closed unknown`);
    });

    // 🔹 Service detection
    if (input.includes("-sV")) {
      res.push("", "SERVICE VERSION DETECTION:");
      res.push("ssh   OpenSSH 8.2");
      res.push("http  Apache 2.4.57");
    }

    // 🔹 OS detection
    if (input.includes("-O")) {
      res.push("", "OS DETAILS:");
      res.push("Linux kernel 5.x");
    }

    // 🔹 Aggressive
    if (input.includes("-A")) {
      res.push("", "Aggressive scan enabled");
      res.push("Traceroute: 1 hop");
    }

    // 🔹 Stealth
    if (input.includes("-sS")) {
      res.push("", "SYN Stealth scan used");
    }

    // 🔹 UDP
    if (input.includes("-sU")) {
      res.push("", "UDP scan: No open UDP ports found");
    }

    // 🔹 Timing
    const timing = input.match(/-T[0-5]/);
    if (timing) res.push("", `Timing template: ${timing[0]}`);

    // 🔹 NSE
    if (input.includes("--script")) {
      res.push("", "Running NSE scripts...");
      res.push("Potential vulnerability: CVE-XXXX-XXXX");
    }

    res.push("", "Nmap done: 1 IP address scanned.");
    return res;
  };

  const execute = () => {
    if (!cmd.trim()) return;

    const input = cmd.trim();

    // 💻 REAL NMAP COMMAND
    if (input.startsWith("nmap")) {
      const res = simulateNmap(input);
      setLog([...log, `$ ${input}`, ...res]);
      setCmd("");
      return;
    }

    // 🧠 TRAINING COMMANDS
    let output = [];

    switch (input) {
      case "help":
        output = [
          "Available commands:",
          "theory   — Reconnaissance theory",
          "install  — Installation guide",
          "commands — Full Nmap manual",
          "task     — Mission objective",
          "",
          "You can also run real Nmap commands directly.",
        ];
        break;

      case "theory":
  output = [
    "================ NMAP RECONNAISSANCE THEORY ================",
    "",
    "1. WHAT IS RECONNAISSANCE?",
    "Reconnaissance is the information-gathering phase of a cyber attack.",
    "Before exploitation, an attacker must understand the target surface:",
    "  • Which hosts are alive?",
    "  • Which ports are open?",
    "  • What services are running?",
    "  • What operating systems are used?",
    "",
    "Without recon, attacks are blind and inefficient.",
    "",
    "------------------------------------------------------------",
    "2. WHAT IS NMAP?",
    "Nmap (Network Mapper) is an active network scanning tool that",
    "discovers hosts and services by sending crafted packets and",
    "analyzing responses according to TCP/IP protocol behavior.",
    "",
    "It is used by:",
    "  • Penetration testers",
    "  • Security auditors",
    "  • Network administrators",
    "  • Adversaries",
    "",
    "------------------------------------------------------------",
    "3. TCP/IP COMMUNICATION BASICS",
    "",
    "Normal TCP connection (3-way handshake):",
    "",
    "   Client                     Server",
    "     | ---- SYN ----------->   |",
    "     | <--- SYN-ACK --------   |",
    "     | ---- ACK ----------->   |",
    "",
    "Connection established.",
    "",
    "Nmap exploits this behavior to infer port status.",
    "",
    "------------------------------------------------------------",
    "4. HOW NMAP PORT SCANNING WORKS",
    "",
    "For each port:",
    "  → Send probe packet",
    "  → Observe response",
    "  → Classify state",
    "",
    "PORT STATE LOGIC:",
    "",
    "Response Received        → Interpretation",
    "------------------------------------------------",
    "SYN-ACK                  → Port OPEN",
    "RST                      → Port CLOSED",
    "No Response              → FILTERED (firewall)",
    "",
    "Flow:",
    "",
    "   Send Probe → Wait → Analyze → Classify",
    "",
    "------------------------------------------------------------",
    "5. COMMON SCAN TYPES",
    "",
    "A) TCP CONNECT SCAN",
    "   • Completes full handshake",
    "   • Reliable but detectable",
    "",
    "B) SYN SCAN (STEALTH)",
    "   • Sends SYN only",
    "   • Stops before full connection",
    "   • Harder to detect",
    "",
    "C) UDP SCAN",
    "   • Used for DNS, SNMP, etc.",
    "   • Slower due to lack of responses",
    "",
    "D) AGGRESSIVE SCAN (-A)",
    "   Combines multiple techniques:",
    "     • OS detection",
    "     • Version detection",
    "     • Script scanning",
    "     • Traceroute",
    "",
    "------------------------------------------------------------",
    "6. SERVICE ENUMERATION",
    "",
    "Nmap identifies software behind open ports.",
    "",
    "Example:",
    "   Port 80 → Apache 2.4.57",
    "   Port 22 → OpenSSH 8.2",
    "",
    "Why important?",
    "Specific versions may contain vulnerabilities.",
    "",
    "------------------------------------------------------------",
    "7. OS FINGERPRINTING",
    "",
    "Nmap analyzes subtle TCP/IP characteristics:",
    "  • Packet TTL values",
    "  • Window sizes",
    "  • Response timings",
    "  • Flag behavior",
    "",
    "These form a fingerprint unique to operating systems.",
    "",
    "------------------------------------------------------------",
    "8. NMAP SCRIPTING ENGINE (NSE)",
    "",
    "NSE allows automated vulnerability checks.",
    "",
    "Examples:",
    "  • Detect default credentials",
    "  • Identify malware",
    "  • Check SSL vulnerabilities",
    "  • Enumerate databases",
    "",
    "------------------------------------------------------------",
    "9. REAL-WORLD ATTACK FLOW",
    "",
    "Attacker Workflow:",
    "",
    "  Recon → Enumeration → Exploitation → Persistence",
    "",
    "Nmap operates in the FIRST TWO phases.",
    "",
    "------------------------------------------------------------",
    "10. DEFENSIVE USES",
    "",
    "Nmap is not only for attackers.",
    "Organizations use it to:",
    "  • Audit network exposure",
    "  • Detect unauthorized services",
    "  • Verify firewall rules",
    "  • Monitor changes in infrastructure",
    "",
    "------------------------------------------------------------",
    "END OF THEORY MODULE",
    "Type 'commands' to view operational usage.",
  ];
  break;
      case "install":
        output = [
          "Linux: sudo apt install nmap",
          "Windows: Download from https://nmap.org",
          "Verify: nmap --version",
        ];
        break;

      case "commands":
        output = [
          "================ NMAP COMMAND MANUAL ================",
          "",
          "Discovery:",
          "nmap -sn <target>",
          "",
          "Basic scan:",
          "nmap <target>",
          "",
          "Port scan:",
          "nmap -p 22,80 <target>",
          "nmap -p- <target>",
          "",
          "Service detection:",
          "nmap -sV <target>",
          "",
          "OS detection:",
          "nmap -O <target>",
          "",
          "Aggressive scan:",
          "nmap -A <target>",
          "",
          "Stealth SYN:",
          "nmap -sS <target>",
          "",
          "UDP scan:",
          "nmap -sU <target>",
          "",
          "Timing:",
          "nmap -T4 <target>",
          "",
          "Scripts:",
          "nmap --script vuln <target>",
          "",
          "Combine flags for advanced scans.",
          "Type any command directly to execute.",
        ];
        break;

      case "task":
        output = [
          "MISSION:",
          "Identify exposed services on 192.168.1.1",
          "Hint: Try aggressive scan.",
        ];
        break;

      default:
        output = ["Unknown command"];
    }

    setLog([...log, `$ ${input}`, ...output]);
    setCmd("");
  };

  return (
    <div className="h-screen bg-black text-green-400 font-mono p-4 flex flex-col">

      {/* TERMINAL OUTPUT */}
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* TERMINAL INPUT */}
      <div className="flex items-center border-t border-green-700 pt-2">
        <span className="mr-2">$</span>
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && execute()}
          className="flex-1 bg-transparent outline-none"
          autoFocus
        />
      </div>
    </div>
  );
}