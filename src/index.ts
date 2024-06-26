import { useDebugValue } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { useShallow } from "./use-shallow";
import { produce } from "immer";

export const create = <TState extends Record<string, any>>(
  initialState: TState
) => {
  type PartialTState = Partial<TState>;
  type Listener = (state: TState, prevState: TState) => void;
  type Selector = (state: TState) => PartialTState;
  let state = initialState;
  const listeners: Set<Listener> = new Set();

  class BayStore {
    readonly get = () => state;

    readonly set = (st: PartialTState | Selector) => {
      const nextState = typeof st == "function" ? st(state) : st;
      const previousState = state;
      state = Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    };

    readonly immerSet = (st: (state: TState) => void) => {
      const nextState = produce(state, st);
      this.set(nextState);
    };

    readonly listen = (listener: Listener) => {
      listeners.add(listener);

      // remove listen
      return () => listeners.delete(listener);
    };

    readonly getInitialState = () => initialState;

    readonly use = (selector?: Selector) => {
      const defaultSelector = (state: TState) => state;

      const partialState = useSyncExternalStoreWithSelector(
        this.listen,
        this.get,
        this.getInitialState,
        useShallow(selector || defaultSelector)
      );

      useDebugValue(partialState);

      return partialState;
    };
  }

  return new BayStore();
};
