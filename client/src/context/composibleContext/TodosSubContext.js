import React, { createContext, useContext, useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { SubscriptionClient } from "graphql-subscriptions-client";
import { GQL_SUBSCRIPTION_ENDPOINT } from "../../../constants";

export const TodosSubContext = createContext();

export function TodosSubProvider(props) {
  const [haveNewTodo, setHaveNewTodo] = useState(false);
  const [newTodoFromSub, setNewTodoFromSub] = useState(null);

  useEffect(() => {
    const query = `
subscription TodoAdded {
  todoAdded {
    _id
    userId
    name
  }
}
`;

    const client = new SubscriptionClient(GQL_SUBSCRIPTION_ENDPOINT, {
      reconnect: true,
      lazy: true, // only connect when there is a query
      connectionCallback: (error) => {
        error && console.error(error);
      },
    });

    const subscription = client.request({ query }).subscribe({
      next({ data }) {
        if (data) {
          setNewTodoFromSub(data.todoAdded);
          setHaveNewTodo(true);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <TodosSubContext.Provider
      value={{
        haveNewTodo,
        setHaveNewTodo,
        newTodoFromSub,
        setNewTodoFromSub,
        // TodoAddedToast,
        // displayTodoAddedToast,
      }}>
      {props.children}
    </TodosSubContext.Provider>
  );
}

export const useTodosSubContext = () => useContext(TodosSubContext);
