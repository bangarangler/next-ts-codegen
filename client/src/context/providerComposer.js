import React from "react";

import { AxiosProvider, UserProvider } from "./allContexts";

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
    <ProviderComposer contexts={[<AxiosProvider />, <UserProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
