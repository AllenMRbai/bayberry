import { expect, test } from "vitest";
import { shallowCompare } from "../src/use-shallow";

test("test shallowCompare", () => {
  expect(shallowCompare(undefined, undefined)).toBe(true);
  expect(shallowCompare(undefined, {})).toBe(false);
  expect(shallowCompare({ id: 234 }, { id: 222 })).toBe(false);
  expect(shallowCompare({ id: 111 }, { id: "111" })).toBe(false);
  expect(shallowCompare({ id: 111 }, { id: 111 })).toBe(true);
  expect(
    shallowCompare({ id: 111, tag: "apple" }, { id: 111, tag: "banana" })
  ).toBe(false);
  expect(
    shallowCompare({ id: 111, tag: "apple" }, { id: 111, tag: "apple" })
  ).toBe(true);
  expect(
    shallowCompare(
      { id: 111, tag: "apple", price: undefined },
      { id: 111, tag: "apple" }
    )
  ).toBe(false);
  expect(
    shallowCompare(
      { id: 111, tag: "apple", price: NaN },
      { id: 111, tag: "apple", price: NaN }
    )
  ).toBe(true);
  expect(
    shallowCompare(
      { id: 111, tag: "apple" },
      { id: 111, tag: "apple", price: 234 }
    )
  ).toBe(false);
});
