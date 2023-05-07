# Simple implementation of vue reacivity

```javascript
const count = reactive({ value: 100 });
let answer = 100;

watchEffect(() => {
  answer = count.value + 100;
});

answer; // 200

count.value = 200;

answer; // 300
```

TODO

- [x] Handling dependency in conditional case effect getter.
- [x] `Computed` implementation.
