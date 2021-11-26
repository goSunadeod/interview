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


// 3 4 6 8 7 5 2 1

