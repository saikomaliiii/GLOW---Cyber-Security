import { useState, useMemo } from "react";
import CaseState, { touch } from "./CaseState";

/* ================= FAKE DATA GENERATOR ================= */

const departments = ["HR","Finance","Engineering","IT","Sales"];

function generateUsers(count = 120) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const weak = i % 17 === 0; // some weak users
    users.push({
      id: i,
      username: `user${i}`,
      department: departments[i % departments.length],
      passwordStrength: weak ? "WEAK" : "STRONG",
      failedAttempts: weak ? Math.floor(Math.random()*8)+3 : Math.floor(Math.random()*2),
      lastLoginIP: weak ? "103.21.9.4" : `192.168.1.${i%255}`
    });
  }

  // THE REAL COMPROMISED USER
  users[57] = {
    id: 58,
    username: "user47",
    department: "Finance",
    passwordStrength: "WEAK",
    failedAttempts: 7,
    lastLoginIP: "103.21.9.4"
  };

  return users;
}

/* ================= COMPONENT ================= */

export default function DatabaseApp({ notify }) {

  const [users] = useState(generateUsers());
  const [search, setSearch] = useState("");
  const [filterWeak, setFilterWeak] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return users.filter(u => {
      if (filterWeak && u.passwordStrength !== "WEAK") return false;
      if (search && !u.username.includes(search)) return false;
      return true;
    });
  }, [users, search, filterWeak]);

  const inspectUser = (u) => {
    setSelected(u);
    touch();

    if (
      u.username === "suresh" &&
      u.passwordStrength === "WEAK" &&
      u.failedAttempts >= 5
    ) {
      CaseState.compromisedUser = "suresh";
      notify && notify("⚠ Suspicious authentication pattern detected for user: suresh");
    }
  };

  return (
    <div style={S.wrap}>

      {/* TOOLBAR */}
      <div style={S.toolbar}>
        <input
          placeholder="Search username"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={S.input}
        />
        <label style={S.chk}>
          <input
            type="checkbox"
            checked={filterWeak}
            onChange={e=>setFilterWeak(e.target.checked)}
          />
          Show only weak passwords
        </label>
      </div>

      {/* TABLE */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Dept</th>
              <th>Password</th>
              <th>Failed</th>
              <th>Last IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr
                key={u.id}
                onClick={()=>inspectUser(u)}
                style={{
                  cursor:"pointer",
                  background: selected?.id===u.id ? "#001820" : "transparent"
                }}
              >
                <td>{u.username}</td>
                <td>{u.department}</td>
                <td style={{color:u.passwordStrength==="WEAK"?"#ff5555":"#00ffcc"}}>
                  {u.passwordStrength}
                </td>
                <td>{u.failedAttempts}</td>
                <td>{u.lastLoginIP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAIL PANEL */}
      {selected && (
        <div style={S.detail}>
          <h4>User Details</h4>
          <p><b>User:</b> {selected.username}</p>
          <p><b>Department:</b> {selected.department}</p>
          <p><b>Password Strength:</b> {selected.passwordStrength}</p>
          <p><b>Failed Logins:</b> {selected.failedAttempts}</p>
          <p><b>Last Login IP:</b> {selected.lastLoginIP}</p>

          {selected.passwordStrength==="WEAK" && selected.failedAttempts>=5 && (
            <p style={{color:"#ff5555"}}>
              ⚠ Account shows signs of brute-force or credential compromise.
            </p>
          )}
        </div>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const S = {
  wrap:{display:"flex",flexDirection:"column",height:"100%"},
  toolbar:{display:"flex",gap:"10px",marginBottom:"8px"},
  input:{
    background:"#000",
    border:"1px solid #00ffcc",
    color:"#00ffcc",
    padding:"4px"
  },
  chk:{fontSize:"12px"},
  tableWrap:{flex:1,overflow:"auto"},
  table:{
    width:"100%",
    borderCollapse:"collapse",
    fontSize:"12px"
  },
  detail:{
    borderTop:"1px solid #00ffcc",
    marginTop:"6px",
    paddingTop:"6px",
    fontSize:"12px"
  }
};
