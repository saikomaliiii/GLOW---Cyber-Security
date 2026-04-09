import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function VBModule5() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center py-16 bg-black text-white">

        <div className="max-w-6xl w-full bg-slate-950 p-10 rounded-2xl border border-cyan-400/50 shadow-2xl">


{/* ================= HEADER ================= */}

<h1 className="text-4xl text-cyan-300 text-center mb-3 font-bold tracking-widest">
MODULE 05 — DIGITAL SAFETY & PRIVACY
</h1>

<p className="text-center text-slate-400 mb-14 text-sm tracking-wider">
STAYING SAFE IN THE ONLINE WORLD
</p>


<div className="space-y-24">


{/* ================= SECTION 1 ================= */}

<Section title="WHAT IS DIGITAL SAFETY?">

<ShieldVisual/>

<Text>
Digital safety means using the internet
in a safe and smart way.
</Text>

<List>
Your Accounts  <br />
Your Photos  <br />
Your Money  <br />
Your Personal Details <br />  
</List>

<Story>
Using the internet carefully
is called digital safety.
</Story>

</Section>



{/* ================= SECTION 2 ================= */}

<Section title="WHAT IS PRIVACY?">

<PrivacyVisual/>

<Text>
Privacy means keeping your personal
information secret.
</Text>

<List>
Password  <br />
Phone Number  <br />
Address  <br />
Photos  <br />
Bank Details  <br />
</List>

<Story>
Your diary is private.
Your online data is also private.
</Story>

</Section>



{/* ================= SECTION 3 ================= */}





{/* ================= SECTION 4 ================= */}

<Section title="SOCIAL MEDIA SAFETY">

<SocialVisual/>

<Text>
Sharing too much information
on social media is dangerous.
</Text>

<Checklist>
<li>✔️ Keep account private  </li>
<li>✔️ Accept known friends  </li> 
<li>✔️ Don’t share details  </li>
<li>✔️ Don’t post location  </li>
<li>✔️ Report fake accounts  </li>
</Checklist>

<Story>
Not everyone online
is your friend.
</Story>

</Section>



{/* ================= SECTION 5 ================= */}

<Section title="PUBLIC WI-FI RISKS">

<WifiVisual/>

<Text>
Public Wi-Fi is unsafe
for private activities.
</Text>

<List>
Railway Station <br />  
Café  <br />
Mall  <br />
Airport  <br />
</List>

<List>
<li>❌ Banking  </li>
<li>❌ Payments  </li>
<li>❌ Password Login  </li>
</List>

</Section>



{/* ================= SECTION 6 ================= */}

<Section title="ONLINE SCAMS & FRAUDS">

<ScamVisual/>

<SubTitle>🎁 Prize Scam</SubTitle>
<Text>“You won ₹10 lakh” → Fake</Text>

<SubTitle>💼 Job Scam</SubTitle>
<Text>“Pay first” → Fake</Text>

<SubTitle>🏦 Bank Scam</SubTitle>
<Text>“Share OTP” → Fake</Text>

<SubTitle>🛒 Shopping Scam</SubTitle>
<Text>Cheap + No Delivery</Text>

<Story>
If it looks too good,
it is fake.
</Story>

</Section>



{/* ================= SECTION 7 ================= */}

<Section title="PROTECTING PERSONAL DATA">

<Checklist>
<li>✔️ Don’t share OTP  </li>
<li>✔️ Lock phone  </li>
<li>✔️ Logout public PCs  </li>
<li>✔️ Check permissions  </li>
<li>✔️ Backup data  </li>
</Checklist>

</Section>



{/* ================= SECTION 8 ================= */}

<Section title="APP PERMISSIONS">

<PermissionVisual/>

<Text>
Apps ask permission for
camera, mic, location, contacts.
</Text>

<Story>
Calculator doesn’t need camera.
Allow only needed access.
</Story>

</Section>



{/* ================= SECTION 9 ================= */}

<Section title="DIGITAL FOOTPRINT">

<FootprintVisual/>

<Text>
Everything you do online
is recorded.
</Text>

<List>
Posts  <br />
Likes  <br />
Comments  <br />
Searches  <br />
</List>

<Story>
Internet never forgets.
Bad posts affect jobs.
</Story>

</Section>



{/* ================= SECTION 10 ================= */}

<Section title="SAFE INTERNET HABITS">

