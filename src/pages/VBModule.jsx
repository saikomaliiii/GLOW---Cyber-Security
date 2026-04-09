import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";

import {
  ClientServerVideo,
  BrowserFlowVideo,
  PacketFlowVideo
} from "./Diagrams";


export default function VBModule() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center py-16 bg-black text-white">

        <div className="max-w-6xl w-full bg-slate-950 p-10 rounded-2xl border border-cyan-400/50 shadow-2xl">


          {/* HEADER */}
          <h1 className="text-4xl text-cyan-300 text-center mb-4 font-bold tracking-widest">
            MODULE 01 — NETWORK FOUNDATIONS
          </h1>

          <p className="text-center text-slate-400 mb-14 text-sm tracking-wider">
            HOW COMPUTERS & INTERNET WORK
          </p>


          <div className="space-y-20">


{/* ================= CLIENT SERVER ================= */}

<Lesson title="CLIENT–SERVER ARCHITECTURE">

<ClientServerVideo/>

<Explain>
The client–server model is the core architecture
used by modern internet applications.

User devices act as clients.
Central systems act as servers.

All processing and storage
happens on servers.
</Explain>


<SubTitle>System Components</SubTitle>

<List>
<li> Client Application (Browser/App)  </li>
<li> Operating System Network Stack  </li>
<li> Web Server Software  </li>
<li> Application Server  </li>
<li> Database Server  </li>
<li> Authentication Layer  </li>
<li> Security Gateway  </li>
</List>


<SubTitle>Communication Process</SubTitle>

<Process>

<Step
num="1"
title="DNS Resolution"
desc="The domain name is converted into an IP address using DNS servers."
/>

<Step
num="2"
title="TCP Connection"
desc="A reliable connection is established between client and server."
/>

<Step
num="3"
title="TLS Encryption"
desc="An encrypted tunnel is created to protect transmitted data."
/>

<Step
num="4"
title="HTTP Request"
desc="The browser sends a request asking for specific resources."
/>

<Step
num="5"
title="Server Processing"
desc="The server executes application logic and database queries."
/>

<Step
num="6"
title="Response Delivery"
desc="Processed data is encrypted and sent back to the client."
/>

</Process>


<Box title="Security Perspective">
Weak authentication mechanisms
can allow attackers to hijack sessions
and impersonate users.
</Box>

</Lesson>



{/* ================= BROWSER FLOW ================= */}

<Lesson title="IP ADDRESS & BROWSER FLOW">

<BrowserFlowVideo/>

<Explain>
Every internet device is identified
using an IP address.

Humans use domain names.
DNS translates them into IP values.
</Explain>


<SubTitle>DNS Resolution Chain</SubTitle>

<List>
• Browser Cache  <br />
• OS Cache  <br />
• Router Cache  <br />
• ISP Resolver  <br />
• Root Server  <br />
• TLD Server  <br />
• Authoritative Server  <br />
</List>


<SubTitle>Website Loading Process</SubTitle>

<Process>

<Step
num="1"
title="URL Input"
desc="The user enters a website address in the browser."
/>

<Step
num="2"
title="Cache Check"
desc="The browser checks if the IP is already stored locally."
/>

<Step
num="3"
title="DNS Query"
desc="A recursive query is sent to DNS servers."
/>

<Step
num="4"
title="IP Resolution"
desc="The server IP address is returned to the browser."
/>

<Step
num="5"
title="Secure Connection"
desc="TLS handshake establishes encrypted communication."
/>

<Step
num="6"
title="Page Rendering"
desc="HTML, CSS, and JavaScript are downloaded and rendered."
/>

</Process>


<Box title="Attack Surface">
DNS spoofing attacks can redirect
users to malicious websites.
</Box>

</Lesson>



{/* ================= PACKET FLOW ================= */}

<Lesson title="PACKET SWITCHING & DATA TRANSPORT">

<PacketFlowVideo/>

<Explain>
Internet communication uses packet switching.

Large files are divided into
small independent packets
for efficient routing.
</Explain>


<SubTitle>TCP Packet Structure</SubTitle>

<List>
• Source Port  <br />
• Destination Port  <br />
• Sequence Number  <br />
• Acknowledgment Number  <br />
• Flags  <br />
• Payload  <br />
</List>


<SubTitle>Data Transmission Cycle</SubTitle>

<Process>

<Step
num="1"
title="Segmentation"
desc="Large data is divided into smaller segments."
/>

<Step
num="2"
title="Header Addition"
desc="Control information is added to each packet."
/>

<Step
num="3"
title="Routing"
desc="Routers select optimal network paths."
/>

<Step
num="4"
title="Transmission"
desc="Packets are transmitted independently."
/>

<Step
num="5"
title="Acknowledgment"
desc="Receiver confirms successful packet delivery."
/>

<Step
num="6"
title="Reassembly"
desc="Packets are reordered to reconstruct original data."
/>

</Process>


<Box title="Security Risk">
Unencrypted packets can be captured
on public Wi-Fi networks.
</Box>

</Lesson>


          </div>


{/* NAV */}
<div className="flex justify-between mt-20">

<button
onClick={()=>navigate("/verybasic")}
className="px-6 py-2 bg-slate-800 rounded border border-cyan-400/30"
>
◀ Return
</button>

<button
className="px-6 py-2 bg-cyan-500 text-black rounded font-bold"
>
Next ▶
</button>

</div>


        </div>

      </div>

    </GlowLayout>
  );
}



/* ================= UI COMPONENTS ================= */


function Lesson({ title, children }) {

  return (
    <div className="bg-black/70 border border-cyan-400/30 rounded-xl p-8 space-y-6">

      <h2 className="text-2xl text-cyan-200 tracking-widest font-semibold">
        ▶ {title}
      </h2>

      {children}

    </div>
  );
}


function Explain({ children }) {

  return (
    <div className="bg-slate-900/70 p-4 border-l-4 border-cyan-400 text-slate-200 text-sm leading-relaxed">
      {children}
    </div>
  );
}


function SubTitle({ children }) {

  return (
    <h3 className="text-cyan-300 text-lg font-semibold tracking-wider mt-4">
      {children}
    </h3>
  );
}


function List({ children }) {

  return (
    <div className="bg-black/60 p-4 border border-cyan-400/20 rounded text-slate-300 text-sm">
      {children}
    </div>
  );
}


function Process({ children }) {

  return (
    <div className="space-y-3 bg-black/60 p-5 rounded border border-cyan-400/20">
      {children}
    </div>
  );
}


function Step({ num, title, desc }) {

  return (
    <div className="flex gap-4 items-start">

      <div className="w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center font-bold">
        {num}
      </div>

      <div>

        <h4 className="text-cyan-300 font-semibold text-sm">
          {title}
        </h4>

        <p className="text-slate-300 text-sm leading-relaxed">
          {desc}
        </p>

      </div>

    </div>
  );
}


function Box({ title, children }) {

  return (
    <div className="border border-cyan-400/30 bg-cyan-900/10 p-4 rounded">

      <h4 className="text-cyan-300 mb-1 text-sm font-semibold">
        {title}
      </h4>

      <p className="text-slate-300 text-sm">
        {children}
      </p>

    </div>
  );
}
