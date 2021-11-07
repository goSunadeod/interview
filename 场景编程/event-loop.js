// 实战event-loop任务优先级

// 答案在下面
setImmediate(function () {
  console.log(1)
}, 0)
setTimeout(function () {
  console.log(2)
}, 0)
new Promise(function (resolve) {
  console.log(3)
  resolve()
  console.log(4)
}).then(function () {
  console.log(5)
})
async function test(){
  let a = await 9
  console.log(a)
  let b = await new Promise((resolve)=>{
    resolve(10)
  })
  console.log(b)
}
test()
console.log(6)
process.nextTick(function () {
  console.log(7)
})
console.log(8)






































// 微任务：nextTick比then优先级高      宏任务：setTimeout优先级比setImmediate高
// process.nextTick > promise.then  >  setTimeout > setImmediate
// 注意await也是promise 但是需要一个个promise添加进去 所以同一个await里面的promise的顺序可能被其他的promise插队
// 解析：https://www.jianshu.com/p/a39d3e878d06
// 答案：3 4 6 8 7 5 2 1
