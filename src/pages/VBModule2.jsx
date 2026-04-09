import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function VBModule2() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center py-16 bg-black text-white">

        <div className="max-w-6xl w-full bg-slate-950 p-10 rounded-2xl border border-cyan-400/50 shadow-2xl">


{/* ================= HEADER ================= */}

<h1 className="text-4xl text-cyan-300 text-center mb-3 font-bold tracking-widest">
MODULE 02 — INTRODUCTION TO CYBERSECURITY
</h1>

<p className="text-center text-slate-400 mb-14 text-sm tracking-wider">
PROTECTING YOUR DIGITAL LIFE
</p>


<div className="space-y-24">


{/* ================= SECTION 1 ================= */}

<Section title="WHAT IS CYBERSECURITY?">

<VisualShield/>

<Text>
Cybersecurity means protecting computers,
mobile phones, websites, and data
from hackers and online attacks.
</Text>

<List>
📱 Mobile Phones  <br />
💻 Computers  <br />
🌐 Internet Accounts <br />  
📂 Personal Files  <br />
💳 Online Money  <br />
</List>

<Story>
Just like we lock our house,
we also need to lock our digital life.
That lock is called cybersecurity.
</Story>

</Section>



{/* ================= SECTION 2 ================= */}

<Section title="WHY DO WE NEED CYBERSECURITY?">

<Compare/>

<Text>
Without security, hackers can
steal, damage, and misuse data.
</Text>

<Story>
Rahul clicked a fake link.
His Instagram got hacked.
All photos were deleted.
</Story>

</Section>



{/* ================= SECTION 3 ================= */}

<Section title="WHAT IS DATA?">

<DataFlow/>

<Text>
Data means your digital information.
Everything you do online creates data.
</Text>

<List>
👤 Name  <br />
📧 Email  <br />
🔑 Password  <br />
📸 Photos  <br />
💬 Messages  <br />
💳 Bank Details  <br />
</List>

</Section>



{/* ================= SECTION 4 ================= */}

<Section title="CIA TRIAD — CORE SECURITY">

<CIAVisual/>

<SubTitle>🔐 Confidentiality</SubTitle>
<Text>Only the right person sees data.</Text>

<SubTitle>📝 Integrity</SubTitle>
<Text>Data should not be changed.</Text>

<SubTitle>⚡ Availability</SubTitle>
<Text>Data must always work.</Text>

<CIATable/>

</Section>



{/* ================= SECTION 5 ================= */}

<Section title="WHAT IS A CYBER ATTACK?">

<HackerVisual/>

<Text>
A cyber attack is an attempt
to break into your digital life.
</Text>

<List>
1️⃣ Phishing – Fake Messages  <br />
2️⃣ Malware – Bad Software  <br />
3️⃣ Hacking – Password Cracking  <br />
4️⃣ Data Theft – Stealing Info  <br />
</List>

</Section>



{/* ================= SECTION 6 ================= */}

<Section title="WHO NEEDS CYBERSECURITY?">

<PeopleVisual/>

<List>
👨‍🎓 Students  <br />
👩‍🏫 Teachers  <br />
🏢 Companies  <br />
🏦 Banks  <br />
🏥 Hospitals  <br />
👨‍👩‍👧 Families  <br />
</List>

<Text>
If you use the internet,
you need cybersecurity.
</Text>

</Section>



{/* ================= SECTION 7 ================= */}

<Section title="CYBERSECURITY IN DAILY LIFE">

<ActivityTable/>

<Text>
Every day you use cybersecurity
without knowing it.
</Text>

</Section>



{/* ================= SECTION 8 ================= */}

<Section title="GOLDEN RULES">

<Checklist/>

</Section>



{/* ================= SECTION 9 ================= */}




</div>


{/* ================= NAV ================= */}

<div className="flex justify-between mt-20">

<button
onClick={()=>navigate("/verybasic/1")}
className="px-6 py-2 bg-slate-800 rounded border border-cyan-400/30"
>
◀ Module 1
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
    <div className="bg-black/60 p-4 border border-cyan-400/20 rounded text-slate-300 text-sm">
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



/* ================= VISUALS ================= */


function VisualShield() {
  return (
    <div className="flex justify-center gap-6">

      {["📱","💻","☁️"].map((i,k)=>(
        <motion.div
          key={k}
          className="w-20 h-20 border border-cyan-400 rounded-xl flex items-center justify-center text-3xl"
          animate={{ scale:[1,1.1,1] }}
          transition={{ repeat:Infinity, duration:2 }}
        >
          {i}
        </motion.div>
      ))}

    </div>
  );
}


function Compare() {
  return (
    <div className="grid grid-cols-2 gap-6 text-center text-sm">

      <div className="border border-red-400 p-4 rounded text-red-300">
        ❌ Hacked Account
      </div>

      <div className="border border-green-400 p-4 rounded text-green-300">
        ✅ Secure Account
      </div>

    </div>
  );
}


function DataFlow() {
  return (
    <motion.div
      className="text-center text-cyan-300"
      animate={{ x:[0,20,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      👤 → 📱 → ☁️ → 🔒
    </motion.div>
  );
}


function CIAVisual() {
  return (
    <div className="flex justify-around">

      {["🔒","📝","⚡"].map((i,k)=>(
        <motion.div
          key={k}
          className="w-16 h-16 border border-cyan-400 rounded-full flex items-center justify-center text-2xl"
          animate={{ rotate:[0,360] }}
          transition={{ repeat:Infinity, duration:6 }}
        >
          {i}
        </motion.div>
      ))}

    </div>
  );
}


function CIATable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <thead className="bg-slate-800">
        <tr>
          <th>Term</th>
          <th>Meaning</th>
          <th>Example</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>Confidentiality</td><td>Privacy</td><td>Password</td></tr>
        <tr><td>Integrity</td><td>No Change</td><td>Marks</td></tr>
        <tr><td>Availability</td><td>Always Works</td><td>Website</td></tr>
      </tbody>

    </table>
  );
}


function HackerVisual() {
  return (
    <motion.div
      className="text-center text-3xl"
      animate={{ x:[0,30,0] }}
      transition={{ repeat:Infinity, duration:1.5 }}
    >
      👨‍💻 → 🔓
    </motion.div>
  );
}


function PeopleVisual() {
  return (
    <div className="text-center text-xl">
      👨‍🎓 👩‍🏫 🏢 🏦 🏥 👨‍👩‍👧 🛡️
    </div>
  );
}


function ActivityTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <tbody>
        <tr><td>Instagram</td><td>Password</td></tr>
        <tr><td>Payment</td><td>OTP</td></tr>
        <tr><td>Gmail</td><td>2FA</td></tr>
        <tr><td>College Portal</td><td>Login ID</td></tr>
      </tbody>

    </table>
  );
}


function Checklist() {
  return (
    <ul className="space-y-2 text-green-300 text-sm">

      <li>✔️ Don’t share passwords</li>
      <li>✔️ Don’t click unknown links</li>
      <li>✔️ Use strong passwords</li>
      <li>✔️ Logout on public PCs</li>
      <li>✔️ Update apps</li>

    </ul>
  );
}


function Summary() {
  return (
    <div className="bg-cyan-900/10 border border-cyan-400/30 p-6 rounded text-cyan-200 text-sm">

      🧠 What You Learned Today:

      <br/><br/>

      ✔ Cybersecurity meaning  
      ✔ Importance  
      ✔ CIA Triad  
      ✔ Cyber attacks  
      ✔ Safety rules  

      <br/><br/>

      Your digital life is now protected.

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
