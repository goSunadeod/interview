// 题目：使用Promise实现红灯每隔3s亮一次，黄灯每隔2s亮一次，绿灯每隔1s亮一次，循环这个过程。
const task = (light, timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (light === 'red') {
        console.log('红灯亮')
      } else if (light === 'yellow') {
        console.log('黄灯亮')
      } else {
        console.log('绿灯亮')
      }
      resolve()
    }, timer)
  })
}

const taskLoop = async () => {
  // promise方案
  task('red', 3000)
    .then(() => task('yellow', 2000))
    .then(() => task('green', 1000))
    .then(taskLoop)
  
  // async/await
  // await task('red', 3000)
  // await task('yellow', 2000)
  // await task('green', 1000)
  // taskLoop()
}
taskLoop()