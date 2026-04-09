import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GlowLayout from "../layouts/GlowLayout";

const content=[

  {
    title:"Foundations",
    text:"Cybersecurity protects digital data using Confidentiality, Integrity and Availability."
  },

  {
    title:"Threats",
    text:"Malware, hackers, spyware and ransomware are major digital threats."
  },

  {
    title:"Protection",
    text:"Firewalls, antivirus, encryption and two-factor authentication protect systems."
  },

  {
    title:"Attacks",
    text:"Phishing, brute force, MITM and fake websites are common attacks."
  },

  {
    title:"Safe Life",
    text:"Strong passwords, safe WiFi, backups and awareness ensure digital safety."
  }

];

export default function Level(){

  const {id}=useParams();
  const d=content[id];

  return(
    <GlowLayout>

      <div className="bg-black/80 p-8 rounded-xl w-[480px]">

        <h2 className="text-cyan-400 text-xl mb-4">
          Level {+id+1}: {d.title}
        </h2>

        <motion.p
          initial={{width:0}}
          animate={{width:"100%"}}
          transition={{duration:1.5}}
          className="text-slate-300 mb-6 overflow-hidden whitespace-nowrap border-r-2 border-cyan-400"
        >
          {d.text}
        </motion.p>

        <button
          onClick={()=>window.location="/quiz/"+id}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Start Quiz
        </button>

      </div>

    </GlowLayout>
  );
}
