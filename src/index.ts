import { useDebugValue } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";

export const create = <TState extends Record<string, any>>(
  initialState: TState
) => {
  type Listener = (state: TState, prevState: TState) => void;
  type Selector = (state: TState) => Partial<TState>;
  let state = initialState;
  const listeners: Set<Listener> = new Set();

  class BayStore {
    readonly get = () => state;

    readonly set = (st: Partial<TState> | Selector) => {
      const nextState = typeof st == "function" ? st(state) : st;
      const previousState = state;
      state = Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    };

    readonly listen = (listener: Listener) => {
      listeners.add(listener);

      // Unsubscribe
      return () => listeners.delete(listener);
    };

    readonly getInitialState = () => initialState;

    readonly use = (selector?: any, equalityFn?: any) => {
      const partialState = useSyncExternalStoreWithSelector(
        this.listen,
        this.get,
        this.getInitialState,
        selector,
        equalityFn
      );

      useDebugValue(partialState);

      return partialState;
    };
  }

  return new BayStore();
};
