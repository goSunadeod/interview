// https://leetcode-cn.com/problems/invert-binary-tree/
var invertTree = function(root) {
  if(root == null) {
		return null;
	}
    var temp = root.right;
    root.right = root.left;
    root.left = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};