// compose 
function compose(...funcs) {
  if (funcs.length === 0) {
      return arg => arg
  }

  if (funcs.length === 1) {
      return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// pie
function pie (...args) {
  return function (val) {
    return args.reduce((acc, fn) => {
      acc = fn(acc)
      return acc
    }, val)
  }
}