// 重试
function login () {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.9) {
      resolve('login success')
    } else {
      reject('login error')
    }
  })
}
function retryRequest (request, count) {
  let retryCount = 0
  return new Promise((resolve, reject) => {
    const retryFunc = () => {
      request().then(res => {
        resolve(res)
      }).catch(() => {
        if (retryCount < count) {
          retryCount++
          console.log(`重试次数:${retryCount}`)
          retryFunc()
        } else {
          retryCount = 0
          reject()
        }
      })
    }
    retryFunc()
  })
}
retryRequest(login, 5).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})


// 串形
// fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());



//最大并发
class Scheduler {
  constructor () {
    this.queue = []
    this.runCount = 0
  }
  add(promiseCreator) { 
    this.queue.push(promiseCreator)
    this.runQueue()
   }

   runQueue () {
    if (this.queue.length && this.runCount < 2) {
      const promiseCreator = this.queue.shift()
      this.runCount += 1
      promiseCreator().then(() => {
        this.runCount -= 1
        this.runQueue()
      })
    }
}
}
   
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  }
  )}

  
const scheduler = new Scheduler()
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')