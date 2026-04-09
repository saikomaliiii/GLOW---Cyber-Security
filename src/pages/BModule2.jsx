import { useState, useEffect } from "react";

/*
  BModule2.jsx
  Phishing & Fake Website Detection Cyber Range
*/

export default function BModule2() {

  /* ================= SYSTEM ================= */

  const [tab, setTab] = useState("theory");

  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Trainee");
  const [threat, setThreat] = useState("LOW");

  const [logs, setLogs] = useState([]);

  /* ================= LAB ================= */

  /* ================= LAB STATES ================= */
const [detectedLinks, setDetectedLinks] = useState([]);
const [currentLink, setCurrentLink] = useState(null);


const [labStep, setLabStep] = useState(1);
const [selectedMail, setSelectedMail] = useState(null);
const [labScore, setLabScore] = useState(0);

const [mailFlags, setMailFlags] = useState({
  fake: false,
  urgent: false,
  link: false
});

const [safe, setSafe] = useState({
  mfa: false,
  aware: false,
  filter: false
});

const [urlInput, setUrlInput] = useState("");


  /* ================= ATTACK ================= */

  const attacks = [
    { name: "Mass Phishing Campaign", fix: "filter" },
    { name: "Spear Phishing", fix: "training" },
    { name: "Fake Login Portal", fix: "block" },
    { name: "Credential Harvesting", fix: "reset" },
    { name: "Malicious Attachment", fix: "scan" }
  ];

  const [currentAttack, setCurrentAttack] = useState(null);
  const [timer, setTimer] = useState(35);

  const [blocked, setBlocked] = useState(0);
  const [failed, setFailed] = useState(0);

  /* ================= DATA ================= */

  const emails = [
    {
      id: 1,
      from: "security@g00gle-support.com",
      subject: "Urgent: Account Verification",
      fake: true
    },
    {
      id: 2,
      from: "hr@company.com",
      subject: "Salary Update",
      fake: false
    },
    {
      id: 3,
      from: "support@paypa1-alert.com",
      subject: "Payment Failed",
      fake: true
    },
    {
      id: 4,
      from: "admin@college.edu",
      subject: "Exam Schedule",
      fake: false
    }
  ];

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
    setTimer(35);

    addLog(`⚠️ ${atk.name} detected`);
    setThreat("MEDIUM");
  };

  useEffect(() => {

    if (tab === "attack" && timer > 0) {

      const t = setInterval(() => {
        setTimer(v => v - 1);
      }, 1000);

      return () => clearInterval(t);
    }

    if (timer === 0 && tab === "attack") {

      addLog(`❌ ${currentAttack.name} successful`);

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

  /* ================= UI ================= */

  return (

    <div style={S.page}>

      {/* HEADER */}

      <div style={S.header}>

        <h2>🛡️ PHISHING DETECTION CYBER RANGE</h2>

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

            {["theory", "lab", "attack", "report"].map(t => (
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
                <h2>📘 Phishing Fundamentals</h2>

                <h3>1. What is Phishing?</h3>

                <p>
                  Phishing is a social engineering attack
                  that tricks users into revealing
                  passwords and personal data.
                </p>

                <h3>2. Types of Phishing</h3>

                <ul>
                  <li>Email Phishing</li>
                  <li>Smishing (SMS)</li>
                  <li>Vishing (Calls)</li>
                  <li>Spear Phishing</li>
                  <li>Whaling</li>
                </ul>

                <h3>3. Email Red Flags</h3>

                <ul>
                  <li>Fake sender domain</li>
                  <li>Urgency</li>
                  <li>Grammar errors</li>
                  <li>Unknown links</li>
                </ul>

                <h3>4. URL Analysis</h3>

                <p>
                  Attackers use similar looking domains
                  to trick users.
                </p>

                <code>
                  google.com → g00gle.com
                </code>

                <h3>5. Protection Methods</h3>

                <ul>
                  <li>Email filters</li>
                  <li>User awareness</li>
                  <li>MFA</li>
                  <li>Password managers</li>
                </ul>

              </>
            )}
{/* ================= LAB ================= */}

{tab === "lab" && (
<>
  <h2 style={{textAlign:"center"}}>🔬 Phishing Incident Response Lab</h2>

  <p style={{textAlign:"center"}}>
    Role: Junior SOC Analyst
  </p>

  <p style={{textAlign:"center"}}>
    Stage {labStep} / 5 | Score: {labScore}
  </p>

  <hr style={{border:"1px solid #00ffcc"}}/>

{/* ================================================= */}
{/* ================= STAGE 1 ====================== */}
{/* ================================================= */}

{labStep === 1 && (
<>
  <h3>📧 Stage 1: Email Triage</h3>

  <p>Identify and report all phishing emails:</p>

  {emails.map(m=>(
    <div
      key={m.id}
      style={{
        border:"1px solid #00ffcc",
        padding:"8px",
        marginBottom:"6px",
        background:
          selectedMail?.id===m.id
          ?"#003333":"#000",
        cursor:"pointer"
      }}
      onClick={()=>setSelectedMail(m)}
    >

      <b>From:</b> {m.from}<br/>
      <b>Subject:</b> {m.subject}

    </div>
  ))}

  {selectedMail && (
  <>
    <br/>

    <button onClick={()=>{

      let score = labScore;
      let links = [...detectedLinks];

      if(selectedMail.fake){

        score += 10;
        addLog("Phishing email detected");

        if(selectedMail.from.includes("g00gle")){
          links.push("https://login.g00gle-secure.com");
        }

        if(selectedMail.from.includes("paypa1")){
          links.push("https://secure.paypa1-login.ru");
        }

      }else{

        score -= 5;
        addLog("False positive detected");

      }

      setLabScore(score);
      setDetectedLinks(links);
      setSelectedMail(null);

      if(links.length >= 2){
        setCurrentLink(links[0]);
        setLabStep(2);
      }

    }}>
      Submit Investigation
    </button>
  </>
  )}

</>
)}

{/* ================= STAGE 2 ================= */}

{labStep === 2 && (
<>
  <h3>🔗 Stage 2: URL Investigation</h3>

  <p>Analyze this suspicious link:</p>

  <div style={{
    border:"1px solid #00ffcc",
    padding:"10px",
    margin:"10px 0",
    background:"#000"
  }}>
    {currentLink}
  </div>

  <p>
    Task: Identify the <b>real root domain</b> of this URL.
  </p>

  <p style={{fontSize:"13px",opacity:0.8}}>
    Example: login.google.fake.com → fake.com
  </p>

  <input
    style={S.input}
    placeholder="Enter root domain (example.com)"
    value={urlInput}
    onChange={e=>setUrlInput(e.target.value.toLowerCase())}
  />

  <button
    style={{marginTop:"10px"}}
    onClick={()=>{

      let score = labScore;

      const domain =
        currentLink.replace("https://","").split("/")[0];

      const realDomain =
        domain.split(".").slice(-2).join(".");

      if(urlInput === realDomain){

        score += 15;
        addLog("Root domain correctly identified");

        const remaining =
          detectedLinks.filter(l=>l!==currentLink);

        setDetectedLinks(remaining);

        if(remaining.length > 0){
          setCurrentLink(remaining[0]);
        }else{
          setLabStep(3);
        }

      }else{

        score -= 5;
        addLog("Wrong root domain");

      }

      setLabScore(score);
      setUrlInput("");

    }}
  >
    Verify Domain
  </button>

</>
)}


{/* ================================================= */}
{/* ================= STAGE 3 ====================== */}
{/* ================================================= */}

{labStep === 3 && (
<>
  <h3>🕸️ Stage 3: Web Forensics</h3>

  <p>Captured phishing website:</p>

  <pre style={S.code}>
&lt;form action="steal.php"&gt;
&lt;input name="email"&gt;
&lt;input name="password"&gt;
&lt;script src="tracker.js"&gt;&lt;/script&gt;
  </pre>

  <p>Select malicious components:</p>

  <div style={S.choiceGrid}>

    <button
      style={{
        ...S.choiceBtn,
        background: mailFlags.form?"#003333":"#000"
      }}
      onClick={()=>setMailFlags({...mailFlags,form:!mailFlags.form})}
    >
      Credential Harvester <br />
    </button> <br />

    <button
      style={{
        ...S.choiceBtn,
        background: mailFlags.js?"#003333":"#000"
      }}
      onClick={()=>setMailFlags({...mailFlags,js:!mailFlags.js})}
    >
      Tracking Script <br />
    </button> <br />

    <button disabled style={S.choiceBtn}>
      Page Styling <br />
    </button> <br />

    <button disabled style={S.choiceBtn}>
      Login Button <br />
    </button> <br />

  </div>

  <br/>

  <button onClick={()=>{

    let score = labScore;

    if(mailFlags.form && mailFlags.js){

      score += 15;
      addLog("Credential harvesting confirmed");
      setLabStep(4);

    }else{

      score -= 5;
      addLog("Missed indicators");

    }

    setLabScore(score);

  }}>
    Confirm Threat
  </button>

</>
)}

{/* ================================================= */}
{/* ================= STAGE 4 ====================== */}
{/* ================================================= */}

{labStep === 4 && (
<>
  <h3>🚨 Stage 4: Incident Response</h3>

  <p>Select mitigation actions:</p>

  <div style={S.choiceGrid}>

    <button
      style={{
        ...S.choiceBtn,
        background: safe.block?"#003333":"#000"
      }}
      onClick={()=>setSafe({...safe,block:!safe.block})}
    >
      Block Domain
    </button> <br />

    <button
      style={{
        ...S.choiceBtn,
        background: safe.reset?"#003333":"#000"
      }}
      onClick={()=>setSafe({...safe,reset:!safe.reset})}
    >
      Reset Passwords
    </button> <br />

    <button
      style={{
        ...S.choiceBtn,
        background: safe.notify?"#003333":"#000"
      }}
      onClick={()=>setSafe({...safe,notify:!safe.notify})}
    >
      Notify Users
    </button> <br />

    <button disabled style={S.choiceBtn}>
      Ignore 
    </button> <br />

  </div>

  <br/>

  <button onClick={()=>{

    let score = labScore;

    if(safe.block && safe.reset && safe.notify){

      score += 20;
      addLog("Incident mitigated");
      setLabStep(5);

    }else{

      score -= 5;
      addLog("Weak response");

    }

    setLabScore(score);

  }}>
    Execute Response
  </button>

</>
)}

{/* ================================================= */}
{/* ================= STAGE 5 ====================== */}
{/* ================================================= */}

{labStep === 5 && (
<>
  <h3>📑 Stage 5: SOC Report</h3>

  <div style={S.reportBox}>

    <p><b>Incident:</b> Credential Phishing</p>
    <p><b>Vector:</b> Email + Fake Website</p>
    <p><b>Severity:</b> High</p>
    <p><b>Status:</b> Resolved</p>
    <p><b>Domains:</b> {detectedLinks.length===0?"All Contained":"Pending"}</p>

  </div>

  <br/>

  <h3>
    {labScore>=70
      ?"✅ Case Closed Successfully"
      :"⚠️ Review Required"}
  </h3>

  <button onClick={()=>{

    setLabStep(1);
    setLabScore(0);

    setDetectedLinks([]);
    setCurrentLink(null);

    setSelectedMail(null);
    setMailFlags({});
    setSafe({});
    setUrlInput("");

  }}>
    New Case
  </button>

</>
)}

</>
)}



            {/* ================= ATTACK ================= */}

            {tab === "attack" && currentAttack && (
              <>
                <h2>⚔️ Phishing Incident Response</h2>

                <h3>Attack: {currentAttack.name}</h3>
                <h3>Time: {timer}s</h3>

                <div style={S.actions}>

                  <button onClick={() => defend("filter")}>
                    Enable Filter
                  </button>

                  <button onClick={() => defend("training")}>
                    User Training
                  </button>

                  <button onClick={() => defend("block")}>
                    Block Domain
                  </button>

                  <button onClick={() => defend("reset")}>
                    Force Reset
                  </button>

                  <button onClick={() => defend("scan")}>
                    Malware Scan
                  </button>

                </div>
              </>
            )}

            {/* ================= REPORT ================= */}

            {tab === "report" && (
              <>
                <h2>📊 Threat Analysis Report</h2>

                <p>Lab Score: {labScore}</p>
                <p>Blocked: {blocked}</p>
                <p>Breached: {failed}</p>
                <p>Total XP: {xp}</p>

                <p>
                  Accuracy:
                  {blocked + failed === 0
                    ? " N/A"
                    : ` ${Math.round(
                        (blocked / (blocked + failed)) * 100
                      )}%`}
                </p>

                <p>
                  Recommendation:
                  Improve email filtering
                  and awareness training.
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

  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle,#001820,#000)",
    color: "#00ffcc",
    fontFamily: "monospace",
    padding: "15px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #00ffcc",
    paddingBottom: "8px"
  },

  stats: {
    display: "flex",
    gap: "20px"
  },

  body: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: "15px",
    marginTop: "15px"
  },

  panel: {
    border: "1px solid #00ffcc",
    padding: "10px",
    height: "82vh",
    overflow: "auto"
  },

  logs: {
    fontSize: "12px",
    lineHeight: "1.4"
  },

  center: {
    border: "1px solid #00ffcc",
    display: "flex",
    flexDirection: "column"
  },

  tabs: {
    display: "flex"
  },

  tab: {
    flex: 1,
    padding: "7px",
    color: "#00ffcc",
    border: "1px solid #00ffcc",
    cursor: "pointer"
  },

  content: {
    padding: "15px",
    overflow: "auto",
    height: "100%"
  },

  input: {
    width: "100%",
    background: "#000",
    color: "#00ffcc",
    border: "1px solid #00ffcc",
    padding: "6px",
    marginBottom: "8px"
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginTop: "15px"
  },

  mail: {
    border: "1px solid #00ffcc",
    padding: "8px",
    marginBottom: "6px",
    cursor: "pointer"
  }

};
