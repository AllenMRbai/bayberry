import { expect, test } from "vitest";
import { create } from "baystate";

const store = create({
  userName: "Jack",
  userAge: 18,
});

test("has correct properties", () => {
  expect(typeof store.get === "function").toBe(true);
  expect(typeof store.set === "function").toBe(true);
  expect(typeof store.listen === "function").toBe(true);
  expect(typeof store.use === "function").toBe(true);
});

test("can get correct states", () => {
  expect(store.get().userName).toBe("Jack");
  expect(store.get().userAge).toBe(18);
});

test("can response new change", () => {
  let num = 0;
  const unListen = store.listen(() => {
    num += 1;
    expect(num).toBe(1);
    expect(store.get().userName).toBe("Tom");
    expect(store.get().userAge).toBe(20);
  });

  store.set({
    userName: "Tom",
    userAge: 20,
  });

  unListen();

  store.set({
    userName: "Kitty",
    userAge: 22,
  });

  expect(store.get().userName).toBe("Kitty");
  expect(store.get().userAge).toBe(22);
});

test("test error use set", () => {
  let snap = store.get();

  const unListen = store.listen(() => {
    expect(snap !== store.get()).toBe(true);
    expect(snap.userName).toBe("pig");
    expect(store.get().userName).toBe("pig");
  });

  store.set((state) => {
    state.userName = "pig";
    return state;
  });

  unListen();
});

test("test immer", () => {
  store.set({
    userName: "Kitty",
    userAge: 22,
  });

  let snap = store.get();

  const unListen = store.listen(() => {
    expect(snap !== store.get()).toBe(true);
    expect(snap.userName).toBe("Kitty");
    expect(store.get().userName).toBe("duck");
  });

  store.immerSet((state) => {
    state.userName = "duck";
  });

  unListen();
});
