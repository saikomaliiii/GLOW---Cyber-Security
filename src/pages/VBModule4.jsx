import GlowLayout from "../layouts/GlowLayout";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function VBModule4() {

  const navigate = useNavigate();

  return (
    <GlowLayout>

      <div className="min-h-screen w-full flex justify-center py-16 bg-black text-white">

        <div className="max-w-6xl w-full bg-slate-950 p-10 rounded-2xl border border-cyan-400/50 shadow-2xl">


{/* ================= HEADER ================= */}

<h1 className="text-4xl text-cyan-300 text-center mb-3 font-bold tracking-widest">
MODULE 04 — PASSWORDS & AUTHENTICATION
</h1>

<p className="text-center text-slate-400 mb-14 text-sm tracking-wider">
PROTECTING YOUR DIGITAL IDENTITY
</p>


<div className="space-y-24">


{/* ================= SECTION 1 ================= */}

<Section title="WHAT IS A PASSWORD?">

<KeyVisual/>

<Text>
A password is a secret word or code
that protects your online accounts.
</Text>

<List>
Instagram  <br />
Gmail  <br />
Bank Apps  <br />
College Portals  <br />
Cloud Storage  <br />
</List>

<Story>
Your password is the key
to your digital house.
</Story>

</Section>



{/* ================= SECTION 2 ================= */}

<Section title="WHY PASSWORDS ARE IMPORTANT">

<LockCompare/>

<Text>
Weak passwords allow attackers
to enter your accounts easily.
</Text>

<Story>
Ravi used “12345”.
His Facebook was hacked in one day.
</Story>

</Section>



{/* ================= SECTION 3 ================= */}

<Section title="WEAK VS STRONG PASSWORDS">

<SubTitle>❌ Weak Passwords</SubTitle>

<List>
123456  <br />
password  <br />
abc123  <br />
name123  <br />
birthday  <br />
</List>

<Text>
Hackers guess these easily.
</Text>


<SubTitle>✅ Strong Passwords</SubTitle>

<List>
Capital Letters  
Small Letters  
Numbers  
Symbols  
</List>

<Story>
Example: K0mz!@2026#
</Story>

<PasswordTable/>

</Section>



{/* ================= SECTION 4 ================= */}

<Section title="WHAT IS AUTHENTICATION?">

<AuthFlow/>

<Text>
Authentication means proving
that YOU are really YOU.
</Text>

<List>
Who are you?  
Prove it.  
Access granted.  
</List>

</Section>



{/* ================= SECTION 5 ================= */}

<Section title="TYPES OF AUTHENTICATION">

<SubTitle>🔑 Password Login</SubTitle>
<Text>Username + Password login.</Text>

<SubTitle>📱 Two-Factor Authentication</SubTitle>
<Text>Password + OTP code.</Text>

<SubTitle>👆 Biometric Login</SubTitle>
<Text>Fingerprint / Face ID.</Text>

<AuthTable/>

</Section>



{/* ================= SECTION 6 ================= */}

<Section title="HOW HACKERS STEAL PASSWORDS">

<HackerSteal/>

<List>
1️⃣ Phishing Links  
2️⃣ Fake Websites  
3️⃣ Public Wi-Fi  
4️⃣ Guessing  
5️⃣ Watching Typing  
</List>

<Text>
Fake login pages are
the biggest password trap.
</Text>

</Section>



{/* ================= SECTION 7 ================= */}

<Section title="HOW TO PROTECT PASSWORDS">

<Checklist/>

</Section>



{/* ================= SECTION 8 ================= */}

<Section title="PASSWORD MANAGER">

<VaultVisual/>

<Text>
A password manager stores
and protects your passwords.
</Text>

<List>
Remembers passwords  <br />
Creates strong passwords  <br />
Uses master key  <br />
</List>

<Story>
Example: Google Password Manager
</Story>

</Section>



{/* ================= SECTION 9 ================= */}

<Section title="STUDENT SCENARIOS">

<StudentTable/>

<Text>
Correct actions protect
your digital identity.
</Text>

</Section>



{/* ================= SECTION 10 ================= */}




</div>


{/* ================= NAV ================= */}

<div className="flex justify-between mt-20">

<button
onClick={()=>navigate("/verybasic/3")}
className="px-6 py-2 bg-slate-800 rounded border border-cyan-400/30"
>
◀ Module 3
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


function KeyVisual() {
  return (
    <motion.div
      className="text-center text-3xl"
      animate={{ rotate:[0,10,-10,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      🔑 → 🔒 → 👤
    </motion.div>
  );
}


function LockCompare() {
  return (
    <div className="grid grid-cols-2 gap-6 text-center">

      <div className="border border-red-400 p-4 rounded text-red-300">
        ❌ Weak Lock
      </div>

      <div className="border border-green-400 p-4 rounded text-green-300">
        ✅ Strong Lock
      </div>

    </div>
  );
}


function AuthFlow() {
  return (
    <motion.div
      className="text-center text-xl text-cyan-300"
      animate={{ x:[0,20,0] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      👤 → 🔐 → ✅ → 📂
    </motion.div>
  );
}


function HackerSteal() {
  return (
    <motion.div
      className="text-center text-2xl text-red-400"
      animate={{ x:[0,30,0] }}
      transition={{ repeat:Infinity, duration:1.5 }}
    >
      👨‍💻 → 🔓 → 🔑
    </motion.div>
  );
}


function VaultVisual() {
  return (
    <motion.div
      className="text-center text-3xl"
      animate={{ scale:[1,1.1,1] }}
      transition={{ repeat:Infinity, duration:2 }}
    >
      🗄️ 🔐
    </motion.div>
  );
}



/* ================= TABLES ================= */


function PasswordTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <thead className="bg-slate-800">
        <tr>
          <th>Weak</th>
          <th>Strong</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>Short</td><td>Long</td></tr>
        <tr><td>Simple</td><td>Complex</td></tr>
        <tr><td>Easy</td><td>Hard</td></tr>
      </tbody>

    </table>
  );
}


function AuthTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <thead className="bg-slate-800">
        <tr>
          <th>Type</th>
          <th>Uses</th>
          <th>Safety</th>
        </tr>
      </thead>

      <tbody>
        <tr><td>Password</td><td>Everywhere</td><td>Medium</td></tr>
        <tr><td>2FA</td><td>Banks</td><td>High</td></tr>
        <tr><td>Biometric</td><td>Mobiles</td><td>High</td></tr>
      </tbody>

    </table>
  );
}


function StudentTable() {
  return (
    <table className="w-full text-sm border border-cyan-400/30">

      <tbody>
        <tr><td>Friend asks password</td><td>Say NO</td></tr>
        <tr><td>Cyber café login</td><td>Logout</td></tr>
        <tr><td>Unknown OTP</td><td>Ignore</td></tr>
        <tr><td>New device login</td><td>Verify</td></tr>
      </tbody>

    </table>
  );
}



/* ================= CHECKLIST ================= */


function Checklist() {
  return (
    <ul className="space-y-2 text-green-300 text-sm">

      <li>✔️ Never share password</li>
      <li>✔️ Don’t save on public PCs</li>
      <li>✔️ Use different passwords</li>
      <li>✔️ Turn ON 2FA</li>
      <li>✔️ Change regularly</li>

    </ul>
  );
}



/* ================= SUMMARY ================= */


function Summary() {
  return (
    <div className="bg-cyan-900/10 border border-cyan-400/30 p-6 rounded text-cyan-200 text-sm">

      🧠 What You Learned Today:

      <br/><br/>

      ✔ Password meaning  
      ✔ Strong vs weak  
      ✔ Authentication types  
      ✔ 2FA & Biometrics  
      ✔ Safety rules  

      <br/><br/>

      Now you can protect your accounts safely.

    </div>
  );
}
