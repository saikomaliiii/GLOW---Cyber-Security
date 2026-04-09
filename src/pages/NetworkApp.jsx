import CaseState, { touch } from "./CaseState";

export default function NetworkApp() {

  const inspect = () => {
    CaseState.maliciousPort = 4444;
    touch();
  };

  return (
    <>
      <h3>Network Monitor</h3>
      <pre onClick={inspect}>
22 ssh
80 http
4444 unknown
      </pre>
    </>
  );
}
