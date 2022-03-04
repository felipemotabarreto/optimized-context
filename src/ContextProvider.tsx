import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const dataRef = useRef({ a: 1, b: 1 });
  const listenersRef = useRef([]);
  const [{ listeners, data }] = useState({
    listeners: listenersRef,
    data: dataRef,
  });

  const notifyChange = useCallback(
    (update) => {
      const updatedContext =
        typeof update === "function" ? update(data.current) : update;
      const oldContext = data.current;
      const newContext = { ...oldContext, ...updatedContext };
      data.current = newContext;
      listeners.current.forEach((l) => l(oldContext, newContext));
    },
    [data, listeners]
  );

  return (
    <Context.Provider value={{ listeners, notifyChange, data }}>
      {children}
    </Context.Provider>
  );
};

export const useOptimizedContext = () => {
  const propKeys = useRef([]);
  const update = useState({})[1];
  const forceUpdate = useCallback(() => update({}), [update]);
  const { listeners, data, notifyChange } = useContext(Context);

  useEffect(() => {
    const listener = (oldContext, newContext) => {
      if (propKeys.current.some((key) => oldContext[key] !== newContext[key])) {
        forceUpdate();
      }
    };

    listeners.current = [...listeners.current, listener];

    return () =>
      (listeners.current = listeners.current.filter((l) => l !== listener));
  }, [listeners, forceUpdate, propKeys]);

  return new Proxy(
    {},
    {
      get: (_, name) => {
        if (!propKeys.current.includes(name)) {
          propKeys.current = [...propKeys.current, name];
        }

        if (name === "update") {
          return notifyChange;
        }

        return data.current[name];
      },
    }
  );
};
