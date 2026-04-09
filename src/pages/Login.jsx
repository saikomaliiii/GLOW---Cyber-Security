import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlowLayout from "../layouts/GlowLayout";

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  // 🔥 If already logged in
  useEffect(()=>{
    if(localStorage.getItem("glow")){
      const savedLevel = localStorage.getItem("glowLevel");

      if(savedLevel){
        window.location="/dashboard";   // Returning user
      }else{
        window.location="/intro";       // First-time user
      }
    }
  },[]);

  const login = async () => {

  if(!email || !password){
    setError("Fill all fields");
    return;
  }

  try{

    const res = await fetch("https://glow-cyber-security.onrender.com/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if(data.token){

      localStorage.setItem("glow","ok");
      localStorage.setItem("token",data.token);

      const savedLevel = localStorage.getItem("glowLevel");

      if(savedLevel){
        window.location="/dashboard";
      }else{
        window.location="/intro";
      }

    }else{
      setError("Invalid Credentials");
    }

  }catch(err){
    setError("Server error");
  }

};

  return(
    <GlowLayout>

      <motion.div
        initial={{scale:0.8,opacity:0}}
        animate={{scale:1,opacity:1}}
        className="bg-black/80 p-8 rounded-xl w-[380px] border border-cyan-500 text-center"
      >

        <h1 className="text-3xl text-cyan-400 font-bold">GLOW</h1>
        <p className="text-cyan-300 mb-6">Grow • Learn • Own • Win</p>

        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-2 bg-slate-900 rounded"
        />

        <input
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-3 p-2 bg-slate-900 rounded"
        />

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <button
          onClick={login}
          className="w-full bg-cyan-500 text-black py-2 rounded hover:shadow-[0_0_20px_cyan]"
        >
          Login
        </button>

      </motion.div>

    </GlowLayout>
  );
}
