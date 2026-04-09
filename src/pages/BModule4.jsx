import { useState, useEffect, useRef } from "react";

/*
  BModule4.jsx
  Network Security Cyber Range
*/

export default function BModule4() {

  /* ================= SYSTEM ================= */

  const [tab, setTab] = useState("theory");

  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Trainee");
  const [threat, setThreat] = useState("LOW");

  const [logs, setLogs] = useState([]);

  /* ================= LAB STATES ================= */

  const [labStep, setLabStep] = useState(1);
  const [labScore, setLabScore] = useState(0);
const [scanRunning, setScanRunning] = useState(false);
const [scanResults, setScanResults] = useState({});
const [scanLog, setScanLog] = useState([]);
const [trafficData, setTrafficData] = useState([]);
const [selectedTraffic, setSelectedTraffic] = useState([]);
const [incidentReport, setIncidentReport] = useState(null);
const [selectedDefense, setSelectedDefense] = useState([]);

  const [selectedIPs, setSelectedIPs] = useState([]);
  const [confirmedAttackers, setConfirmedAttackers] = useState([]);

  const [selectedPorts, setSelectedPorts] = useState([]);

  const [trafficFlags, setTrafficFlags] = useState({
    scan: false,
    flood: false
  });
  const startPortScan = async () => {

  setScanRunning(true);
  setScanLog([]);
  setScanResults({});

  addLog("🔍 Port scanning started");

  let results = {};
  let logs = [];

  for (let ip of confirmedAttackers) {

    logs.push(`Scanning ${ip}...`);
    setScanLog([...logs]);
    await new Promise(r => setTimeout(r, 1000));

    results[ip] = [];

    for (let p of (portDB[ip] || [])) {

      await new Promise(r => setTimeout(r, 600));

      const status = p.safe ? "SAFE" : "VULNERABLE";

      logs.push(`→ ${ip}:${p.port} OPEN (${status})`);
      setScanLog([...logs]);

      results[ip].push(p);
    }
  }

  setScanResults(results);
  setScanRunning(false);

  addLog("✅ Port scan completed");
};
const generateTraffic = () => {

  let data = [];

  Object.keys(scanResults).forEach(ip => {

    scanResults[ip].forEach(p => {

      const attack =
        !p.safe && Math.random() > 0.4;

      const rate = attack
        ? Math.floor(3000 + Math.random()*4000)
        : Math.floor(20 + Math.random()*200);

      data.push({
        ip,
        port: p.port,
        rate,
        attack
      });

    });

  });

  setTrafficData(data);
  setSelectedTraffic([]);

  addLog("📊 Traffic monitoring started");
};

const analyzeIncident = () => {

  let report = {
    ddos: false,
    brute: false,
    exploit: false,
    scan: false,
    attackers: []
  };

  trafficData.forEach(t => {

    if (!t.attack) return;

    if (t.rate > 4000) report.ddos = true;

    if (t.port === 21 || t.port === 22) report.brute = true;

    if (t.port === 445 || t.port === 3389) report.exploit = true;

    if (t.rate < 500) report.scan = true;

    report.attackers.push(t.ip);

  });

  report.attackers = [...new Set(report.attackers)];

  setIncidentReport(report);

  addLog("📑 Incident analyzed");
};



  const [response, setResponse] = useState({
    firewall: false,
    vpn: false,
    update: false
  });

  /* ================= DATA ================= */

  const ipLogs = [
    { ip: "192.168.1.10", safe: true },
    { ip: "45.33.12.99", safe: false },
    { ip: "103.45.67.88", safe: false },
    { ip: "172.16.0.5", safe: true }
  ];

  /* Port Scan Database (Simulated Nmap Results) */

  const portDB = {

    "45.33.12.99": [
      { port: 22, safe: true },
      { port: 445, safe: false },
      { port: 3389, safe: false }
    ],

    "103.45.67.88": [
      { port: 80, safe: true },
      { port: 8080, safe: false },
      { port: 21, safe: false }
    ]

  };

  const activePorts =
    confirmedAttackers.flatMap(ip => portDB[ip] || []);

  /* ================= HELPERS ================= */

  const addLog = (msg) => {
    setLogs(l => [
      ...l.slice(-20),
      `[${new Date().toLocaleTimeString()}] ${msg}`
    ]);
  };

  /* ================= ATTACK MODE ================= */

  const attacks = [
    { name: "Port Scan", fix: "firewall" },
    { name: "DDoS Flood", fix: "block" },
    { name: "MITM Attack", fix: "vpn" },
    { name: "Brute Force", fix: "reset" }
  ];

  const [currentAttack, setCurrentAttack] = useState(null);
  const [timer, setTimer] = useState(0);

  const [blocked, setBlocked] = useState(0);
  const [failed, setFailed] = useState(0);

  const intervalRef = useRef(null);

  /* ================= START ATTACK ================= */

  const startAttack = () => {

    const atk = attacks[Math.floor(Math.random() * attacks.length)];

    setCurrentAttack(atk);
    setTimer(30);
    setThreat("MEDIUM");

    addLog(`⚠️ ${atk.name} detected`);
  };

  /* ================= TAB CHANGE ================= */

  useEffect(() => {

    if (tab === "attack") startAttack();

    return () => clearInterval(intervalRef.current);

  }, [tab]);

  /* ================= TIMER ================= */

  useEffect(() => {

    if (tab !== "attack") return;
    if (!currentAttack) return;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {

      setTimer(t => {

        if (t <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }

        return t - 1;
      });

    }, 1000);

    return () => clearInterval(intervalRef.current);

  }, [tab, currentAttack]);

  /* ================= TIMEOUT ================= */

  useEffect(() => {

    if (tab !== "attack") return;
    if (timer !== 0) return;

    addLog(`❌ ${currentAttack.name} successful`);

    setFailed(f => f + 1);
    setXp(x => Math.max(0, x - 10));
    setThreat("HIGH");

    startAttack();

  }, [timer]);

  /* ================= DEFENSE ================= */

  const defend = (type) => {

    if (!currentAttack) return;

    if (type === currentAttack.fix) {

      addLog(`✅ ${currentAttack.name} blocked`);

      setBlocked(b => b + 1);
      setXp(x => x + 20);
      setThreat("LOW");

      startAttack();

    } else {

      addLog("⚠️ Wrong response");

      setFailed(f => f + 1);
      setXp(x => Math.max(0, x - 5));
    }
  };

  /* ================= RANK ================= */

  useEffect(() => {

    if (xp < 100) setRank("Trainee");
    else if (xp < 250) setRank("Junior SOC");
    else if (xp < 400) setRank("Analyst");
    else setRank("Defender");

  }, [xp]);

  /* ================= UI ================= */

  return (

<div style={S.page}>

{/* HEADER */}

<div style={S.header}>

<h2>🛡️ NETWORK SECURITY CYBER RANGE</h2>

<div style={S.stats}>
<span>Threat: {threat}</span>
<span>XP: {xp}</span>
<span>Rank: {rank}</span>
</div>

</div>

{/* BODY */}

<div style={S.body}>

{/* LOGS */}

<div style={S.panel}>

<h3>📡 Security Logs</h3>

<div style={S.logs}>
{logs.map((l, i) => (
<div key={i}>{l}</div>
))}
</div>

</div>

{/* CENTER */}

<div style={S.center}>

{/* TABS */}

<div style={S.tabs}>

{["theory","lab","attack","report"].map(t => (

<button
key={t}
onClick={() => setTab(t)}
style={{
...S.tab,
background: tab === t ? "#00ffcc" : "#000"
}}
>
{t.toUpperCase()}
</button>

))}

</div>

{/* CONTENT */}

<div style={S.content}>


{/* ================= THEORY ================= */}

{tab === "theory" && (

<>
<h2>📘 Network Security & SOC Operations</h2>

<h3>1. Network Security</h3>
<p>
Network Security protects systems, servers, and data from
unauthorized access, misuse, and cyber attacks.
</p>

<h3>2. Security Operations Center (SOC)</h3>
<p>
SOC is a centralized team that monitors, detects,
analyzes, and responds to security incidents.
</p>

<h3>3. Incident Response Lifecycle</h3>

<ul>
<li><b>Detection</b> – Identify malicious IPs</li>
<li><b>Analysis</b> – Scan attacker ports</li>
<li><b>Investigation</b> – Monitor traffic</li>
<li><b>Containment</b> – Apply defenses</li>
<li><b>Recovery</b> – Restore systems</li>
</ul>

<h3>4. Port Scanning</h3>

<p>
Port scanning identifies open services using tools like Nmap.
Vulnerable ports may allow attackers to enter systems.
</p>

<h3>5. Network Attacks</h3>

<ul>
<li>Port Scanning – Service discovery</li>
<li>DDoS – Traffic flooding</li>
<li>MITM – Intercept communication</li>
<li>Brute Force – Password attacks</li>
</ul>

<h3>6. Defense Mechanisms</h3>

<ul>
<li>Firewalls – Block unauthorized access</li>
<li>VPN – Encrypt traffic</li>
<li>Patching – Fix vulnerabilities</li>
<li>Monitoring – Detect threats</li>
</ul>

<h3>7. Relation to Lab</h3>

<p>
This lab simulates real SOC workflow where students
detect attackers, analyze services, monitor traffic,
and deploy security controls.
</p>

</>
)}


{/* ================= LAB ================= */}

{tab === "lab" && (

<>
<h2 style={{ textAlign:"center" }}>🔬 Network Incident Lab</h2>

<p style={{ textAlign:"center" }}>
Stage {labStep}/5 | Score: {labScore}
</p>

<hr/>


{/* STAGE 1 */}

{labStep === 1 && (

<>
<h3>🚨 Stage 1: Threat Detection</h3>

<p>Select all malicious IP addresses</p>

{ipLogs.map(ip => (

<div
key={ip.ip}
style={{
border:"1px solid #00ffcc",
padding:"8px",
margin:"6px",
cursor:"pointer",
background:
selectedIPs.includes(ip.ip)
? "#003333"
: "#000"
}}

onClick={() => {

if (selectedIPs.includes(ip.ip)) {

setSelectedIPs(selectedIPs.filter(i => i !== ip.ip));

} else {

setSelectedIPs([...selectedIPs, ip.ip]);

}

}}
>
{ip.ip}
</div>

))}

<button onClick={() => {

let score = labScore;

const malicious = ipLogs
.filter(i => !i.safe)
.map(i => i.ip);

const selectedMal = selectedIPs.filter(i =>
malicious.includes(i)
);

const wrong = selectedIPs.filter(i =>
!malicious.includes(i)
);

if (
selectedMal.length === malicious.length &&
wrong.length === 0
) {

score += 20;

addLog("✅ Attackers identified");

setConfirmedAttackers(selectedMal);
setLabStep(2);

}

else if (wrong.length > 0) {

score -= 10;
addLog("❌ Safe IP selected");

}

else {

score -= 5;
addLog("⚠️ Partial detection");

}

setLabScore(score);
setSelectedIPs([]);

}}>
Confirm
</button>

</>

)}


{/* ================= STAGE 2 : LIVE PORT MAPPING ================= */}

{labStep === 2 && (
<>

<h3>🔍 Stage 2: Live Port Scanning & Mapping</h3>

<p>Run network scan to discover attacker services</p>

{/* START SCAN */}

{!scanRunning && Object.keys(scanResults).length === 0 && (

<button onClick={startPortScan}>
▶ Start Port Scan
</button>

)}

{/* SCAN IN PROGRESS */}

{scanRunning && (

<div style={S.scanBox}>

<h4>🖥️ Scanning Network...</h4>

{scanLog.map((l,i)=>(
<div key={i}>{l}</div>
))}

</div>

)}

{/* SCAN COMPLETED → SHOW MAPPING */}

{!scanRunning && Object.keys(scanResults).length > 0 && (

<>

<h4>📌 Service Mapping Results</h4>

{Object.keys(scanResults).map(ip => (

<div
key={ip}
style={{
border:"1px solid #00ffcc",
padding:"10px",
marginBottom:"12px"
}}
>

<h4>{ip}</h4>

{scanResults[ip].map(p => (

<button
key={p.port}
style={{
...S.choiceBtn,
background:
selectedPorts[ip]?.includes(p.port)
? "#003333"
: "#000"
}}

onClick={()=>{

const current = selectedPorts[ip] || [];

if (current.includes(p.port)) {

setSelectedPorts({
...selectedPorts,
[ip]: current.filter(x=>x!==p.port)
});

} else {

setSelectedPorts({
...selectedPorts,
[ip]: [...current,p.port]
});

}

}}
>

Port {p.port} {!p.safe && "⚠️"}

</button>

))}

</div>

))}

{/* CONFIRM */}

<button onClick={()=>{

let score = labScore;
let allOk = true;
let wrong = false;

confirmedAttackers.forEach(ip => {

const vuln = (scanResults[ip]||[])
.filter(p=>!p.safe)
.map(p=>p.port);

const selected = selectedPorts[ip] || [];

const correct = selected.filter(p=>vuln.includes(p));
const wrongSel = selected.filter(p=>!vuln.includes(p));

if(
correct.length !== vuln.length ||
wrongSel.length>0
){
allOk=false;
}

if(wrongSel.length>0) wrong=true;

});

if(allOk){

score+=20;
addLog("✅ Services mapped correctly");
setLabStep(3);
generateTraffic();


}else if(wrong){

score-=10;
addLog("❌ Safe ports misclassified");

}else{

score-=5;
addLog("⚠️ Incomplete mapping");

}

setLabScore(score);
setSelectedPorts({});

}}>
Confirm Mapping
</button>

</>

)}

</>
)}


{/* ================= STAGE 3 : LIVE TRAFFIC ANALYSIS ================= */}

{labStep === 3 && (
<>

<h3>📊 Stage 3: Network Traffic Investigation</h3>

<p>Inspect traffic from identified attacker services</p>

<table
style={{
width:"100%",
borderCollapse:"collapse",
marginTop:"10px"
}}
>

<thead>
<tr>
<th>IP</th>
<th>Port</th>
<th>Packets/sec</th>
<th>Status</th>
<th>Select</th>
</tr>
</thead>

<tbody>

{trafficData.map((t,i)=>(

<tr key={i}
style={{
border:"1px solid #00ffcc",
textAlign:"center"
}}
>

<td>{t.ip}</td>
<td>{t.port}</td>
<td>{t.rate}</td>

<td>
{t.attack
? "⚠️ Suspicious"
: "Normal"}
</td>

<td>

<input
type="checkbox"
checked={selectedTraffic.includes(i)}
onChange={()=>{

if(selectedTraffic.includes(i)){

setSelectedTraffic(
selectedTraffic.filter(x=>x!==i)
);

}else{

setSelectedTraffic([...selectedTraffic,i]);

}

}}
/>

</td>

</tr>

))}

</tbody>

</table>

<br/>

<button onClick={()=>{

let score = labScore;

const attacks = trafficData
.map((t,i)=>t.attack?i:null)
.filter(x=>x!==null);

const correct = selectedTraffic.filter(i=>
attacks.includes(i)
);

const wrong = selectedTraffic.filter(i=>
!attacks.includes(i)
);

if(
correct.length===attacks.length &&
wrong.length===0
){

score+=20;
addLog("✅ Malicious traffic isolated");
setLabStep(4);
analyzeIncident();


}

else if(wrong.length>0){

score-=10;
addLog("❌ Normal traffic blocked");

}

else{

score-=5;
addLog("⚠️ Incomplete traffic analysis");

}

setLabScore(score);
setSelectedTraffic([]);

}}>
Confirm Analysis
</button>

</>

)}


{/* ================= STAGE 4 : INCIDENT RESPONSE ================= */}

{labStep === 4 && incidentReport && (
<>

<h3>🛡️ Stage 4: Incident Containment</h3>

<h4>📑 Incident Summary</h4>

<ul>

{incidentReport.ddos && <li>⚠️ DDoS Activity Detected</li>}
{incidentReport.brute && <li>⚠️ Brute Force Attempts</li>}
{incidentReport.exploit && <li>⚠️ Service Exploitation</li>}
{incidentReport.scan && <li>⚠️ Reconnaissance Scan</li>}

<li>
🎯 Attacker IPs: {incidentReport.attackers.join(", ")}
</li>

</ul>

<h4>🔐 Select Response Actions</h4>

{[
  { k:"block", label:"Block Attacker IPs" },
  { k:"firewall", label:"Harden Firewall Rules" },
  { k:"patch", label:"Apply Security Patches" },
  { k:"reset", label:"Reset Credentials" },
  { k:"vpn", label:"Force VPN Encryption" },
  { k:"rate", label:"Enable Rate Limiting" }
].map(d => (

<button
key={d.k}
style={{
...S.choiceBtn,
background:
selectedDefense.includes(d.k)
? "#003333"
: "#000"
}}

onClick={()=>{

if(selectedDefense.includes(d.k)){

setSelectedDefense(
selectedDefense.filter(x=>x!==d.k)
);

}else{

setSelectedDefense([...selectedDefense,d.k]);

}

}}
>

{d.label}

</button>

))}

<br/><br/>

<button onClick={()=>{

let score = labScore;

let needed = [];

// Required actions
if(incidentReport.ddos) needed.push("rate","block");
if(incidentReport.brute) needed.push("reset","block");
if(incidentReport.exploit) needed.push("patch","firewall");
if(incidentReport.scan) needed.push("firewall");

const missing = needed.filter(n=>
!selectedDefense.includes(n)
);

const extra = selectedDefense.filter(d=>
!needed.includes(d)
);

if(missing.length===0 && extra.length===0){

score+=25;
addLog("✅ Incident fully contained");
setLabStep(5);

}

else if(extra.length>0){

score-=10;
addLog("❌ Unnecessary actions applied");

}

else{

score-=5;
addLog("⚠️ Partial containment");

}

setLabScore(score);
setSelectedDefense([]);

}}>
Deploy Response
</button>

</>

)}

{/* STAGE 5 */}

{labStep === 5 && (

<>
<h3>📑 Incident Report</h3>

<p>{labScore>=70?"✅ Resolved":"⚠️ Needs Review"}</p>

<button onClick={()=>{

setLabStep(1);
setLabScore(0);

setConfirmedAttackers([]);
setSelectedPorts([]);

setTrafficFlags({scan:false,flood:false});
setResponse({firewall:false,vpn:false,update:false});

}}>
Restart
</button>

</>

)}

</>

)}


{/* ================= ATTACK ================= */}

{tab==="attack" && currentAttack && (

<>
<h2>⚔️ Live Attack</h2>

<h3>{currentAttack.name}</h3>
<h3>Time: {timer}s</h3>

<div style={S.actions}>

<button onClick={()=>defend("firewall")}>Firewall</button>
<button onClick={()=>defend("vpn")}>VPN</button>
<button onClick={()=>defend("block")}>Block</button>
<button onClick={()=>defend("reset")}>Reset</button>

</div>

</>

)}


{/* ================= REPORT ================= */}

{tab==="report" && (

<>
<h2>📊 Performance Report</h2>

<p>Lab Score: {labScore}</p>
<p>Blocked: {blocked}</p>
<p>Failed: {failed}</p>
<p>XP: {xp}</p>

</>

)}

</div>

</div>

</div>

</div>

  );
}


