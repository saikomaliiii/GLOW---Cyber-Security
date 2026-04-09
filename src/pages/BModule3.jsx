import { useState, useEffect } from "react";

/*
  BModule3.jsx
  Malware & Unsafe Downloads Cyber Range
*/

export default function BModule3() {

  /* ================= SYSTEM ================= */

  const [tab, setTab] = useState("theory");

  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Trainee");
  const [threat, setThreat] = useState("LOW");

  const [logs, setLogs] = useState([]);

  /* ================= LAB STATES ================= */

  const [labStep, setLabStep] = useState(1);
  const [scannedFiles, setScannedFiles] = useState([]);
  /* ================= MALWARE LAB STATES ================= */

const [detectedMalware, setDetectedMalware] = useState([]);
const [labScore, setLabScore] = useState(0);

const [selectedFiles, setSelectedFiles] = useState([]);
const [detectedSources, setDetectedSources] = useState([]);
const [currentSource, setCurrentSource] = useState(null);

/* Stage 2 */
const [sourceChoice, setSourceChoice] = useState("");

/* Stage 3 */
const [behaviorFlags, setBehaviorFlags] = useState({
  encrypt: false,
  keylog: false,
  network: false
});

/* Stage 4 */
const [cleanup, setCleanup] = useState({
  isolate: false,
  scan: false,
  backup: false
});

  
  const [selectedFile, setSelectedFile] = useState(null);
const [detectedFiles, setDetectedFiles] = useState([]);


  

  const [sourceInput, setSourceInput] = useState("");

  const [behaviour, setBehaviour] = useState({
    steal:false,
    send:false,
    disable:false
  });

  const [response, setResponse] = useState({
    scan:false,
    quarantine:false,
    reset:false
  });
  

  /* ================= ATTACK ================= */

  const attacks = [
    { name: "Ransomware Attack", fix: "backup" },
    { name: "Trojan Infection", fix: "scan" },
    { name: "Keylogger Installed", fix: "reset" },
    { name: "Spyware Detected", fix: "remove" },
    { name: "USB Malware", fix: "block" }
  ];

  const [currentAttack, setCurrentAttack] = useState(null);
  const [timer, setTimer] = useState(30);

  const [blocked, setBlocked] = useState(0);
  const [failed, setFailed] = useState(0);

  /* ================= HELPERS ================= */

  const addLog = (msg) => {
    setLogs(l => [
      ...l.slice(-20),
      `[${new Date().toLocaleTimeString()}] ${msg}`
    ]);
  };

  /* ================= ATTACK ENGINE ================= */

  useEffect(() => {
    if (tab === "attack") startAttack();
  }, [tab]);

  const startAttack = () => {

    const atk =
      attacks[Math.floor(Math.random() * attacks.length)];

    setCurrentAttack(atk);
    setTimer(30);

    setThreat("MEDIUM");

    addLog(`⚠️ ${atk.name} detected`);
  };

  useEffect(() => {

    if (tab === "attack" && timer > 0) {

      const t = setInterval(() => {
        setTimer(v => v - 1);
      }, 1000);

      return () => clearInterval(t);
    }

    if (timer === 0 && tab === "attack") {

      addLog(`❌ ${currentAttack.name} succeeded`);

      setFailed(f => f + 1);
      setThreat("HIGH");
      setXp(x => x - 15);

      startAttack();
    }

  }, [timer, tab]);

  const defend = (type) => {

    if (type === currentAttack.fix) {

      addLog(`✅ ${currentAttack.name} blocked`);

      setBlocked(b => b + 1);
      setXp(x => x + 25);
      setThreat("LOW");

      startAttack();

    } else {

      addLog("⚠️ Wrong response");

      setFailed(f => f + 1);
      setXp(x => x - 10);
    }
  };

  /* ================= RANK ================= */

  useEffect(() => {

    if (xp < 100) setRank("Trainee");
    else if (xp < 250) setRank("Junior SOC");
    else if (xp < 450) setRank("Security Analyst");
    else if (xp < 700) setRank("Threat Hunter");
    else setRank("Cyber Defender");

  }, [xp]);

  /* ================= FILE DATA ================= */

  const files = [
  {
    name: "crack_photoshop.exe",
    bad: true,
    source: "Cracked Website"
  },
  {
    name: "invoice_2024.pdf.exe",
    bad: true,
    source: "Email Attachment"
  },
  {
    name: "windows_update.exe",
    bad: false,
    source: "Official Update"
  },
  {
    name: "family_photos.zip",
    bad: false,
    source: "USB Drive"
  }
];
const [infectedFiles, setInfectedFiles] = useState([]);
const [tracedSources, setTracedSources] = useState([]);


  /* ================= UI ================= */

  return (

    <div style={S.page}>

      {/* HEADER */}

      <div style={S.header}>

        <h2>🛡️ MALWARE DEFENSE CYBER RANGE</h2>

        <div style={S.stats}>
          <span>Threat: {threat}</span>
          <span>XP: {xp}</span>
          <span>Rank: {rank}</span>
        </div>

      </div>


      <div style={S.body}>

        {/* LOGS */}

        <div style={S.panel}>

          <h3>📡 System Logs</h3>

          <div style={S.logs}>
            {logs.map((l,i)=>(
              <div key={i}>{l}</div>
            ))}
          </div>

        </div>


        {/* CENTER */}

        <div style={S.center}>

          {/* TABS */}

          <div style={S.tabs}>

            {["theory","lab","attack","report"].map(t=>(
              <button
                key={t}
                onClick={()=>setTab(t)}
                style={{
                  ...S.tab,
                  background: tab===t?"#00ffcc":"#000"
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}

          </div>


          <div style={S.content}>

{/* ================= THEORY ================= */}

{tab==="theory" && (
<>
<h2>📘 Malware Fundamentals</h2>

<h3>1. What is Malware?</h3>
<p>
Malware is malicious software designed to damage,
steal data, or control systems.
</p>

<h3>2. Types of Malware</h3>
<ul>
<li>Virus</li>
<li>Trojan</li>
<li>Ransomware</li>
<li>Spyware</li>
<li>Keylogger</li>
</ul>

<h3>3. Infection Sources</h3>
<ul>
<li>Cracked software</li>
<li>Fake downloads</li>
<li>USB drives</li>
<li>Email attachments</li>
</ul>

<h3>4. Symptoms</h3>
<ul>
<li>Slow system</li>
<li>Unknown apps</li>
<li>Popups</li>
<li>High data usage</li>
</ul>

<h3>5. Protection</h3>
<ul>
<li>Antivirus</li>
<li>Updates</li>
<li>Trusted sources</li>
<li>Backups</li>
</ul>
</>
)}


{/* ================= MALWARE LAB ================= */}

{tab === "lab" && (
<>
<h2 style={{textAlign:"center"}}>🦠 Malware Response Lab</h2>

<p style={{textAlign:"center"}}>
Role: Junior SOC Analyst
</p>

<p style={{textAlign:"center"}}>
Stage {labStep} / 5 | Score: {labScore}
</p>

<hr style={{border:"1px solid #00ffcc"}}/>

{/* ================= STAGE 1 ================= */}

{labStep === 1 && (
<>
  <h3>📁 Stage 1: Malware File Detection</h3>

  <p>Select all files that look dangerous:</p>

  {files.map(f => (
    <div
      key={f.name}
      style={{
        border: "1px solid #00ffcc",
        padding: "8px",
        marginBottom: "6px",
        cursor: "pointer",
        background: selectedFiles.includes(f.name)
          ? "#003333"
          : "#000"
      }}
      onClick={() => {

        if (selectedFiles.includes(f.name)) {

          setSelectedFiles(
            selectedFiles.filter(x => x !== f.name)
          );

        } else {

          setSelectedFiles([
            ...selectedFiles,
            f.name
          ]);

        }

      }}
    >
      {f.name}
    </div>
  ))}

  <br />

  <button onClick={() => {

    let score = labScore;

    // All malware files
    const badFiles = files
      .filter(f => f.bad)
      .map(f => f.name);

    // User detected malware
    const detectedBad = badFiles.filter(b =>
      selectedFiles.includes(b)
    );

    // User selected safe files wrongly
    const wrongSelected = selectedFiles.filter(
      s => !badFiles.includes(s)
    );

    // If user found all malware
    if (detectedBad.length === badFiles.length) {

      score += 20;

      if (wrongSelected.length > 0) {

        score -= 5;
        addLog("All malware detected (minor mistakes)");

      } else {

        addLog("Perfect malware detection");

      }

      // Pass infected files to Stage 2
      const infected = files.filter(f => f.bad);

      setInfectedFiles(infected);
      setLabStep(2);

    } else {

      score -= 5;
      addLog("Missed some malware files");

    }

    setLabScore(score);
    setSelectedFiles([]);

  }}>
    Submit Detection
  </button>

</>
)}



{/* ================= STAGE 2 ================= */}

{labStep === 2 && (
<>
  <h3>🌐 Stage 2: Infection Source Tracing</h3>

  <p>
    Trace infection sources of detected files:
  </p>

  {infectedFiles.map(f => {

    const done =
      tracedSources.includes(f.name);

    return (

      <div
        key={f.name}

        style={{
          border:"1px solid #00ffcc",
          padding:"8px",
          marginBottom:"6px",
          cursor:"pointer",

          background:
            done ? "#003333" : "#000"
        }}

        onClick={()=>{

          if(done) return;

          let score = labScore;

          addLog(`🔍 Analyzing ${f.name}`);
          addLog(`📌 Source: ${f.source}`);

          setTracedSources(prev => [
            ...prev,
            f.name
          ]);

          score += 10;

          addLog("Source traced");

          setLabScore(score);

        }}
      >

        📄 {f.name}

        {done && "  ✅ Traced"}

      </div>

    );

  })}

  <br/>

  <p>
    Sources Traced:
    {tracedSources.length} / {infectedFiles.length}
  </p>

  {tracedSources.length === infectedFiles.length && (

    <button onClick={()=>{

      addLog("All sources traced");
      setLabStep(3);

    }}>
      Proceed to Behavior Analysis
    </button>

  )}

</>
)}



{/* ================= STAGE 3 ================= */}

{labStep===3 && (
<>
<h3>📊 Stage 3: Malware Behavior Analysis</h3>

<p>Select suspicious activities:</p>

<div style={S.choiceGrid}>

<button
style={{
...S.choiceBtn,
background: behaviorFlags.encrypt?"#003333":"#000"
}}
onClick={()=>setBehaviorFlags({...behaviorFlags,encrypt:!behaviorFlags.encrypt})}
>
File Encryption
</button>

<button
style={{
...S.choiceBtn,
background: behaviorFlags.keylog?"#003333":"#000"
}}
onClick={()=>setBehaviorFlags({...behaviorFlags,keylog:!behaviorFlags.keylog})}
>
Keylogging
</button>

<button
style={{
...S.choiceBtn,
background: behaviorFlags.network?"#003333":"#000"
}}
onClick={()=>setBehaviorFlags({...behaviorFlags,network:!behaviorFlags.network})}
>
Suspicious Network
</button>

<button disabled style={S.choiceBtn}>
Normal App Activity
</button>

</div>

<br/>

<button onClick={()=>{

let score = labScore;

if(
behaviorFlags.encrypt &&
behaviorFlags.keylog &&
behaviorFlags.network
){

score+=15;
addLog("Malware behavior confirmed");
setLabStep(4);

}else{

score-=5;
addLog("Behavior analysis incomplete");

}

setLabScore(score);

}}>
Confirm Analysis
</button>

</>
)}


{/* ================= STAGE 4 ================= */}

{labStep===4 && (
<>
<h3>🛠️ Stage 4: System Cleanup</h3>

<p>Select cleanup steps:</p>

<div style={S.choiceGrid}>

<button
style={{
...S.choiceBtn,
background: cleanup.isolate?"#003333":"#000"
}}
onClick={()=>setCleanup({...cleanup,isolate:!cleanup.isolate})}
>
Isolate System
</button>

<button
style={{
...S.choiceBtn,
background: cleanup.scan?"#003333":"#000"
}}
onClick={()=>setCleanup({...cleanup,scan:!cleanup.scan})}
>
Run Antivirus Scan
</button>

<button
style={{
...S.choiceBtn,
background: cleanup.backup?"#003333":"#000"
}}
onClick={()=>setCleanup({...cleanup,backup:!cleanup.backup})}
>
Restore Backup
</button>

<button disabled style={S.choiceBtn}>
Ignore Issue
</button>

</div>

<br/>

<button onClick={()=>{

let score = labScore;

if(cleanup.isolate && cleanup.scan && cleanup.backup){

score+=20;
addLog("System cleaned");
setLabStep(5);

}else{

score-=5;
addLog("Cleanup incomplete");

}

setLabScore(score);

}}>
Execute Cleanup
</button>

</>
)}


{/* ================= STAGE 5 ================= */}

{labStep===5 && (
<>
<h3>📑 Stage 5: Incident Report</h3>

<div style={S.reportBox}>

<p><b>Incident:</b> Malware Infection</p>
<p><b>Source:</b> Cracked Software</p>
<p><b>Severity:</b> High</p>
<p><b>Status:</b> Resolved</p>

</div>

<br/>

<h3>
{labScore>=70
?"✅ Malware Eliminated Successfully"
:"⚠️ Needs Further Training"}
</h3>

<button onClick={()=>{

setLabStep(1);
setLabScore(0);

setSelectedFiles([]);
setBehaviorFlags({});
setCleanup({});
setSourceChoice("");

}}>
Start New Case
</button>

</>
)}

</>
)}


{/* ================= ATTACK ================= */}

{tab==="attack" && currentAttack && (
<>
<h2>⚔️ Malware Incident Response</h2>

<h3>{currentAttack.name}</h3>
<h3>Time: {timer}s</h3>

<div style={S.actions}>

<button onClick={()=>defend("backup")}>
Restore Backup
</button>

<button onClick={()=>defend("scan")}>
Run Scan
</button>

<button onClick={()=>defend("reset")}>
Reset System
</button>

<button onClick={()=>defend("remove")}>
Remove Spyware
</button>

<button onClick={()=>defend("block")}>
Block USB
</button>

</div>
</>
)}


{/* ================= REPORT ================= */}

{tab==="report" && (
<>
<h2>📊 Security Performance Report</h2>

<p>Lab Score: {labScore}</p>
<p>Blocked: {blocked}</p>
<p>Failed: {failed}</p>
<p>Total XP: {xp}</p>

<p>
Accuracy:
{blocked+failed===0
?" N/A"
:` ${Math.round(
(blocked/(blocked+failed))*100
)}%`}
</p>

<p>
Recommendation:
Improve safe downloading habits.
</p>

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
background:"radial-gradient(circle,#001,#000)",
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
fontSize:"12px",
lineHeight:"1.4"
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

input:{
width:"100%",
background:"#000",
color:"#00ffcc",
border:"1px solid #00ffcc",
padding:"6px",
marginBottom:"8px"
},

actions:{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:"10px",
marginTop:"15px"
},

choiceGrid:{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px"
},

choiceBtn:{
border:"1px solid #00ffcc",
padding:"8px",
cursor:"pointer",
background:"#000",
color:"#00ffcc"
},

reportBox:{
border:"1px solid #00ffcc",
padding:"12px"
}

};
