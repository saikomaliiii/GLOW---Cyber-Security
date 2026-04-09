import { useState } from "react";

export default function WiresharkImmersiveLab() {
  const [cmd, setCmd] = useState("");
  const [log, setLog] = useState([
    "NETWORK ANALYSIS ENVIRONMENT v1.0",
    "Wireshark / Tshark Training Mode",
    "Type 'help' to view available commands.",
  ]);

  // 📡 Tshark Simulation Engine
 const simulateTshark = (input) => {

  let res = [
    "TShark (Wireshark CLI) 4.x",
    ""
  ];

  // LIST INTERFACES
  if (input.includes("-D")) {
    res.push(
      "1. eth0",
      "2. wlan0",
      "3. lo"
    );
  }

  // LIVE CAPTURE
  else if (input.includes("-i")) {

    if (input.includes("-c")) {
      res.push("Capturing limited number of packets...");
    }

    if (input.includes("duration")) {
      res.push("Capture running for specified duration...");
    }

    if (input.includes("-f")) {
      res.push("Capture filter applied.");
    }

    if (input.includes("-w")) {
      res.push("Writing packets to capture.pcap");
    }

    res.push(
      "Listening on interface...",
      "1 TCP HTTP GET /",
      "2 DNS Query example.com",
      "3 TLS Handshake"
    );
  }

  // READ FILE
  else if (input.includes("-r")) {
    res.push(
      "Reading capture.pcap...",
      "TCP SYN",
      "HTTP POST /login",
      "TLS handshake"
    );
  }

  // DISPLAY FILTERS
  else if (input.includes("-Y")) {

    if (input.includes("http"))
      res.push("HTTP traffic detected.");

    else if (input.includes("dns"))
      res.push("DNS queries detected.");

    else if (input.includes("tcp"))
      res.push("TCP sessions detected.");

    else if (input.includes("udp"))
      res.push("UDP packets detected.");

    else if (input.includes("tls"))
      res.push("Encrypted TLS sessions detected.");

    else if (input.includes("ip.addr"))
      res.push("Traffic for specified IP displayed.");

    else if (input.includes("port"))
      res.push("Traffic for specified port displayed.");
  }

  // VERBOSE
  else if (input.includes("-V")) {
    res.push("Detailed protocol dissection displayed.");
  }

  // HEX
  else if (input.includes("-x")) {
    res.push("Hex dump of packets displayed.");
  }

  // PROTOCOL DECODE
  else if (input.includes("-O")) {
    res.push("Detailed decode of specified protocol.");
  }

  // STATISTICS
  else if (input.includes("-z")) {

    if (input.includes("io,stat"))
      res.push("Traffic volume statistics displayed.");

    else if (input.includes("conv"))
      res.push("Conversation statistics displayed.");

    else if (input.includes("endpoints"))
      res.push("Endpoint summary displayed.");
  }

  // FIELD EXTRACTION
  else if (input.includes("-T")) {
    res.push("Extracted fields displayed.");
  }

  else {
    res.push("No specific option detected.");
  }

  res.push("", "Analysis complete.");
  return res;
};
  const execute = () => {
    if (!cmd.trim()) return;

    const input = cmd.trim();

    // 💻 Tshark command handling
    if (input.startsWith("tshark")) {
      const res = simulateTshark(input);
      setLog([...log, `$ ${input}`, ...res]);
      setCmd("");
      return;
    }

    let output = [];

    switch (input) {
      case "help":
        output = [
          "Available commands:",
          "theory   — Packet analysis theory",
          "install  — Installation guide",
          "commands — Tshark manual",
          "task     — Mission objective",
          "",
          "You can run tshark commands directly.",
        ];
        break;

      case "theory":
  output = [
    "============= NETWORK TRAFFIC ANALYSIS THEORY =============",
    "",
    "1) HOW DATA TRAVELS ACROSS NETWORKS",
    "",
    "Modern networks use packet switching.",
    "Large data is broken into small units called packets.",
    "",
    "Sender → Router → Router → Destination",
    "",
    "Each packet contains:",
    "  • Header (control information)",
    "  • Payload (actual data)",
    "",
    "------------------------------------------------------------",
    "2) OSI MODEL vs TCP/IP MODEL",
    "",
    "OSI Layers:",
    " 7 Application",
    " 6 Presentation",
    " 5 Session",
    " 4 Transport",
    " 3 Network",
    " 2 Data Link",
    " 1 Physical",
    "",
    "TCP/IP Model:",
    " Application → Transport → Internet → Network Access",
    "",
    "Wireshark decodes packets across these layers.",
    "",
    "------------------------------------------------------------",
    "3) ENCAPSULATION PROCESS",
    "",
    "When sending data:",
    "",
    "Application Data",
    "   ↓",
    "TCP/UDP Header added",
    "   ↓",
    "IP Header added",
    "   ↓",
    "Ethernet Frame added",
    "",
    "Receiver performs decapsulation in reverse order.",
    "",
    "------------------------------------------------------------",
    "4) WHAT IS A PACKET?",
    "",
    "Example packet structure:",
    "",
    "┌──────────────────────────────┐",
    "│ Ethernet Header (MAC addr)   │",
    "├──────────────────────────────┤",
    "│ IP Header (Source/Dest IP)   │",
    "├──────────────────────────────┤",
    "│ TCP Header (Ports, Flags)    │",
    "├──────────────────────────────┤",
    "│ Payload (Actual Data)        │",
    "└──────────────────────────────┘",
    "",
    "------------------------------------------------------------",
    "5) HOW WIRESHARK CAPTURES TRAFFIC",
    "",
    "Normally, network cards process only packets",
    "addressed to them.",
    "",
    "Promiscuous Mode allows capture of ALL packets",
    "visible on the network segment.",
    "",
    "Capture Sources:",
    "  • Local interface",
    "  • Monitor mode (Wi-Fi)",
    "  • Network tap",
    "  • Port mirroring (SPAN)",
    "",
    "------------------------------------------------------------",
    "6) COMMON PROTOCOL ANALYSIS",
    "",
    "TCP:",
    "  Reliable, connection-oriented.",
    "  Uses sequence numbers and acknowledgments.",
    "",
    "UDP:",
    "  Faster, connectionless.",
    "  No guarantee of delivery.",
    "",
    "DNS:",
    "  Converts domain names to IP addresses.",
    "",
    "HTTP:",
    "  Plaintext web communication.",
    "",
    "TLS/HTTPS:",
    "  Encrypted communication layer.",
    "",
    "------------------------------------------------------------",
    "7) TCP THREE-WAY HANDSHAKE",
    "",
    "Client → SYN → Server",
    "Server → SYN-ACK → Client",
    "Client → ACK → Server",
    "",
    "Connection established.",
    "",
    "Abnormal patterns may indicate scanning or attacks.",
    "",
    "------------------------------------------------------------",
    "8) TRAFFIC FILTERING & INSPECTION",
    "",
    "Analysts filter packets to isolate relevant data:",
    "",
    "Examples:",
    "  http     → Web traffic",
    "  dns      → Domain lookups",
    "  tcp.port == 80",
    "  ip.addr == 192.168.1.1",
    "",
    "------------------------------------------------------------",
    "9) DETECTING ATTACKS IN TRAFFIC",
    "",
    "Indicators of compromise:",
    "",
    "• Port scanning (many SYN packets)",
    "• Suspicious DNS queries",
    "• Data exfiltration patterns",
    "• Command-and-control communication",
    "• Repeated failed connections",
    "",
    "------------------------------------------------------------",
    "10) DIGITAL FORENSICS USE",
    "",
    "Captured traffic can reconstruct events:",
    "",
    "• User activity",
    "• File transfers",
    "• Credentials in plaintext protocols",
    "• Malware communication",
    "",
    "PCAP files serve as legal evidence.",
    "",
    "------------------------------------------------------------",
    "11) ENCRYPTION LIMITATIONS",
    "",
    "HTTPS encrypts payload, but metadata remains visible:",
    "",
    "Visible:",
    "  • IP addresses",
    "  • Packet sizes",
    "  • Timing",
    "  • TLS handshake info",
    "",
    "Hidden:",
    "  • Actual content",
    "",
    "------------------------------------------------------------",
    "12) REAL-WORLD APPLICATIONS",
    "",
    "Wireshark is used for:",
    "",
    "• Incident response",
    "• Malware analysis",
    "• Network troubleshooting",
    "• Security auditing",
    "• Protocol development",
    "",
    "------------------------------------------------------------",
    "END OF THEORY MODULE",
    "Type 'commands' to explore analysis operations.",
  ];
  break;

      case "install":
        output = [
          "Linux: sudo apt install wireshark",
          "Windows: Download from wireshark.org",
          "CLI tool: tshark",
        ];
        break;

     case "commands":
  output = [
    "================ TSHARK OPERATIONAL MANUAL =================",
    "",
    "INTERFACE MANAGEMENT",
    "-----------------------------------------------------------",
    "tshark -D",
    "  List available capture interfaces.",
    "",
    "LIVE CAPTURE",
    "-----------------------------------------------------------",
    "tshark -i eth0",
    "  Capture traffic from interface.",
    "",
    "tshark -i eth0 -c 50",
    "  Stop after capturing 50 packets.",
    "",
    "tshark -i eth0 -a duration:30",
    "  Capture for 30 seconds only.",
    "",
    "CAPTURE FILTERS (BPF)",
    "-----------------------------------------------------------",
    "tshark -i eth0 -f \"tcp port 80\"",
    "  Capture only HTTP traffic.",
    "",
    "tshark -i eth0 -f \"host 192.168.1.1\"",
    "  Capture traffic to/from specific host.",
    "",
    "SAVE CAPTURE",
    "-----------------------------------------------------------",
    "tshark -i eth0 -w capture.pcap",
    "  Save packets to file.",
    "",
    "READ PCAP FILE",
    "-----------------------------------------------------------",
    "tshark -r capture.pcap",
    "  Analyze recorded traffic.",
    "",
    "DISPLAY FILTERS",
    "-----------------------------------------------------------",
    "tshark -Y http",
    "tshark -Y dns",
    "tshark -Y tcp",
    "tshark -Y udp",
    "tshark -Y tls",
    "  Show packets matching protocol.",
    "",
    "IP & PORT FILTERING",
    "-----------------------------------------------------------",
    "tshark -Y \"ip.addr == 192.168.1.5\"",
    "tshark -Y \"tcp.port == 443\"",
    "",
    "PACKET DETAILS",
    "-----------------------------------------------------------",
    "tshark -V",
    "  Verbose packet analysis.",
    "",
    "tshark -x",
    "  Hex + ASCII dump.",
    "",
    "tshark -O http",
    "  Detailed decode of HTTP layer.",
    "",
    "STATISTICS",
    "-----------------------------------------------------------",
    "tshark -z io,stat",
    "  Traffic volume over time.",
    "",
    "tshark -z conv,tcp",
    "  TCP conversation statistics.",
    "",
    "tshark -z endpoints,ip",
    "  Endpoint activity summary.",
    "",
    "FIELD EXTRACTION",
    "-----------------------------------------------------------",
    "tshark -T fields -e ip.src -e ip.dst",
    "  Extract source/destination IPs.",
    "",
    "tshark -T fields -e http.request.uri",
    "  Extract requested URLs.",
    "",
    "SECURITY ANALYSIS",
    "-----------------------------------------------------------",
    "Look for:",
    "  • Suspicious domains",
    "  • Data exfiltration patterns",
    "  • Repeated connections",
    "  • Plaintext credentials",
    "",
    "===========================================================",
    "Type any tshark command directly to execute.",
  ];
  break;
      case "task":
        output = [
          "MISSION:",
          "Identify HTTP requests in captured traffic.",
          "Hint: Use protocol filters.",
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