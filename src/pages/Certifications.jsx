import React from "react";

const certs = [

  {
    name: "Google Cybersecurity Certificate",
    level: "Beginner",
    desc: "Foundational program covering networking, security basics, and incident response.",
    link: "https://grow.google/certificates/cybersecurity/"
  },

  {
    name: "ISC2 Certified in Cybersecurity (CC)",
    level: "Beginner",
    desc: "Entry-level certification covering security principles and risk management.",
    link: "https://www.isc2.org/certifications/cc"
  },

  {
    name: "CompTIA Security+",
    level: "Beginner–Intermediate",
    desc: "Globally recognized baseline certification for cybersecurity professionals.",
    link: "https://www.comptia.org/certifications/security"
  },

  {
    name: "Certified Ethical Hacker (CEH)",
    level: "Intermediate",
    desc: "Focuses on offensive security techniques and penetration testing tools.",
    link: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"
  },

  {
    name: "CompTIA CySA+",
    level: "Intermediate",
    desc: "Cybersecurity Analyst certification focusing on threat detection and SIEM.",
    link: "https://www.comptia.org/certifications/cybersecurity-analyst"
  },

  {
    name: "CompTIA PenTest+",
    level: "Intermediate",
    desc: "Hands-on penetration testing certification for offensive security roles.",
    link: "https://www.comptia.org/certifications/pentest"
  },

  {
    name: "Offensive Security Certified Professional (OSCP)",
    level: "Advanced",
    desc: "Highly respected practical penetration testing certification.",
    link: "https://www.offensive-security.com/pwk-oscp/"
  },

  {
    name: "Certified Information Systems Security Professional (CISSP)",
    level: "Advanced",
    desc: "Gold-standard certification for senior security professionals.",
    link: "https://www.isc2.org/certifications/cissp"
  },

  {
    name: "Certified Information Security Manager (CISM)",
    level: "Advanced",
    desc: "Focuses on security governance, risk management, and leadership.",
    link: "https://www.isaca.org/credentialing/cism"
  }

];

export default function Certifications() {

  return (
    <div className="min-h-screen bg-black text-cyan-300 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        CYBERSECURITY CERTIFICATIONS GUIDE
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {certs.map((c, i) => (
          <div
            key={i}
            className="bg-[#02151a] border border-cyan-600 rounded-xl p-6 shadow-[0_0_20px_#00ffff33]"
          >

            <h2 className="text-2xl font-semibold mb-2">{c.name}</h2>

            <p className="text-sm text-cyan-500 mb-2">
              LEVEL: {c.level}
            </p>

            <p className="mb-4">{c.desc}</p>

            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 text-black px-4 py-2 rounded"
            >
              Official Info →
            </a>

          </div>
        ))}

      </div>

    </div>
  );
}