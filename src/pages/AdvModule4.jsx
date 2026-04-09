import { useState, useRef } from "react";

export default function BurpImmersiveLab() {

  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState([
    "BURP SUITE WEB ATTACK LAB v1.0",
    "Type 'help' to begin."
  ]);

  // 💀 Persistent lab state
  const burpStarted = useRef(false);
  const proxyOn = useRef(false);
  const interceptOn = useRef(false);
  const requestCaptured = useRef(false);
  const injected = useRef(false);
  const adminAccess = useRef(false);

  // 💣 BURP SIMULATOR
 const simulateBurp = (input) => {

  input = input.replace(/^burp>\s*/, "").trim();

  // START
  if (input === "burp") {
    burpStarted.current = true;
    return [
      "Burp Suite Professional initialized.",
      "Target loaded: http://vuln-app.local",
      "burp>"
    ];
  }

  if (!burpStarted.current)
    return ["Start Burp using 'burp' command."];

  // TARGET MAP
  if (input === "target") {
    return [
      "Application Structure:",
      "/login",
      "/dashboard",
      "/admin",
      "/api/users"
    ];
  }

  // PROXY
  if (input === "proxy on") {
    proxyOn.current = true;
    return ["Proxy enabled. Intercepting traffic."];
  }

  // INTERCEPT
  if (input === "intercept on") {
    if (!proxyOn.current)
      return ["Enable proxy first."];

    interceptOn.current = true;
    requestCaptured.current = true;

    return [
      "Intercept ON — Request captured:",
      "",
      "POST /login HTTP/1.1",
      "Host: vuln-app.local",
      "Content-Type: application/x-www-form-urlencoded",
      "",
      "username=admin&password=1234"
    ];
  }

  // SHOW REQUEST
  if (input === "show request") {
    if (!requestCaptured.current)
      return ["No request captured."];

    return [
      "Captured Request:",
      "username=admin&password=1234"
    ];
  }

  // EDIT PARAM
  if (input.startsWith("edit param")) {
    if (!requestCaptured.current)
      return ["Capture a request first."];

    return ["Parameter modified."];
  }

  // FORWARD
  if (input === "forward") {
    return ["Request forwarded to server."];
  }

  // REPEATER
  if (input === "repeater") {
    if (!requestCaptured.current)
      return ["No request available."];

    return [
      "Sent to Repeater.",
      "Modify parameters and use 'payload <data>'"
    ];
  }

  // PAYLOAD INJECTION
  if (input.startsWith("payload")) {

  if (!requestCaptured.current)
    return ["No request to inject into."];

  const data = input.replace("payload", "").trim();
  injected.current = true;

  // SQLi
  if (/1\s*=\s*1/.test(data)) {
    adminAccess.current = true;
    return [
      "Payload injected into parameter.",
      "Database query logic altered.",
      "Authentication bypass successful.",
      "Admin session issued."
    ];
  }

  // XSS
  if (/<script>/i.test(data)) {
    return [
      "Payload reflected in response.",
      "JavaScript execution possible.",
      "Cross-Site Scripting confirmed."
    ];
  }

  // Command injection hint
  if (/;|&&|\|/.test(data)) {
    return [
      "Suspicious command separators detected.",
      "Potential command injection vector."
    ];
  }

  return [
    "Payload delivered.",
    "Server responded normally.",
    "No vulnerability confirmed."
  ];
}

  // RESPONSE
  if (input === "response") {
    if (!injected.current)
      return ["No request executed."];

    return [
      "HTTP/1.1 200 OK",
      "Welcome admin",
      "SessionID=ZXCV1234"
    ];
  }

  // SCAN
  if (input === "scan") {
    return [
      "Scanning application...",
      "SQL Injection detected at /login",
      "Risk: CRITICAL"
    ];
  }

  // INTRUDER
  if (input === "intruder") {
    return [
      "Intruder attack started...",
      "Weak password discovered: admin123"
    ];
  }

  // ANALYZE
  if (input === "analyze") {
    if (!adminAccess.current)
      return ["No critical vulnerability confirmed."];

    return [
      "Analysis:",
      "Authentication bypass successful",
      "Privilege escalation achieved"
    ];
  }

  // REPORT
  if (input === "report") {
    if (!adminAccess.current)
      return ["No major findings to report."];

    return [
      "=== PENETRATION TEST REPORT ===",
      "Vulnerability: SQL Injection",
      "Impact: Full admin compromise",
      "Severity: CRITICAL",
      "Recommendation: Use prepared statements"
    ];
  }

  // RESET
  if (input === "reset") {
    proxyOn.current = false;
    interceptOn.current = false;
    requestCaptured.current = false;
    injected.current = false;
    adminAccess.current = false;
    return ["Lab reset."];
  }

  if (input === "exit") {
    burpStarted.current = false;
    return ["Burp closed."];
  }

  return ["Unknown burp command."];
};

  // 💣 TERMINAL EXECUTION
  const execute = () => {
    if (!cmd.trim()) return;

    const input = cmd.trim();

    if (input === "burp" || burpStarted.current) {
      const res = simulateBurp(input);
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
          "Start lab:",
          "burp"
        ];
        break;

      case "theory":
  output = [
    "================ WEB APPLICATION SECURITY THEORY ================",
    "",
    "1) MODERN WEB APPLICATION ARCHITECTURE",
    "------------------------------------------------------------------",
    "Most applications follow a client-server model:",
    "",
    "   Browser  →  Web Server  →  Application Logic  →  Database",
    "",
    "User actions generate HTTP requests processed by backend services.",
    "Security flaws at ANY layer can expose sensitive data.",
    "",
    "------------------------------------------------------------------",
    "2) HTTP PROTOCOL FUNDAMENTALS",
    "------------------------------------------------------------------",
    "HTTP is stateless. Each request is independent.",
    "",
    "Example request:",
    "",
    "  POST /login HTTP/1.1",
    "  Host: example.com",
    "  Content-Type: application/x-www-form-urlencoded",
    "",
    "  username=admin&password=1234",
    "",
    "Server responds with status codes:",
    "  200 → OK",
    "  401 → Unauthorized",
    "  403 → Forbidden",
    "  500 → Server Error",
    "",
    "Attackers manipulate requests to alter server behavior.",
    "",
    "------------------------------------------------------------------",
    "3) AUTHENTICATION VS AUTHORIZATION",
    "------------------------------------------------------------------",
    "Authentication → Who are you?",
    "Authorization  → What are you allowed to do?",
    "",
    "Broken implementation leads to privilege escalation.",
    "",
    "Example:",
    "User logs in as normal user but accesses /admin endpoint.",
    "",
    "------------------------------------------------------------------",
    "4) SESSION MANAGEMENT",
    "------------------------------------------------------------------",
    "After login, server issues a session identifier (cookie).",
    "",
    "Example:",
    "  Set-Cookie: SESSIONID=abc123",
    "",
    "Session weaknesses enable:",
    "  • Session hijacking",
    "  • Session fixation",
    "  • Unauthorized access",
    "",
    "------------------------------------------------------------------",
    "5) INPUT VALIDATION FAILURES",
    "------------------------------------------------------------------",
    "Web apps accept user input through forms, URLs, headers, cookies.",
    "Improper validation leads to injection vulnerabilities.",
    "",
    "Trusting user input is a critical security mistake.",
    "",
    "------------------------------------------------------------------",
    "6) SQL INJECTION (SQLi)",
    "------------------------------------------------------------------",
    "Occurs when user input is concatenated into database queries.",
    "",
    "Unsafe query example:",
    "  SELECT * FROM users WHERE",
    "  username='admin' AND password='1234'",
    "",
    "Injected input:",
    "  ' OR 1=1 --",
    "",
    "Result:",
    "Authentication bypass.",
    "",
    "Impact:",
    "  • Data theft",
    "  • Account takeover",
    "  • Database destruction",
    "",
    "------------------------------------------------------------------",
    "7) CROSS-SITE SCRIPTING (XSS)",
    "------------------------------------------------------------------",
    "Allows attackers to execute JavaScript in victim's browser.",
    "",
    "Types:",
    "  • Reflected XSS",
    "  • Stored XSS",
    "  • DOM-based XSS",
    "",
    "Example payload:",
    "  <script>alert('XSS')</script>",
    "",
    "Impact:",
    "  • Cookie theft",
    "  • Session hijacking",
    "  • Malicious redirects",
    "",
    "------------------------------------------------------------------",
    "8) INSECURE DIRECT OBJECT REFERENCE (IDOR)",
    "------------------------------------------------------------------",
    "Occurs when application exposes internal identifiers.",
    "",
    "Example:",
    "  /profile?user=1001",
    "",
    "Changing to:",
    "  /profile?user=1002",
    "",
    "May expose another user's data.",
    "",
    "------------------------------------------------------------------",
    "9) CSRF (CROSS-SITE REQUEST FORGERY)",
    "------------------------------------------------------------------",
    "Forces victim to execute unwanted actions while authenticated.",
    "",
    "Example:",
    "User visits malicious site → hidden request triggers bank transfer.",
    "",
    "------------------------------------------------------------------",
    "10) BURP SUITE ROLE IN PENETRATION TESTING",
    "------------------------------------------------------------------",
    "Burp acts as a man-in-the-middle proxy between browser and server.",
    "",
    "Functions:",
    "  • Intercept HTTP/HTTPS traffic",
    "  • Modify requests before sending",
    "  • Replay requests",
    "  • Automated scanning",
    "  • Manual exploitation",
    "",
    "------------------------------------------------------------------",
    "11) ATTACK WORKFLOW USING BURP",
    "------------------------------------------------------------------",
    "Typical penetration testing process:",
    "",
    "  Recon → Mapping → Interception → Testing → Exploitation → Report",
    "",
    "Burp provides tools for each stage.",
    "",
    "------------------------------------------------------------------",
    "12) DEFENSIVE PERSPECTIVE",
    "------------------------------------------------------------------",
    "Organizations use testing results to:",
    "  • Patch vulnerabilities",
    "  • Improve input validation",
    "  • Strengthen authentication",
    "  • Deploy security controls",
    "",
    "------------------------------------------------------------------",
    "END OF THEORY MODULE",
    "Type 'commands' to begin practical attack simulation.",
  ];
  break;

      case "install":
        output = [
          "Download Burp Suite Community Edition:",
          "https://portswigger.net/burp",
          "",
          "Configure browser proxy:",
          "127.0.0.1 : 8080"
        ];
        break;

      case "commands":
  output = [
    "================ BURP SUITE OPERATIONAL MANUAL ================",
    "",
    "Burp Suite is an integrated web security testing platform.",
    "It operates as a man-in-the-middle proxy between browser",
    "and target server, allowing inspection and manipulation",
    "of HTTP/HTTPS traffic in real time.",
    "",
    "---------------------- INITIALIZATION --------------------------",
    "",
    "burp",
    "  STARTS the Burp lab environment.",
    "  Loads target application and enables tools.",
    "",
    "target",
    "  Displays discovered application structure.",
    "  Used for reconnaissance of endpoints.",
    "",
    "---------------------- PROXY OPERATIONS ------------------------",
    "",
    "proxy on",
    "  Enables interception proxy.",
    "  All browser traffic flows through Burp.",
    "",
    "intercept on",
    "  Pauses outgoing requests.",
    "  Allows inspection before reaching server.",
    "",
    "intercept off",
    "  Disables interception and forwards traffic automatically.",
    "",
    "show request",
    "  Displays raw captured HTTP request.",
    "",
    "set param <key>=<value>",
    "  Modifies request parameters manually.",
    "",
    "forward",
    "  Sends modified request to server.",
    "",
    "drop",
    "  Discards intercepted request.",
    "",
    "---------------------- REPEATER TOOL --------------------------",
    "",
    "repeater",
    "  Sends captured request to Repeater module.",
    "  Used for manual vulnerability testing.",
    "",
    "send",
    "  Executes modified request repeatedly.",
    "",
    "response",
    "  Shows server reply for analysis.",
    "",
    "---------------------- PAYLOAD TESTING -------------------------",
    "",
    "payload <data>",
    "  Injects attack payload into parameters.",
    "",
    "Examples:",
    "  payload ' OR 1=1 --        → SQL Injection",
    "  payload <script>alert(1)</script> → XSS",
    "",
    "---------------------- AUTOMATED TOOLS -------------------------",
    "",
    "scan",
    "  Performs automated vulnerability scan.",
    "",
    "intruder",
    "  Launches brute-force or fuzzing attack.",
    "",
    "decode <data>",
    "  Decodes encoded values (URL/Base64).",
    "",
    "compare",
    "  Compares responses to identify anomalies.",
    "",
    "history",
    "  Shows traffic log captured by proxy.",
    "",
    "---------------------- ANALYSIS & REPORTING --------------------",
    "",
    "analyze",
    "  Interprets results and identifies vulnerabilities.",
    "",
    "report",
    "  Generates penetration testing report.",
    "",
    "reset",
    "  Clears current attack state.",
    "",
    "exit",
    "  Terminates Burp session.",
    "",
    "===============================================================",
    "Type commands exactly as shown to perform attack workflow.",
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