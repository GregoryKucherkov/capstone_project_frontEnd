export const ErrorMessage = () => (
  <div style={{ padding: "50px", textAlign: "center" }}>
    <h2 style={{ fontSize: "24px", color: "red" }}>Critical App Error</h2>
    <button
      style={{ padding: "10px", fontSize: "16px" }}
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
);
