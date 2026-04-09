import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GlowLayout from "../layouts/GlowLayout";

const lessons = [

/* MODULE 1 */
{
title:"Digital World & Data",

blocks:[

{
h:"Digital Life",
t:"Today banking, photos, exams and messages are digital. All are stored as data."
},

{
h:"Data Journey",
t:"When you click any app, your data travels through internet to servers and comes back."
},

{
h:"Flow Map",
t:"User → Internet → Server → Internet → User"
},

{
h:"Three States",
t:"Data exists as At Rest, In Transit, and In Use. Attacks can happen in any state."
},

{
h:"Example",
t:"WhatsApp message is typed, sent, and stored in servers."
},

{
h:"Conclusion",
t:"Your data is always moving. It needs protection."
}

]

},

/* MODULE 2 */
{
title:"Threat Landscape",

blocks:[

{
h:"Types of Hackers",
t:"White hat protect, Black hat attack, Grey hat mix both."
},

{
h:"Malware Family",
t:"Virus, Trojan, Worm, Ransomware, Spyware."
},

{
h:"Ransomware Flow",
t:"Mail → Click → Install → Lock → Demand Money"
},

{
h:"Hidden Threats",
t:"Malware hides inside games, movies and fake apps."
},

{
h:"Example",
t:"Fake PDF can lock your laptop."
},

{
h:"Conclusion",
t:"Threats look normal but are dangerous."
}

]

},

/* MODULE 3 */
{
title:"Protection Systems",

blocks:[

{
h:"Defense Layers",
t:"Security works in layers like onion."
},

{
h:"Security Flow",
t:"Password → OTP → Firewall → Encryption"
},

{
h:"Firewall",
t:"Controls incoming and outgoing traffic."
},

{
h:"Encryption",
t:"Converts data into secret code."
},

{
h:"Example",
t:"ATM uses card + pin + OTP."
},

{
h:"Conclusion",
t:"Multiple layers make systems safe."
}

]

},

/* MODULE 4 */
{
title:"Attack Techniques",

blocks:[

{
h:"Phishing",
t:"Fake email sends you to fake website."
},

{
h:"Brute Force",
t:"Trying many passwords until success."
},

{
h:"MITM",
t:"Hacker sits between you and server."
},

{
h:"Social Engineering",
t:"Tricking humans instead of systems."
},

{
h:"Fake Websites",
t:"Looks real but steals data."
},

{
h:"Conclusion",
t:"Hackers attack minds first."
}

]

},

/* MODULE 5 */
{
title:"Cyber Smart Life",

blocks:[

{
h:"Strong Passwords",
t:"Use mix of letters, numbers and symbols."
},

{
h:"Public WiFi Rule",
t:"Never use bank apps on public WiFi."
},

{
h:"Updates",
t:"Always update system and apps."
},

{
h:"Backups",
t:"Store copy of important data."
},

{
h:"Permissions",
t:"Allow only required access."
},

{
h:"Conclusion",
t:"Good habits = Strong security."
}

]

}

];

export default function VeryBasicModule(){

  const { id } = useParams();

  const data = lessons[id];

  return(
    <GlowLayout>

      <div className="w-full max-w-4xl bg-slate-900/90 border border-blue-400/20 rounded-xl p-6">

        <h1 className="text-2xl text-blue-300 mb-4">
          📘 {data.title}
        </h1>

        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">

          {data.blocks.map((b,i)=>(

            <motion.div
              key={i}
              initial={{opacity:0,y:10}}
              animate={{opacity:1,y:0}}
              transition={{delay:i*0.1}}
              className="bg-black/60 border border-blue-400/10 rounded-lg p-4"
            >

              <h3 className="text-blue-300 mb-1">
                {b.h}
              </h3>

              <p className="text-slate-300 text-sm">
                {b.t}
              </p>

            </motion.div>

          ))}

        </div>

        <div className="mt-6 text-center">

          <button
            onClick={()=>window.location="/verybasic"}
            className="bg-blue-500 px-6 py-2 rounded hover:shadow-[0_0_20px_#60a5fa]"
          >
            Back to Modules
          </button>

        </div>

      </div>

    </GlowLayout>
  );
}
