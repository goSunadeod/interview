// 选择
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}

// 快排
 function quickSort(arr){
  if(arr.length <= 1){return arr;}
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex,1)[0]; //找基准，并把基准从原数组删除
  let left = [];
  let right = [];
  for(let i=0;i < arr.length; i++){
      if(arr[i] <= pivot){
          left.push(arr[i]);
      } else {
          right.push(arr[i]);
      }
  }
  //递归
  return quickSort(left).concat([pivot],quickSort(right));
} 