/* ================= STYLES ================= */

const S = {

page:{
minHeight:"100vh",
background:"radial-gradient(circle,#001820,#000)",
color:"#00ffcc",
fontFamily:"monospace",
padding:"15px"
},

header:{
display:"flex",
justifyContent:"space-between",
borderBottom:"1px solid #00ffcc",
paddingBottom:"8px"
},

stats:{
display:"flex",
gap:"20px"
},

body:{
display:"grid",
gridTemplateColumns:"1fr 3fr",
gap:"15px",
marginTop:"15px"
},

panel:{
border:"1px solid #00ffcc",
padding:"10px",
height:"82vh",
overflow:"auto"
},

logs:{
fontSize:"12px"
},

center:{
border:"1px solid #00ffcc",
display:"flex",
flexDirection:"column"
},

tabs:{
display:"flex"
},

tab:{
flex:1,
padding:"7px",
color:"#00ffcc",
border:"1px solid #00ffcc",
cursor:"pointer"
},

content:{
padding:"15px",
overflow:"auto",
height:"100%"
},

actions:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px",
marginTop:"15px"
},

choiceBtn:{
border:"1px solid #00ffcc",
padding:"8px",
background:"#000",
color:"#00ffcc",
cursor:"pointer",
margin:"5px"
} ,

scanBox:{
border:"1px solid #00ffcc",
padding:"10px",
margin:"10px 0",
height:"200px",
overflow:"auto",
background:"#001111"
},


};
