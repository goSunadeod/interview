1. 获取promise<T> 中的T
```js
type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
```
