var maxDepth = function(root) {
  if (root === null) {
      return 0
  }
  if (root.children.length === 0) {
      return 1
  }
  let max = 0;
  for (let item in root.children) {
      let childNodeDepth = maxDepth(root.children[item]);
      max = Math.max(max, childNodeDepth)
  }
  return max + 1;
};