import React, { Suspense } from "react";
import "./App.css";

const AuthGateComponent = React.lazy(() => import("./pages/AuthGate"));

function App() {
  return (
    <Suspense fallback={<div>Loading AuthGate...</div>}>
      <AuthGateComponent />
    </Suspense>
  );
}

export default App;