<Checklist>
✔️ Think before posting  <br />
✔️ Verify links  <br />
✔️ Update apps  <br />
✔️ Use antivirus  <br />
✔️ Ask elders  <br />
</Checklist>

<Story>
Small habits give big safety.
</Story>

</Section>



{/* ================= SECTION 11 ================= */}

<Section title="STUDENT SCENARIOS">

<StudentTable/>

</Section>



{/* ================= SECTION 12 ================= */}




</div>


{/* ================= NAV ================= */}

<div className="flex justify-between mt-20">

<button
onClick={()=>navigate("/verybasic/4")}
className="px-6 py-2 bg-slate-800 rounded border border-cyan-400/30"
>
◀ Module 4
</button>

<button
className="px-6 py-2 bg-cyan-500 text-black rounded font-bold"
>
Finish ▶
</button>

</div>


        </div>
      </div>

    </GlowLayout>
  );
}



/* ================= UI COMPONENTS ================= */


function Section({ title, children }) {
  return (
    <div className="bg-black/70 border border-cyan-400/30 rounded-xl p-8 space-y-6">

      <h2 className="text-2xl text-cyan-200 tracking-widest font-semibold">
        ▶ {title}
      </h2>

      {children}

    </div>
  );
}


function Text({ children }) {
  return (
    <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/60 p-4 border-l-4 border-cyan-400">
      {children}
    </p>
  );
}


function List({ children }) {
  return (
    <div className="bg-black/60 p-4 border border-cyan-400/20 rounded text-slate-300 text-sm space-y-1">
      {children}
    </div>
  );
}


function Story({ children }) {
  return (
    <div className="border border-yellow-400/40 bg-yellow-900/10 p-4 rounded text-yellow-200 text-sm">
      📖 {children}
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


function Checklist({ children }) {
  return (
    <ul className="space-y-2 text-green-300 text-sm bg-black/60 p-4 border border-cyan-400/20 rounded">
      {children}
    </ul>
  );
}



/* ================= VISUALS ================= */


function ShieldVisual() {
  return (
    <motion.div
      className="text-center text-3xl"
      animate={{ scale:[1,1.1,1] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      🎓 📱 🛡️
    </motion.div>
  );
}


function PrivacyVisual() {
  return (
    <motion.div
      className="text-center text-2xl"
      animate={{ rotate:[0,10,-10,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      👤 🔒 📄
    </motion.div>
  );
}


function CompareUsers() {
  return (
    <div className="flex justify-around text-xl">
      😊 🆚 😟
    </div>
  );
}


function SocialVisual() {
  return (
    <motion.div
      className="text-center text-2xl"
      animate={{ y:[0,-10,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      📱 🔒
    </motion.div>
  );
}


function WifiVisual() {
  return (
    <motion.div
      className="text-center text-2xl text-red-400"
      animate={{ scale:[1,1.2,1] }}
      transition={{ repeat:Infinity, duration:1.5 }}
    >
      📶 👨‍💻
    </motion.div>
  );
}


function ScamVisual() {
  return (
    <motion.div
      className="text-center text-2xl text-yellow-400"
      animate={{ x:[0,20,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      ⚠️ 📱
    </motion.div>
  );
}


function PermissionVisual() {
  return (
    <motion.div
      className="text-center text-2xl"
      animate={{ scale:[1,1.1,1] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      📱 📍 🎤 📷
    </motion.div>
  );
}


function FootprintVisual() {
  return (
    <motion.div
      className="text-center text-2xl"
      animate={{ x:[0,30,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      👣 🌐
    </motion.div>
  );
}



/* ================= TABLE ================= */


function StudentTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <tbody>
        <tr><td>Unknown Link</td><td>Don’t Click</td></tr>
        <tr><td>Free Wi-Fi</td><td>Avoid Login</td></tr>
        <tr><td>Stranger DM</td><td>Block</td></tr>
        <tr><td>Prize Call</td><td>Ignore</td></tr>
        <tr><td>New App</td><td>Check Permission</td></tr>
      </tbody>

    </table>
  );
}



/* ================= SUMMARY ================= */


function Summary() {
  return (
    <div className="bg-cyan-900/10 border border-cyan-400/30 p-6 rounded text-cyan-200 text-sm">

      🧠 What You Learned Today:

      <br/><br/>

      ✔ Digital safety  
      ✔ Privacy importance  
      ✔ Social media safety  
      ✔ Scam awareness  
      ✔ Data protection  

      <br/><br/>

      Now you know how to stay safe online.

    </div>
  );
}
