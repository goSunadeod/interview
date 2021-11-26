// 限制一次买卖
var maxProfit = function(prices) {
  let min = Number.MAX_VALUE;
  let max = 0;
for (let i = 0; i < prices.length; i++) {
          if (prices[i] < min) {
              min = prices[i];
          } else if (prices[i] - min > max) {
              max = prices[i] - min;
          }
      }
  return max
};

// 不限制买卖次数

var maxProfit = function(prices) {
  let len = prices.length;
      if (len < 2) {
          return 0;
      }

      let res = 0;
      for (let i = 1; i < len; i++) {
          res += Math.max(prices[i] - prices[i - 1], 0);
      }
      return res;
};
