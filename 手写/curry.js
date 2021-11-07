function curry(fn, ...args) {
  //  比较参数 
  if (args.length < fn.length) {
    //  返回函数 等待接收参数
    return function (...args2) {
      return curry(fn, ...args, ...args2)
    }
  } else {
    //  函数参数够了 执行该函数返回结果
    return fn.apply(this, args)
  }
}