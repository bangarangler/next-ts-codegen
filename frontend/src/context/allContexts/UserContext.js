import React, { createContext, useContext, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { SubscriptionClient } from "graphql-subscriptions-client";
import { GQL_SUBSCRIPTION_ENDPOINT } from "../../constants";

export const UserContext = createContext();

export function UserProvider(props) {
  const [fakeNotification, setFakeNotification] = useState(false);
  const [fakeCount, setFakeCount] = useState(0);
  useEffect(() => {
    const query = `
    subscription SomethingChanged {
      somethingChanged
    }
    `;

    const client = new SubscriptionClient(GQL_SUBSCRIPTION_ENDPOINT, {
      reconnect: true,
      lazy: true, // only connect when there is a query
      connectionCallback: (error) => {
        error && console.error(error);
      },
    });

    // client.request({ query });

    const subscription = client.request({ query }).subscribe({
      next({ data }) {
        if (data) {
          console.log("we got Something!", data);
          setFakeNotification(true);
          setFakeCount((fakeCount) => fakeCount + 1);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        fakeCount,
        setFakeCount,
        fakeNotification,
        setFakeNotification,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
