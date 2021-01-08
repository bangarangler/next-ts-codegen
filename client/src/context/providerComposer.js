import React from "react";

import { AxiosProvider } from "./allContexts";

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
    <ProviderComposer contexts={[<AxiosProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
