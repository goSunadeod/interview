// https://leetcode-cn.com/problems/maximum-subarray/
var maxSubArray = function(nums) {
  var maxn = nums[0];
  var sum = 0;
  nums.forEach((item, index, array) => {
    sum += item;
    if (sum > maxn)
      maxn = sum;
    if (sum < 0)
      sum = 0;
  });

  return maxn;
};