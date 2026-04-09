import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import GlowLayout from "../layouts/GlowLayout";

const qs=[
  {q:"CIA stands for?",a:["Security Model","Virus","App","Game"],c:0},
  {q:"Phishing is?",a:["Mail Scam","Virus","Game","Tool"],c:0},
  {q:"Firewall is?",a:["Protection","Spam","Attack","Mail"],c:0},
  {q:"Strong password?",a:["1234","Name","Mix","Phone"],c:2},
  {q:"Safe WiFi?",a:["Public","Free","Secured","Open"],c:2},
];

export default function Quiz(){

  const {id}=useParams();

  const [i,setI]=useState(0);
  const [s,setS]=useState(0);

  const q=qs[i];

  const check=(x)=>{

    if(x===q.c) setS(s+1);

    if(i<4){
      setI(i+1);
    }else{

      if(s>=3){
        localStorage.setItem("lvl"+id,"done");
        window.location="/verybasic";
      }else{
        alert("Score 3+ to unlock");
        window.location.reload();
      }
    }
  };

  return(
    <GlowLayout>

      <div className="bg-black/80 p-6 rounded w-[480px]">

        <h3 className="text-cyan-400 mb-3">
          Question {i+1}
        </h3>

        <p className="mb-4">{q.q}</p>

        {q.a.map((o,j)=>(

          <motion.button
            whileHover={{scale:1.05}}
            whileTap={{scale:0.9}}
            key={j}
            onClick={()=>check(j)}
            className="block w-full bg-slate-800 p-2 mb-2 rounded"
          >
            {o}
          </motion.button>

        ))}

      </div>

    </GlowLayout>
  );
}
