type Dep = Set<ReactiveEffect>;
type KeyToDepMap = Map<any, Dep>;

let activeEffect: ReactiveEffect | undefined;
let targetMap = new WeakMap<any, KeyToDepMap>();

export function track(target: any, key: string) {
  let deps = targetMap.get(target);
  if (!deps) targetMap.set(target, (deps = new Map()));

  let dep = deps.get(key);
  if (!dep) deps.set(key, (dep = new Set()));

  if (activeEffect && !dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger(target: any, key: string) {
  let deps = targetMap.get(target);
  if (!deps) return;

  let dep = deps.get(key);
  if (!dep) return;
  dep.forEach((effect) => {
    effect.run();
  });
}

class ReactiveEffect<T = any> {
  _fn: () => T;
  deps: any[] = [];
  constructor(getter: () => T) {
    this._fn = getter;
  }

  run() {
    let temp = activeEffect;
    activeEffect = this;
    this._fn();
    activeEffect = temp;
  }

  stop() {
    cleanupEffect(this);
  }
}

export function watchEffect(fn: () => void) {
  let effect = new ReactiveEffect(fn);
  effect.run();
  return () => {
    effect.stop();
  };
}

function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
}
