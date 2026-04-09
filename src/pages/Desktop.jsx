import { useState } from "react";
import DatabaseApp from "./DatabaseApp";
import MailApp from "./MailApp";
import FilesApp from "./FilesApp";
import NetworkApp from "./NetworkApp";

const APPS = {
  DB: { title: "Database", component: DatabaseApp },
  MAIL: { title: "Mail", component: MailApp },
  FILES: { title: "Files", component: FilesApp },
  NET: { title: "Network", component: NetworkApp }
};

export default function Desktop() {
  const [windows, setWindows] = useState([]);
  const [zTop, setZTop] = useState(10);
  const [notifications, setNotifications] = useState([]);

  const openApp = (key) => {
    if (windows.find(w => w.key === key)) {
      focusWindow(key);
      return;
    }

    const win = {
      key,
      x: 120 + windows.length * 40,
      y: 80 + windows.length * 40,
      width: 720,
      height: 460,
      minimized: false,
      maximized: false,
      z: zTop + 1
    };

    setWindows([...windows, win]);
    setZTop(zTop + 1);
  };

  const focusWindow = (key) => {
    setZTop(zTop + 1);
    setWindows(windows.map(w =>
      w.key === key ? { ...w, z: zTop + 1 } : w
    ));
  };

  const closeWindow = (key) => {
    setWindows(windows.filter(w => w.key !== key));
  };

  const minimizeWindow = (key) => {
    setWindows(windows.map(w =>
      w.key === key ? { ...w, minimized: true } : w
    ));
  };

  const maximizeWindow = (key) => {
    setWindows(windows.map(w =>
      w.key === key ? { ...w, maximized: !w.maximized, minimized: false } : w
    ));
  };

  const showNotification = (text) => {
    const id = Date.now();
    setNotifications(n => [...n, { id, text }]);
    setTimeout(() => {
      setNotifications(n => n.filter(x => x.id !== id));
    }, 4000);
  };

  

  return (
    <div style={S.desktop}>

      {/* DESKTOP ICONS */}
      <div style={S.icons}>
        {Object.keys(APPS).map(k => (
          <div key={k} style={S.icon} onDoubleClick={() => openApp(k)}>
            <div style={S.iconImg}>▣</div>
            <div>{APPS[k].title}</div>
          </div>
        ))}
      </div>

      {/* WINDOWS */}
      {windows.map(w => {
        if (w.minimized) return null;
        const App = APPS[w.key].component;

        return (
          <div
            key={w.key}
            style={{
              ...S.window,
              left: w.maximized ? 0 : w.x,
              top: w.maximized ? 0 : w.y,
              width: w.maximized ? "100%" : w.width,
              height: w.maximized ? "100%" : w.height,
              zIndex: w.z
            }}
            onMouseDown={() => focusWindow(w.key)}
          >
            <div style={S.titleBar}>
              <span>{APPS[w.key].title}</span>
              <div>
                <button style={S.btn} onClick={() => minimizeWindow(w.key)}>—</button>
                <button style={S.btn} onClick={() => maximizeWindow(w.key)}>▢</button>
                <button style={S.btn} onClick={() => closeWindow(w.key)}>✕</button>
              </div>
            </div>
            <div style={S.body}>
              <App notify={showNotification} />
            </div>
          </div>
        );
      })}

      {/* TASKBAR */}
      <div style={S.taskbar}>
        {windows.map(w => (
          <div
            key={w.key}
            style={S.taskItem}
            onClick={() => focusWindow(w.key)}
          >
            {APPS[w.key].title}
          </div>
        ))}
        <div style={S.clock}>{new Date().toLocaleTimeString()}</div>
      </div>

      {/* NOTIFICATIONS */}
      <div style={S.notifications}>
        {notifications.map(n => (
          <div key={n.id} style={S.toast}>{n.text}</div>
        ))}
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const S = {
  desktop:{
    width:"100%",
    height:"85vh",
    background:"radial-gradient(circle at top,#0b1c2d,#04070c)",
    border:"2px solid #00ffcc",
    position:"relative",
    fontFamily:"monospace",
    overflow:"hidden",
    color:"#00ffcc"
  },
  icons:{
    display:"flex",
    gap:"24px",
    padding:"20px"
  },
  icon:{
    width:"80px",
    textAlign:"center",
    cursor:"default"
  },
  iconImg:{fontSize:"32px"},
  window:{
    position:"absolute",
    background:"#000",
    border:"1px solid #00ffcc",
    boxShadow:"0 0 25px rgba(0,255,204,0.4)"
  },
  titleBar:{
    background:"#001820",
    padding:"6px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    borderBottom:"1px solid #00ffcc"
  },
  btn:{
    background:"transparent",
    border:"none",
    color:"#00ffcc",
    cursor:"pointer",
    marginLeft:"6px"
  },
  body:{
    padding:"10px",
    height:"calc(100% - 32px)",
    overflow:"auto"
  },
  taskbar:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    height:"34px",
    background:"#001820",
    borderTop:"1px solid #00ffcc",
    display:"flex",
    alignItems:"center",
    padding:"0 8px",
    gap:"10px"
  },
  taskItem:{
    fontSize:"12px",
    padding:"4px 8px",
    border:"1px solid #00ffcc",
    cursor:"pointer"
  },
  clock:{
    marginLeft:"auto",
    fontSize:"11px"
  },
  notifications:{
    position:"absolute",
    top:"10px",
    right:"10px",
    display:"flex",
    flexDirection:"column",
    gap:"6px"
  },
  toast:{
    background:"#000",
    border:"1px solid #00ffcc",
    padding:"6px",
    fontSize:"12px",
    width:"220px"
  }
};
