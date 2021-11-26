Array.prototype._map = function(fn, callbackThis) {
  // 最终返回的新数组
  let res = [];
  // 定义回调函数的执行环境
  // call第一个参数传入null，则 this指向全局对象，同 map的规则
  let cbThis = callbackThis || null;
  this.reduce((before, after, idx, arr) => {
      // 传入map回调函数拥有的参数
      // 把每一项的执行结果push进res中
      res.push(fn.call(cbThis, after, idx, arr));
  }, null);
  return res;
};
let test = arr.myMap(item => {
  return item *= 2;
})
console.log(test);//[2, 4, 8]
