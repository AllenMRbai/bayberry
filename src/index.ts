import { useSyncExternalStore } from "react";

type Listener = () => void;

export const create = <StateT extends Record<string, any>>(
  initialState: StateT
) => {
  let state = initialState;
  let listeners = [] as Listener[];

  const get = () => state;

  const set = (st: any) => {
    const newState = typeof st == "function" ? st(state) : st;
    state = { ...state, ...newState };

    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const getInitialState = () => initialState;

  const use = () => {
    return useSyncExternalStore(subscribe, get, getInitialState);
  };

  const store = {
    get,
    set,
    subscribe,
    use,
  };

  return store;
};
