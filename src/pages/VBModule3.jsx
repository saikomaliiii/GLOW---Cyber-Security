import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function VBModule3() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center py-16 bg-black text-white">

        <div className="max-w-6xl w-full bg-slate-950 p-10 rounded-2xl border border-cyan-400/50 shadow-2xl">


{/* ================= HEADER ================= */}

<h1 className="text-4xl text-cyan-300 text-center mb-3 font-bold tracking-widest">
MODULE 03 — HACKERS & CYBER ATTACKS
</h1>

<p className="text-center text-slate-400 mb-14 text-sm tracking-wider">
UNDERSTANDING DIGITAL THREATS
</p>


<div className="space-y-24">


{/* ================= SECTION 1 ================= */}

<Section title="WHO IS A HACKER?">

<HackerIntro/>

<Text>
A hacker is a person who uses computers
and the internet to enter other people’s systems.
</Text>

<List>
• Enter accounts  <br />
• Read private data  <br />
• Change files  <br />
• Steal information  <br />
</List>

<Story>
Not all hackers are bad.
Some hackers help protect systems.
</Story>

</Section>



{/* ================= SECTION 2 ================= */}

<Section title="TYPES OF HACKERS">

<HackerTypes/>

<SubTitle>🟢 White Hat Hackers</SubTitle>
<Text>They protect systems and fix security problems.</Text>

<SubTitle>🔴 Black Hat Hackers</SubTitle>
<Text>They steal data and damage systems.</Text>

<SubTitle>🟠 Grey Hat Hackers</SubTitle>
<Text>They sometimes help and sometimes break rules.</Text>

<HackerTable/>

</Section>



{/* ================= SECTION 3 ================= */}

<Section title="WHAT IS A CYBER ATTACK?">

<AttackFlow/>

<Text>
A cyber attack is when someone tries
to harm or steal digital data.
</Text>

<List>
• Breaking security  <br />
• Entering without permission <br /> 
• Damaging systems  <br />
</List>

</Section>



{/* ================= SECTION 4 ================= */}

<Section title="COMMON CYBER ATTACKS">

<SubTitle>📧 Phishing</SubTitle>
<Text>Fake messages that cheat users.</Text>

<SubTitle>🦠 Malware</SubTitle>
<Text>Bad software that damages devices.</Text>

<SubTitle>🔑 Password Hacking</SubTitle>
<Text>Guessing or stealing passwords.</Text>

<SubTitle>🌐 Fake Website</SubTitle>
<Text>Duplicate sites that steal data.</Text>

<SubTitle>💾 Data Theft</SubTitle>
<Text>Stealing personal information.</Text>

<AttackIcons/>

</Section>



{/* ================= SECTION 5 ================= */}

<Section title="HOW ATTACKS HAPPEN">

<Process>

<Step num="1" title="Fake Link" desc="Hacker creates fake website or message."/>

<Step num="2" title="User Clicks" desc="User trusts and opens link."/>

<Step num="3" title="Password Entry" desc="User enters login details."/>

<Step num="4" title="Access" desc="Hacker receives credentials."/>

<Step num="5" title="Account Hack" desc="Account gets compromised."/>

</Process>

<Text>
Most attacks happen because users
trust unknown links.
</Text>

</Section>



{/* ================= SECTION 6 ================= */}

<Section title="REAL-LIFE EXAMPLES">

<StudentVisual/>

<StudentTable/>

</Section>



{/* ================= SECTION 7 ================= */}

<Section title="HOW TO STAY SAFE">

<Checklist/>

</Section>



{/* ================= SECTION 8 ================= */}





{/* ================= SECTION 9 ================= */}




</div>


{/* ================= NAV ================= */}

<div className="flex justify-between mt-20">

<button
onClick={()=>navigate("/verybasic/2")}
className="px-6 py-2 bg-slate-800 rounded border border-cyan-400/30"
>
◀ Module 2
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



/* ================= VISUALS ================= */


function HackerIntro() {
  return (
    <motion.div
      className="text-center text-3xl"
      animate={{ x:[0,20,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      👨‍💻 → 💻 → 🔓
    </motion.div>
  );
}


function HackerTypes() {
  return (
    <div className="flex justify-around text-3xl">

      <span>🛡️</span>
      <span>🎭</span>
      <span>⚖️</span>

    </div>
  );
}


function HackerTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <thead className="bg-slate-800">
        <tr>
          <th>Type</th>
          <th>Nature</th>
          <th>Purpose</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>White Hat</td><td>Good</td><td>Protect</td></tr>
        <tr><td>Black Hat</td><td>Bad</td><td>Steal</td></tr>
        <tr><td>Grey Hat</td><td>Mixed</td><td>Both</td></tr>
      </tbody>

    </table>
  );
}


function AttackFlow() {
  return (
    <motion.div
      className="text-center text-xl text-red-400"
      animate={{ x:[0,30,0] }}
      transition={{ repeat:Infinity, duration:1.5 }}
    >
      👨‍💻 → ➡️ → 📱 → 🔓
    </motion.div>
  );
}


function AttackIcons() {
  return (
    <div className="flex justify-around text-2xl">
      📧 🦠 🔑 🌐 💾
    </div>
  );
}


function StudentVisual() {
  return (
    <div className="text-center text-2xl">
      🎓 📱 ⚠️ 🚨
    </div>
  );
}


function StudentTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <tbody>
        <tr><td>Fake Job</td><td>Phishing</td></tr>
        <tr><td>Slow Phone</td><td>Malware</td></tr>
        <tr><td>Locked Account</td><td>Password Hack</td></tr>
        <tr><td>Fake Shop</td><td>Fake Website</td></tr>
      </tbody>

    </table>
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
    <div className="flex gap-4">

      <div className="w-8 h-8 bg-cyan-500 text-black rounded-full flex items-center justify-center font-bold">
        {num}
      </div>

      <div>

        <h4 className="text-cyan-300 font-semibold text-sm">
          {title}
        </h4>

        <p className="text-slate-300 text-sm">
          {desc}
        </p>

      </div>

    </div>
  );
}


function Checklist() {
  return (
    <ul className="space-y-2 text-green-300 text-sm">

      <li>✔️ Don’t click unknown links</li>
      <li>✔️ Don’t share OTP</li>
      <li>✔️ Use strong passwords</li>
      <li>✔️ Download apps carefully</li>
      <li>✔️ Check website URL</li>

    </ul>
  );
}


function Summary() {
  return (
    <div className="bg-cyan-900/10 border border-cyan-400/30 p-6 rounded text-cyan-200 text-sm">

      🧠 What You Learned Today:

      <br/><br/>

      ✔ Who hackers are  
      ✔ Types of hackers  
      ✔ Common attacks  
      ✔ Attack methods  
      ✔ Safety rules  

      <br/><br/>

      Now you can recognize cyber threats.

    </div>
  );
}
