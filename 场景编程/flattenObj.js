// 阿里面试题 第三题


/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */

 var input = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
}
let flattenRes = flatten(input)
console.log('flattenRes', flattenRes)
// 对象扁平化

function flattenObj(obj) {
}



function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }
function flatten (obj, path = '') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return {}
    let pathKey
    let res = {}
    keys.forEach(key => {
      let curr = res
      const val = obj[key]
      pathKey = path ? `${path}.${key}` : key
      if (Array.isArray(val)) {
        val.forEach((item, index) => {
          pathKey = path ? `${path}[${index}]` : `${key}[${index}]`
          if (isObject(item)) {
            res = Object.assign({}, res, flatten(item, pathKey))
          } else {
            res[pathKey] = item
          }
        })
      } else if (isObject(val)) {
        res = Object.assign({}, res, flatten(val, key))
      } else {
        res[pathKey] = val
      }
    })
    return res
  }
  console.log(flatten(obj))