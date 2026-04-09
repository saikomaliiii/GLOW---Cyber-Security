const CaseState = {
  compromisedUser: null,
  phishingFound: false,
  malwareFound: false,
  maliciousPort: null,
  lastActionTime: Date.now(),
};

export const touch = () => {
  CaseState.lastActionTime = Date.now();
};

export default CaseState;
