import React from "react";

import { UserProvider, ErrorProvider } from "./allContexts";

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<ErrorProvider />, <UserProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
