import { useRef } from "react";

export const useShallow = <S>(selector: (state: S) => Partial<S>) => {
  const preStateRef = useRef<Partial<S>>();

  const newSelector = (state: S) => {
    const nextState = selector(state);

    if (!preStateRef.current) {
      return (preStateRef.current = nextState);
    }

    return shallowCompare(nextState, preStateRef.current)
      ? preStateRef.current
      : (preStateRef.current = nextState);
  };

  return newSelector;
};

export const shallowCompare = (
  objA: Record<string, any> | undefined,
  objB: Record<string, any> | undefined
) => {
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return Object.is(objA, objB);
  } else {
    const keysA = Object.keys(objA);
    if (keysA.length !== Object.keys(objB).length) {
      return false;
    }

    for (const keyA of keysA) {
      if (
        !Object.prototype.hasOwnProperty.call(objB, keyA as string) ||
        !Object.is(objA[keyA], objB[keyA])
      ) {
        return false;
      }
    }

    return true;
  }
};
