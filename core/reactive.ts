import { track, trigger } from "./effect";

export function reactive(value: object) {
  return createReactive(value);
}

function createReactive(target: any) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(this, key as string);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
      const result = Reflect.set(target, key, newValue, receiver);
      trigger(this, key as string);
      return result;
    },
  });
}
