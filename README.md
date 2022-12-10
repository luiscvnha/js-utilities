# js-utilities

JavaScript/TypeScript utilities written in TypeScript.

### Transpile TypeScript into JavaScript
```
$ npm run build
```

### Run the tests
```
$ npm run test
```

## Utilities

### Promises
JavaScript's `Promise` object:
```ts
const p = new Promise<number>((resolve, reject) => {
  resolve(42);
});

p.then((v) => { /* ... */ });
```

1. [DeferredPromise](/src/promises/deferred-promise.ts)

    ```ts
    const dp = new DeferredPromise<number>();

    dp.then((v) => { /* ... */ });

    dp.resolve(42);

    dp.then((v) => { /* ... */ });
    ```

1. [ExecutablePromise](/src/promises/executable-promise.ts)

    ```ts
    const ep = new ExecutablePromise<number>();

    ep.then((v) => { /* ... */ });

    ep.execute((resolve, reject) => {
      resolve(42);
    });

    dp.then((v) => { /* ... */ });
    ```

### Helpers
1. [isNullish](/src/helpers/index.ts#L1)

    Checks if a value is [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` or `undefined`).

1. [isNullishOrEmpty](/src/helpers/index.ts#L5)

    Checks if a value is [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) or an empty string or array.

1. [isNullishOrWhitespace](/src/helpers/index.ts#L11)

    Checks if a value is [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) or a string that consists only of white-space characters

1. [typeOf](/src/helpers/index.ts#L17)

    Same as the `typeof` operator, but returns the class name if the value is an object.
