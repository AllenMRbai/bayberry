import { expect, test } from "vitest";
import { create } from "baystate";

const store = create({
  userName: "Jack",
  userAge: 18,
});

test("has correct properties", () => {
  expect(typeof store.get === "function").toBe(true);
  expect(typeof store.set === "function").toBe(true);
  expect(typeof store.subscribe === "function").toBe(true);
  expect(typeof store.use === "function").toBe(true);
});

test("can get correct states", () => {
  expect(store.get().userName).toBe("Jack");
  expect(store.get().userAge).toBe(18);
});

test("can response new change", () => {
  let num = 0;
  const unsubscribe = store.subscribe(() => {
    num += 1;
    expect(num).toBe(1);
    expect(store.get().userName).toBe("Tom");
    expect(store.get().userAge).toBe(20);
  });

  store.set({
    userName: "Tom",
    userAge: 20,
  });

  unsubscribe();

  store.set({
    userName: "Kitty",
    userAge: 22,
  });

  expect(store.get().userName).toBe("Kitty");
  expect(store.get().userAge).toBe(22);
});
