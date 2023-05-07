import { expect, test } from "vitest";
import { reactive } from "../core/reactive";
import { watchEffect } from "../core/effect";

test("Basic reactive", () => {
  const count = reactive({ value: 100 });
  let answer = 100;

  watchEffect(() => {
    answer = count.value + 100;
  });

  expect(answer).toBe(200);
  count.value = 200;

  expect(answer).toBe(300);
});

test("Effect called immediately & Cleanup watcher", () => {
  const count = reactive({ value: 100 });
  let calledCount = 0;
  let answer = 100;
  let stopWatcher;

  stopWatcher = watchEffect(() => {
    calledCount += 1;
    answer = count.value + 100;
  });

  expect(calledCount).toBe(1);

  count.value = 200;
  expect(answer).toBe(300);
  expect(calledCount).toBe(2);

  stopWatcher();
  count.value = 300;
  expect(answer).toBe(300);
  expect(calledCount).toBe(2);
});
