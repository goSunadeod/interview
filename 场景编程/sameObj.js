
var deepEqual = function (x, y) {
  // 指向同一内存时
  if (x === y) {
    return true;
  } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length) {
      return false;
    }  else {
      for (let key in x) {
        if (y.hasOwnProperty(key)){  
          if (!deepEqual(x[key], y[key]))
            return false;
        } else {
          return false;
        }
         
      }
      return true;
    }
  } else {
    return false;
  }
}
