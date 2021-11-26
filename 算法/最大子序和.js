// https://leetcode-cn.com/problems/maximum-subarray/
var maxSubArray = function(nums) {
  var max = nums[0];
  var sum = 0;
  nums.forEach((item, index, array) => {
    sum += item;
    if (sum > max)
      max = sum;
    if (sum < 0)
      sum = 0;
  });

  return max;
};