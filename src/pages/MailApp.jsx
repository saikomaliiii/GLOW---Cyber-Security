import { useState } from "react";
import CaseState, { touch } from "./CaseState";

/* ================= MAIL DATA ================= */

function generateMailbox(username, isSuspicious) {
  const mails = [];

  // noise mails
  for (let i = 0; i < 5; i++) {
    mails.push({
      from: "newsletter@corpnews.com",
      subject: "Weekly Update",
      body: "Company updates and announcements.",
      time: Date.now() - (1000 * 60 * 60 * 24 * (i + 2))
    });
  }

  // normal recent mail
  mails.push({
    from: "hr@company.com",
    subject: "Internal Update",
    body: "Please review the internal notification.",
    time: Date.now() - (1000 * 60 * 60)
  });

  // phishing mail ONLY for suspicious user
  if (isSuspicious) {
    mails.push({
      from: "it-support@secure-company-login.com",
      subject: "Action Required: Password Reset",
      body:
        "Unusual login activity detected.\n\n" +
        "Reset your password immediately:\n" +
        "https://secure-company-login.com/reset",
      time: Date.now() - (1000 * 60 * 30)
    });
  }

  return mails;
}

/* ================= COMPONENT ================= */

export default function MailApp({ notify }) {

  const [requestedUsers, setRequestedUsers] = useState([]);
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null);

  const suspiciousUser = CaseState.compromisedUser;

  const requestAccess = () => {
    touch();
    const users = input
      .split(",")
      .map(u => u.trim())
      .filter(Boolean);

    if (users.length === 0) return;

    setTimeout(() => {
      setRequestedUsers(users);
      notify &&
        notify("📬 Mailbox access granted for requested users.");
    }, 1200);
  };

  const openMailbox = (user) => {
    touch();
    setActiveUser(user);
    setSelectedMail(null);
  };

  const openMail = (mail) => {
    setSelectedMail(mail);
    touch();

    if (
      mail.from.includes("secure-company-login") &&
      mail.body.includes("reset")
    ) {
      CaseState.phishingFound = true;
      notify &&
        notify("⚠ Phishing email identified in user mailbox.");
    }
  };

  return (
    <div style={S.wrap}>

      {/* ACCESS REQUEST */}
      {requestedUsers.length === 0 && (
        <div style={S.request}>
          <h4>Request Mailbox Access</h4>
          <p>Enter usernames (comma separated)</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={S.input}
            placeholder="e.g. suresh,user23"
          />
          <button style={S.btn} onClick={requestAccess}>
            Request Access
          </button>
        </div>
      )}

      {/* MAIL INTERFACE */}
      {requestedUsers.length > 0 && (
        <>
          <div style={S.users}>
            <div style={S.title}>Granted Mailboxes</div>
            {requestedUsers.map(u => (
              <div
                key={u}
                style={S.userItem}
                onClick={() => openMailbox(u)}
              >
                {u}@company.com
              </div>
            ))}
          </div>

          <div style={S.mailArea}>
            {!activeUser && (
              <div style={S.center}>
                Select a mailbox to view emails
              </div>
            )}

            {activeUser && (
              <div style={S.mailWrap}>
                <div style={S.list}>
                  {generateMailbox(
                    activeUser,
                    activeUser === suspiciousUser
                  ).map((m, i) => (
                    <div
                      key={i}
                      style={S.mailItem}
                      onClick={() => openMail(m)}
                    >
                      <div><b>From:</b> {m.from}</div>
                      <div><b>Subject:</b> {m.subject}</div>
                    </div>
                  ))}
                </div>

                <div style={S.view}>
                  {selectedMail ? (
                    <>
                      <h4>{selectedMail.subject}</h4>
                      <pre style={S.body}>{selectedMail.body}</pre>
                    </>
                  ) : (
                    <p style={S.muted}>Select an email</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const S = {
  wrap:{display:"flex",height:"100%"},
  request:{
    margin:"auto",
    textAlign:"center"
  },
  input:{
    background:"#000",
    border:"1px solid #00ffcc",
    color:"#00ffcc",
    padding:"6px",
    width:"260px",
    marginBottom:"8px"
  },
  btn:{
    background:"#000",
    border:"1px solid #00ffcc",
    color:"#00ffcc",
    padding:"6px 12px",
    cursor:"pointer"
  },
  users:{
    width:"25%",
    borderRight:"1px solid #00ffcc",
    padding:"6px",
    fontSize:"12px"
  },
  title:{
    borderBottom:"1px solid #00ffcc",
    marginBottom:"6px"
  },
  userItem:{
    padding:"4px",
    cursor:"pointer"
  },
  mailArea:{flex:1},
  center:{
    textAlign:"center",
    marginTop:"40px",
    opacity:0.7
  },
  mailWrap:{display:"flex",height:"100%"},
  list:{
    width:"40%",
    borderRight:"1px solid #00ffcc",
    overflow:"auto"
  },
  mailItem:{
    padding:"6px",
    borderBottom:"1px solid #003333",
    cursor:"pointer",
    fontSize:"12px"
  },
  view:{
    width:"60%",
    padding:"8px",
    fontSize:"12px"
  },
  body:{whiteSpace:"pre-wrap"},
  muted:{opacity:0.6}
};
