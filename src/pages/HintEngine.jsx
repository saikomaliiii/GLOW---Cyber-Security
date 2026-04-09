import CaseState from "./CaseState";

const hints = [
  "Initial alerts often point to authentication systems.",
  "Weak credentials are common entry points.",
  "Compromised users usually receive suspicious emails.",
  "Downloaded files can explain persistence.",
  "Network logs may reveal command-and-control activity."
];

let index = 0;

export const getHint = () => {
  const now = Date.now();
  if (now - CaseState.lastActionTime > 40000 && index < hints.length) {
    return hints[index++];
  }
  return null;
};
