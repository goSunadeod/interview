const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// 简易Promise
function MyPromise(fn) {
  const self = this;
  self.state = PENDING;
  self.value = null;
  self.resolvedCallbacks = [];
  self.rejectedCallbacks = [];
  // 完成方法
  function resolve(value) {
    if(self.state===PENDING) {
      self.state = RESOLVED;
      self.value = value;
      self.resolvedCallbacks.map(cb => cb(self.value));
    }
  }
  // 拒绝方法
  function reject(value) {
    if(self.state === PENDING) {
      self.state = REJECTED;
      self.value = value;
      self.rejectedCallbacks.map(cb => cb(self.value));
    }
  }
  // 执行传入的方法
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
// then方法
MyPromise.prototype.then = function(success, error) {
  const self = this;
  success = typeof success === 'function' ? success : v => {
    return v;
  };
  error = typeof error === 'function' ? error : r => {
    throw r;
  };
  if(self.state === PENDING) {
    self.resolvedCallbacks.push(success);
    self.rejectedCallbacks.push(error);
  }
  if(self.state === RESOLVED) {
    success(self.value);
  }
  if(self.state === REJECTED) {
    error(self.value)
  }
}

// catch
MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

// finally
MyPromise.prototype.finally = function(onFinished) {
  return this.then(val => {
    onFinished()
    return val
  }).catch((err) => {
    onFinished()
    return err
  })
}

// all
MyPromise.prototype.all = function(iterator) {
  if (!Array.isArray(iterator)) return;
  let count = 0;
  let res = [];
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
      .then(data => {
        res[count++] = data;
        if (count === iterator.length) {
          resolve(res);
        }
      })
      .catch(e => {
        reject(e);
      })
    }
  })
}

//race
MyPromise.prototype.race = function(iterator) {
  return new Promise((resolve, reject) => {
    for(let item of iterator) {
      Promise.resolve(item)
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
    }
  })
}

  //allSettled 数组内都是异步任务，返回所有异步任务的结果 无论是否成功
  MyPromise.prototype.allSettled = function(promisesArr) {
    // 重写每个promise 将结果返回到数组元素中 使其都能成功
    const mapPromisesArr = promisesArr.map((p) => {
      return p
        .then((value) => {
          // 直接返回结果
          return {
            status: 'fulfilled',
            value,
          }
        })
        .catch((reason) => {
          // 直接返回结果
          return {
            status: 'rejected',
            value: reason,
          }
        })
    });
    return this.all(mapPromisesArr)
  }

// 执行自定义Promise
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 3000)
}).then(value => {
  console.log(value);
}, error => {
  console.log(error);
})