import CaseState, { touch } from "./CaseState";

export default function FilesApp() {

  const openMalware = () => {
    CaseState.malwareFound = true;
    touch();
  };

  return (
    <>
      <h3>User Files</h3>
      <pre>
browser_history.log
Visited secure-company-login.com
      </pre>
      <pre onClick={openMalware}>
security_update.js

fetch("185.193.17.9:4444")
      </pre>
    </>
  );
}
