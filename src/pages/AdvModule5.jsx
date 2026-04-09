import { useState, useRef } from "react";

export default function SplunkImmersiveLab() {

  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState([
    "SPLUNK SIEM THREAT HUNTING LAB v1.0",
    "Type 'help' to begin."
  ]);

  // 💀 Persistent SOC state
  const splunkStarted = useRef(false);
  const intrusionDetected = useRef(false);
  const malwareFound = useRef(false);
  const exfilDetected = useRef(false);
  const contained = useRef(false);

  // 💣 SPLUNK SIMULATOR
 const simulateSplunk = (input) => {

  input = input.replace(/^splunk>\s*/, "").trim();

  // START
  if (input === "splunk") {
    splunkStarted.current = true;
    return [
      "Splunk Enterprise SIEM initialized.",
      "Multiple security alerts detected.",
      "splunk>"
    ];
  }

  if (!splunkStarted.current)
    return ["Start environment using 'splunk'."];

  // SOURCES
  if (input === "sources") {
    return [
      "Log Sources:",
      "AuthServer",
      "Endpoint-01",
      "Database",
      "Firewall",
      "WebServer"
    ];
  }

  // DASHBOARD
  if (input === "dashboard") {
    return [
      "=== SECURITY DASHBOARD ===",
      "Failed Logins: HIGH",
      "Malware Alerts: UNKNOWN",
      "Data Exfiltration: SUSPECTED"
    ];
  }

  // ALERTS
  if (input === "alerts") {
    return [
      "Active Alerts:",
      "ID 101 — Brute-force activity",
      "ID 205 — Suspicious outbound traffic"
    ];
  }

  // 🔎 SEARCH ENGINE
  if (input.startsWith("search")) {

    const q = input.replace("search", "").toLowerCase().trim();

    // Brute force
    if (q.includes("failed") || q.includes("login")) {
      intrusionDetected.current = true;

      return [
        "AuthServer Logs:",
        "User: admin — FAILED LOGIN x47",
        "Source IP: 203.0.113.5",
        "Status: Brute-force attack suspected"
      ];
    }

    // Admin activity
    if (q.includes("admin")) {
      return [
        "Admin Account Activity:",
        "Login SUCCESS from IP 203.0.113.5",
        "Privilege escalation detected"
      ];
    }

    // Suspicious IP
    if (q.includes("203.0.113.5")) {
      return [
        "IP Intelligence:",
        "External origin",
        "Linked to previous attacks",
        "Current connections active"
      ];
    }

    // Malware
    if (q.includes("malware") || q.includes("encryptor")) {
      malwareFound.current = true;

      return [
        "Endpoint-01:",
        "Process: encryptor.exe",
        "Behavior: File encryption activity",
        "Severity: CRITICAL"
      ];
    }

    // Data exfiltration
    if (q.includes("data") || q.includes("transfer")) {
      exfilDetected.current = true;

      return [
        "Database Server:",
        "Large outbound transfer detected",
        "Destination IP: 203.0.113.5",
        "Volume: 2.3 GB"
      ];
    }

    // Network activity
    if (q.includes("traffic") || q.includes("outbound")) {
      return [
        "Firewall Logs:",
        "Unusual encrypted traffic to external host",
        "Port: 443",
        "Frequency: High"
      ];
    }

    return ["No relevant events found."];
  }

  // EVENT DETAILS
  if (input.startsWith("event")) {
    return [
      "Event Details:",
      "Timestamp: 14:22:10",
      "User: admin",
      "Source IP: 203.0.113.5",
      "Action: Privileged login"
    ];
  }

  // TIMELINE
  if (input === "timeline") {

    if (!intrusionDetected.current)
      return ["Insufficient data. Investigate logs first."];

    return [
      "=== ATTACK TIMELINE ===",
      "1) Brute-force attack",
      "2) Account compromise",
      "3) Malware deployment",
      "4) Privilege escalation",
      "5) Data exfiltration"
    ];
  }

  // THREAT HUNT MODE
  if (input === "hunt") {
    return [
      "Threat hunting enabled.",
      "Search for anomalies across systems."
    ];
  }

  // CONTAINMENT
  if (input.startsWith("block")) {

    if (!intrusionDetected.current)
      return ["No confirmed attacker IP."];

    contained.current = true;

    return ["Firewall rule applied. Attacker IP blocked."];
  }

  if (input.startsWith("quarantine")) {
    return ["Endpoint isolated from network."];
  }

  if (input.startsWith("kill")) {
    return ["Malicious process terminated."];
  }

  // REPORT
  if (input === "report") {

    if (!contained.current)
      return ["Threat still active. Containment required."];

    return [
      "=== INCIDENT REPORT ===",
      "Attack Type: External Intrusion",
      "Entry: Brute-force on admin account",
      "Malware: encryptor.exe",
      "Impact: Data exfiltration attempt",
      "Response: IP blocked, host isolated",
      "Status: CONTAINED"
    ];
  }

  // RESET
  if (input === "reset") {
    intrusionDetected.current = false;
    malwareFound.current = false;
    exfilDetected.current = false;
    contained.current = false;
    return ["Environment reset."];
  }

  if (input === "exit") {
    splunkStarted.current = false;
    return ["Splunk session closed."];
  }

  return ["Unknown splunk command."];
};

  // 💣 TERMINAL EXECUTION
  const execute = () => {
    if (!cmd.trim()) return;

    const input = cmd.trim();

    if (input === "splunk" || splunkStarted.current) {
      const res = simulateSplunk(input);
      setLog([...log, `$ ${input}`, ...res]);
      setCmd("");
      return;
    }

    let output = [];

    switch (input) {

      case "help":
        output = [
          "Available commands:",
          "theory",
          "install",
          "commands",
          "",
          "Start SIEM lab:",
          "splunk"
        ];
        break;

      case "theory":
  output = [
    "================ SIEM & SPLUNK SECURITY THEORY ================",
    "",
    "1) WHAT IS SIEM?",
    "------------------------------------------------------------------",
    "SIEM stands for Security Information and Event Management.",
    "It aggregates logs from across an enterprise and analyzes",
    "them to detect security threats in real time.",
    "",
    "Primary goals:",
    "  • Centralized visibility",
    "  • Threat detection",
    "  • Incident investigation",
    "  • Compliance monitoring",
    "",
    "------------------------------------------------------------------",
    "2) WHY LOGS ARE CRITICAL",
    "------------------------------------------------------------------",
    "Every system action leaves digital evidence called logs.",
    "",
    "Examples:",
    "  • Login attempts",
    "  • File access",
    "  • Process execution",
    "  • Network connections",
    "  • Configuration changes",
    "",
    "Attackers cannot operate without generating logs.",
    "",
    "------------------------------------------------------------------",
    "3) LOG SOURCES IN ENTERPRISE NETWORKS",
    "------------------------------------------------------------------",
    "SIEM collects data from multiple layers:",
    "",
    "  Endpoint Logs → User activity, malware events",
    "  Server Logs   → Application behavior",
    "  Network Logs  → Traffic patterns",
    "  Firewall Logs → Allowed/blocked connections",
    "  Authentication Logs → Account usage",
    "  Cloud Logs → API activity, storage access",
    "",
    "Combining sources enables full attack visibility.",
    "",
    "------------------------------------------------------------------",
    "4) SPLUNK ARCHITECTURE",
    "------------------------------------------------------------------",
    "Splunk uses forwarders to collect logs and send them",
    "to indexers for storage and search.",
    "",
    "Components:",
    "  • Universal Forwarder → Data collection agent",
    "  • Indexer → Stores and indexes events",
    "  • Search Head → Query interface",
    "",
    "Data Flow:",
    "  Systems → Forwarders → Indexers → Analysts",
    "",
    "------------------------------------------------------------------",
    "5) SECURITY ANALYTICS & CORRELATION",
    "------------------------------------------------------------------",
    "Single events rarely indicate attacks.",
    "SIEM correlates multiple events to detect patterns.",
    "",
    "Example correlation:",
    "  Multiple failed logins",
    "  → Successful login from same IP",
    "  → Privilege escalation",
    "",
    "This sequence strongly suggests compromise.",
    "",
    "------------------------------------------------------------------",
    "6) SECURITY ALERTING",
    "------------------------------------------------------------------",
    "Rules trigger alerts when suspicious conditions occur.",
    "",
    "Examples:",
    "  • Brute-force detection",
    "  • Malware execution",
    "  • Suspicious outbound traffic",
    "  • Unauthorized admin actions",
    "",
    "Alerts prioritize analyst attention.",
    "",
    "------------------------------------------------------------------",
    "7) THREAT HUNTING",
    "------------------------------------------------------------------",
    "Proactive search for hidden attackers without alerts.",
    "",
    "Analysts look for anomalies such as:",
    "  • Unusual login times",
    "  • Rare processes",
    "  • Unknown IP communication",
    "  • Data transfers outside normal patterns",
    "",
    "Threat hunting assumes attackers may already be inside.",
    "",
    "------------------------------------------------------------------",
    "8) ATTACK LIFECYCLE (KILL CHAIN)",
    "------------------------------------------------------------------",
    "Cyber attacks follow predictable stages:",
    "",
    "  Reconnaissance",
    "  Initial Access",
    "  Execution",
    "  Privilege Escalation",
    "  Lateral Movement",
    "  Data Exfiltration",
    "",
    "SIEM helps reconstruct this timeline.",
    "",
    "------------------------------------------------------------------",
    "9) INDICATORS OF COMPROMISE (IOCs)",
    "------------------------------------------------------------------",
    "Evidence suggesting malicious activity.",
    "",
    "Examples:",
    "  • Suspicious IP addresses",
    "  • Unknown executables",
    "  • Disabled security controls",
    "  • Large outbound transfers",
    "",
    "IOCs guide investigation.",
    "",
    "------------------------------------------------------------------",
    "10) INCIDENT RESPONSE PROCESS",
    "------------------------------------------------------------------",
    "After detecting a threat:",
    "",
    "  Detect → Analyze → Contain → Eradicate → Recover → Report",
    "",
    "Containment actions include:",
    "  • Blocking attacker IPs",
    "  • Isolating infected systems",
    "  • Killing malicious processes",
    "",
    "------------------------------------------------------------------",
    "11) FORENSIC VALUE OF SIEM DATA",
    "------------------------------------------------------------------",
    "Logs provide historical evidence of attacker behavior.",
    "They enable:",
    "  • Root cause analysis",
    "  • Scope determination",
    "  • Legal investigations",
    "",
    "------------------------------------------------------------------",
    "12) DEFENSIVE STRATEGIC VALUE",
    "------------------------------------------------------------------",
    "Organizations use SIEM to:",
    "  • Monitor security posture continuously",
    "  • Detect breaches early",
    "  • Meet regulatory requirements",
    "  • Improve incident response speed",
    "",
    "------------------------------------------------------------------",
    "END OF THEORY MODULE",
    "Type 'commands' to begin threat investigation.",
  ];
  break;

      case "install":
        output = [
          "Download Splunk Enterprise:",
          "https://www.splunk.com",
          "",
          "Deploy agents on monitored systems",
          "to forward logs to SIEM."
        ];
        break;
case "commands":
  output = [
    "================ SPLUNK INVESTIGATION GUIDE =================",
    "",
    "Splunk uses search queries to analyze logs.",
    "Think like a detective: ask questions about activity.",
    "",
    "---------------------- START ENVIRONMENT ---------------------",
    "",
    "splunk",
    "  Starts SIEM monitoring environment.",
    "",
    "sources",
    "  Shows available log sources.",
    "",
    "dashboard",
    "  Displays overall security status.",
    "",
    "alerts",
    "  Lists current security alerts.",
    "",
    "---------------------- SEARCH INVESTIGATION ------------------",
    "",
    "search <query>",
    "  Runs investigation across all logs.",
    "",
    "You must search using meaningful keywords.",
    "",
    "EXAMPLES:",
    "",
    "search failed login",
    "  Investigates brute-force attempts.",
    "",
    "search user=admin",
    "  Shows activity related to admin account.",
    "",
    "search 203.0.113.5",
    "  Tracks actions from suspicious IP.",
    "",
    "search malware",
    "  Finds malicious process activity.",
    "",
    "search encryptor.exe",
    "  Investigates specific executable.",
    "",
    "search outbound traffic",
    "  Checks unusual network activity.",
    "",
    "search data transfer",
    "  Detects possible data exfiltration.",
    "",
    "TIP:",
    "Start broad → then narrow investigation.",
    "",
    "---------------------- DEEP ANALYSIS -------------------------",
    "",
    "event <id>",
    "  View detailed information about an event.",
    "",
    "timeline",
    "  Reconstruct attacker activity sequence.",
    "",
    "hunt",
    "  Enables threat hunting mode.",
    "",
    "---------------------- RESPONSE ACTIONS ----------------------",
    "",
    "block <ip>",
    "  Blocks attacker IP via firewall.",
    "",
    "quarantine <host>",
    "  Isolates compromised system.",
    "",
    "kill <pid>",
    "  Terminates malicious process.",
    "",
    "---------------------- REPORTING -----------------------------",
    "",
    "report",
    "  Generates incident response report.",
    "",
    "reset",
    "  Resets investigation environment.",
    "",
    "exit",
    "  Ends Splunk session.",
    "",
    "==============================================================",
    "Use search queries to uncover attack chain.",
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

      {/* INPUT */}
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