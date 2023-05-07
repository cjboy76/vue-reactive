# Simple implementation of vue reacivity

```javascript
const count = reactive({ value: 100 });
let answer = 100;

watchEffect(() => {
  answer = count.value + 100;
});

answer; // should be 200

count.value = 200;

answer; // should be 300
```

TODO

- [ ] Handling dependency in conditional case effect getter.
- [ ] `Computed` implementation.
