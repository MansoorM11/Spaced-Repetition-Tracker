import { getUserIds } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";
import { calculateRevisionDates } from "./common.mjs";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Calculate correct revision dates drom 2026-03-01", () => {
  const result = calculateRevisionDates("2026-03-01");

  assert.deepStrictEqual(result, [
    "2026-03-08",
    "2026-04-01",
    "2026-06-01",
    "2026-09-01",
    "2027-03-01",
  ]);
});

test("Calculates revision date correctly across year boundary", () => {
  const result = calculateRevisionDates("2026-12-30");
  assert.deepStrictEqual(result, [
    "2027-01-06",
    "2027-01-30",
    "2027-03-30",
    "2027-06-30",
    "2027-12-30",
  ]);
});
