### tree-shaking原理

- ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
- 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码


可以通过fs读取代码，acorn遍历处理AST 拿到所有 被用到的函数或变量声明类型节点/ 所有的函数或变量声明类型节点 / 其他所有没有被节点类型匹配的 AST 部分。
```js
 calledDecls
  .map((c) => {
    return decls.get(c);
  })
```
### webpack打包出来的代码和原理 
```js
import A from 'a.js'	
export A
```

```js
{
    './src/index.js': function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict'
      __webpack_exports__['a'] = xxx

    }
}  
```