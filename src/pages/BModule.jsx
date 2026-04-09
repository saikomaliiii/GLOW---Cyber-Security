import { useState, useEffect } from "react";

/*
  BModule.jsx
  Password & Authentication Cyber Range (Full Version)
*/

export default function BModule() {

  /* ================= SYSTEM ================= */

  const [tab, setTab] = useState("theory");

  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState("Trainee");
  const [threat, setThreat] = useState("LOW");

  const [logs, setLogs] = useState([]);

  /* ================= LAB ================= */

  const [labStep, setLabStep] = useState(1);
  const [password, setPassword] = useState("");
  const [entropy, setEntropy] = useState(0);

  const [policy, setPolicy] = useState({
    length: 12,
    attempts: 5,
    mfa: false,
    hash: "bcrypt"
  });

  const [breachSafe, setBreachSafe] = useState(false);
  const [loginResult, setLoginResult] = useState("");
  const [labScore, setLabScore] = useState(0);

  /* ================= ATTACK ================= */

  const attacks = [
    { name: "Brute Force", fix: "lock" },
    { name: "Credential Stuffing", fix: "reset" },
    { name: "Phishing Portal", fix: "alert" },
    { name: "OTP Interception", fix: "mfa" },
    { name: "Database Breach", fix: "rehash" }
  ];

  const [currentAttack, setCurrentAttack] = useState(null);
  const [timer, setTimer] = useState(40);

  const [blocked, setBlocked] = useState(0);
  const [failed, setFailed] = useState(0);

  /* ================= HELPERS ================= */

  const addLog = (msg) => {
    setLogs(l => [
      ...l.slice(-20),
      `[${new Date().toLocaleTimeString()}] ${msg}`
    ]);
  };

  /* ================= PASSWORD ENTROPY ================= */

  useEffect(() => {

    let set = 0;

    if (/[a-z]/.test(password)) set += 26;
    if (/[A-Z]/.test(password)) set += 26;
    if (/[0-9]/.test(password)) set += 10;
    if (/[^A-Za-z0-9]/.test(password)) set += 32;

    if (password.length && set) {
      const e = Math.log2(Math.pow(set, password.length));
      setEntropy(Math.round(e));
    } else {
      setEntropy(0);
    }

  }, [password]);

  /* ================= BREACH CHECK ================= */

  const checkBreach = () => {

    const weak = [
      "123456", "password", "admin123",
      "welcome123", "india123"
    ];

    if (weak.includes(password.toLowerCase())) {
      setBreachSafe(false);
      addLog("⚠️ Password found in breach database");
    } else {
      setBreachSafe(true);
      addLog("✅ Password not found in breaches");
      setLabScore(s => s + 10);
    }
  };

  /* ================= LOGIN SIM ================= */

  const simulateLogin = () => {

    if (!policy.mfa || policy.attempts > 6) {
      setLoginResult("❌ Account Compromised");
      setThreat("HIGH");
      addLog("❌ Login compromised");
      setLabScore(s => s - 10);
    } else {
      setLoginResult("✅ Secure Login");
      setThreat("LOW");
      addLog("✅ Secure authentication verified");
      setLabScore(s => s + 15);
    }
  };

  /* ================= ATTACK ENGINE ================= */

  useEffect(() => {
    if (tab === "attack") startAttack();
  }, [tab]);

  const startAttack = () => {

    const atk =
      attacks[Math.floor(Math.random() * attacks.length)];

    setCurrentAttack(atk);
    setTimer(40);

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

      addLog("⚠️ Wrong mitigation");

      setFailed(f => f + 1);
      setXp(x => x - 10);
    }
  };

  /* ================= RANK ================= */

  useEffect(() => {

    if (xp < 100) setRank("Trainee");
    else if (xp < 250) setRank("Junior SOC");
    else if (xp < 450) setRank("Security Analyst");
    else if (xp < 700) setRank("Incident Responder");
    else setRank("Cyber Defender");

  }, [xp]);

  /* ================= UI ================= */

  return (

    <div style={S.page}>

      {/* HEADER */}

      <div style={S.header}>

        <h2>🛡️ AUTHENTICATION CYBER RANGE</h2>

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

          <h3>📡 System Logs</h3>

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
                <h2>📘 Password & Authentication Fundamentals</h2>

                <h3>1. Why Authentication Matters</h3>
                <p>
                  Authentication verifies user identity.
                  Weak authentication leads to account takeover.
                </p>

                <h3>2. Password Basics</h3>
                <p>
                  Strong passwords prevent brute-force
                  and dictionary attacks.
                </p>

                <ul>
                  <li>Min 12 characters</li>
                  <li>Upper + Lower case</li>
                  <li>Numbers + Symbols</li>
                </ul>

                <h3>3. Password Entropy</h3>

                <code>
                  Entropy = log2(charset ^ length)
                </code>

                <p>
                  High entropy = high security.
                </p>

                <h3>4. Attack Techniques</h3>

                <ul>
                  <li>Brute Force</li>
                  <li>Credential Stuffing</li>
                  <li>Phishing</li>
                  <li>OTP Hijacking</li>
                </ul>

                <h3>5. Secure Storage</h3>

                <p>
                  Passwords are stored using
                  bcrypt / Argon2 / PBKDF2.
                </p>

                <h3>6. Multi-Factor Authentication</h3>

                <p>
                  MFA adds an extra layer of security.
                </p>

                <h3>7. Industry Standards</h3>

                <p>
                  Follow NIST SP 800-63 guidelines.
                </p>
              </>
            )}

            {/* ================= LAB ================= */}

            {tab === "lab" && (
              <>
                <h2>🔬 Secure Authentication Lab</h2>

                <p>Step {labStep} / 5</p>
                <p>Lab Score: {labScore}</p>

                {/* STEP 1 */}

                {labStep === 1 && (
                  <>
                    <h3>1️⃣ Password Audit</h3>

                    <input
                      style={S.input}
                      placeholder="Create password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />

                    <p>Entropy: {entropy} bits</p>

                    <p>
                      {entropy < 60 && "❌ Weak"}
                      {entropy >= 60 && entropy < 80 && "⚠️ Moderate"}
                      {entropy >= 80 && "✅ Strong"}
                    </p>

                    <button
                      disabled={entropy < 75}
                      onClick={() => {
                        setLabScore(s => s + 15);
                        setLabStep(2);
                      }}
                    >
                      Continue
                    </button>
                  </>
                )}

                {/* STEP 2 */}

                {labStep === 2 && (
                  <>
                    <h3>2️⃣ Breach Check</h3>

                    <button onClick={checkBreach}>
                      Scan Database
                    </button>

                    <p>
                      {breachSafe
                        ? "✅ Safe Password"
                        : "❌ Breached Password"}
                    </p>

                    {breachSafe && (
                      <button onClick={() => setLabStep(3)}>
                        Continue
                      </button>
                    )}
                  </>
                )}

                {/* STEP 3 */}

                {labStep === 3 && (
                  <>
                    <h3>3️⃣ Policy Setup</h3>

                    <label>
                      Max Attempts
                      <input
                        type="number"
                        value={policy.attempts}
                        onChange={e =>
                          setPolicy({
                            ...policy,
                            attempts: Number(e.target.value)
                          })
                        }
                      />
                    </label>

                    <label>
                      Enable MFA
                      <input
                        type="checkbox"
                        checked={policy.mfa}
                        onChange={e =>
                          setPolicy({
                            ...policy,
                            mfa: e.target.checked
                          })
                        }
                      />
                    </label>

                    <label>
                      Hash Algorithm
                      <select
                        value={policy.hash}
                        onChange={e =>
                          setPolicy({
                            ...policy,
                            hash: e.target.value
                          })
                        }
                      >
                        <option>bcrypt</option>
                        <option>argon2</option>
                        <option>pbkdf2</option>
                      </select>
                    </label>

                    <button
                      disabled={!policy.mfa}
                      onClick={() => {
                        setLabScore(s => s + 20);
                        setLabStep(4);
                      }}
                    >
                      Apply Policy
                    </button>
                  </>
                )}

                {/* STEP 4 */}

                {labStep === 4 && (
                  <>
                    <h3>4️⃣ Attack Simulation</h3>

                    <button onClick={simulateLogin}>
                      Run Test
                    </button>

                    <p>{loginResult}</p>

                    {loginResult.includes("Secure") && (
                      <button onClick={() => setLabStep(5)}>
                        Continue
                      </button>
                    )}
                  </>
                )}

                {/* STEP 5 */}

                {labStep === 5 && (
                  <>
                    <h3>5️⃣ Security Review</h3>

                    <p>Entropy: {entropy}</p>
                    <p>MFA: {policy.mfa ? "Yes" : "No"}</p>
                    <p>Hash: {policy.hash}</p>

                    <h3>✅ Lab Completed</h3>

                    <button
                      onClick={() => {
                        setXp(x => x + labScore);
                        setLabScore(0);
                        setLabStep(1);
                      }}
                    >
                      Save & Reset
                    </button>
                  </>
                )}

              </>
            )}

            {/* ================= ATTACK ================= */}

            {tab === "attack" && currentAttack && (
              <>
                <h2>⚔️ Incident Response</h2>

                <h3>Attack: {currentAttack.name}</h3>
                <h3>Time: {timer}s</h3>

                <div style={S.actions}>

                  <button onClick={() => defend("lock")}>
                    Lock Account
                  </button>

                  <button onClick={() => defend("reset")}>
                    Reset Password
                  </button>

                  <button onClick={() => defend("alert")}>
                    SOC Alert
                  </button>

                  <button onClick={() => defend("mfa")}>
                    Enforce MFA
                  </button>

                  <button onClick={() => defend("rehash")}>
                    Re-Hash DB
                  </button>

                </div>
              </>
            )}

            {/* ================= REPORT ================= */}

            {tab === "report" && (
              <>
                <h2>📊 SOC Performance Report</h2>

                <p>Lab Score: {labScore}</p>
                <p>Attacks Blocked: {blocked}</p>
                <p>Breaches: {failed}</p>
                <p>Total XP: {xp}</p>

                <h3>Analysis</h3>

                <p>
                  Accuracy:
                  {blocked + failed === 0
                    ? " N/A"
                    : ` ${Math.round(
                        (blocked / (blocked + failed)) * 100
                      )}%`}
                </p>

                <p>
                  Risk Level:
                  {failed > blocked ? " HIGH" : " CONTROLLED"}
                </p>

                <p>
                  Recommendation:
                  Improve MFA enforcement
                  and response speed.
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
  }

};
