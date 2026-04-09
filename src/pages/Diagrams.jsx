import { motion } from "framer-motion";


/* ================= CLIENT SERVER ================= */

export function ClientServerVideo() {

  return (
    <div className="relative w-full h-[260px] bg-black rounded-xl border border-cyan-400/40 overflow-hidden">

      {/* Client */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-center">
        <div className="w-32 h-20 bg-cyan-900/30 border border-cyan-400 rounded-xl flex items-center justify-center">
          Client
        </div>
        <p className="text-xs text-slate-400 mt-1">User Device</p>
      </div>

      {/* Server */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-center">
        <div className="w-36 h-20 bg-cyan-900/30 border border-cyan-400 rounded-xl flex items-center justify-center">
          Server
        </div>
        <p className="text-xs text-slate-400 mt-1">Data Center</p>
      </div>

      {/* Request */}
      <motion.div
        className="absolute top-1/2 w-5 h-5 bg-cyan-400 rounded-full"
        initial={{ x: 150, y: -12 }}
        animate={{ x: 470 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Response */}
      <motion.div
        className="absolute top-1/2 w-5 h-5 bg-green-400 rounded-full"
        initial={{ x: 470, y: 12 }}
        animate={{ x: 150 }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
      />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-cyan-300 text-sm">
        Request / Response Cycle
      </div>

    </div>
  );
}


/* ================= BROWSER FLOW ================= */

export function BrowserFlowVideo() {

  return (
    <div className="relative w-full h-[260px] bg-black rounded-xl border border-cyan-400/40 overflow-hidden">

      {["User","Browser","DNS","Router","Server"].map((t,i)=>(
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 text-center"
          style={{ left: 30 + i*130 }}
        >
          <div className="w-28 h-16 bg-cyan-900/30 border border-cyan-400 rounded-lg flex items-center justify-center text-xs">
            {t}
          </div>
        </div>
      ))}

      <motion.div
        className="absolute top-1/2 w-4 h-4 bg-cyan-400 rounded-full"
        initial={{ x: 60 }}
        animate={{ x: 580 }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-cyan-300 text-sm">
        Domain → IP → Server
      </div>

    </div>
  );
}


/* ================= PACKET FLOW ================= */

export function PacketFlowVideo() {

  return (
    <div className="relative w-full h-[280px] bg-black rounded-xl border border-cyan-400/40 overflow-hidden">

      {/* Sender */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <div className="w-28 h-16 bg-cyan-900/30 border border-cyan-400 rounded-lg flex items-center justify-center">
          Sender
        </div>
      </div>

      {/* Receiver */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <div className="w-32 h-16 bg-cyan-900/30 border border-cyan-400 rounded-lg flex items-center justify-center">
          Receiver
        </div>
      </div>


      {/* Packets */}
      {[0,1,2,3,4,5].map((i)=>(

        <motion.div
          key={i}
          className="absolute w-6 h-4 bg-cyan-400 rounded"
          style={{ top: 50 + i*35 }}
          initial={{ x: 120 }}
          animate={{ x: 500 }}
          transition={{
            repeat: Infinity,
            duration: 2 + i*0.3,
            delay: i*0.2
          }}
        />

      ))}

      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-cyan-300 text-sm">
        Segmented Data Packets
      </div>

    </div>
  );
}
