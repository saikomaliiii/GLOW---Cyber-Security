import { useState, useEffect } from "react";
import Desktop from "./Desktop";
import CaseState from "./CaseState";
import { getHint } from "./HintEngine";

export default function IncidentLab() {
  const [started, setStarted] = useState(false);
  const [hint, setHint] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const h = getHint();
      if (h) setHint(h);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      CaseState.compromisedUser &&
      CaseState.phishingFound &&
      CaseState.malwareFound &&
      CaseState.maliciousPort
    ) {
      setDone(true);
    }
  });

  if (!started) {
    return (
      <div style={S.page}>
        <h2>Incident Response Challenge</h2>
        <p><b>Role:</b> SOC Analyst</p>
        <p>
          Suspicious authentication activity has been detected.
          Investigate the environment and submit an incident report.
        </p>
        <button onClick={() => setStarted(true)}>START INVESTIGATION</button>
      </div>
    );
  }

  if (done) {
    return (
      <div style={S.page}>
        <h2>Incident Report Ready</h2>
        <p>Compromised User: {CaseState.compromisedUser}</p>
        <p>Attack Vector: Phishing</p>
        <p>Malware: Keylogger</p>
        <p>Malicious Port: {CaseState.maliciousPort}</p>
        <p><b>Status:</b> Investigation Complete</p>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <Desktop />
      {hint && <div style={S.hint}>HINT: {hint}</div>}
    </div>
  );
}

const S = {
  page:{
    background:"#060b12",
    color:"#00ffcc",
    minHeight:"100vh",
    padding:"16px",
    fontFamily:"monospace"
  },
  hint:{
    marginTop:"10px",
    border:"1px dashed #00ffcc",
    padding:"6px",
    fontSize:"12px"
  }
};
