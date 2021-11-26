// 中序遍历
 //  3 16 22 23 37 45 99 左根右
 function inOrder (node) {
  // console.log(node ? node.data + '  ===' : null + '');
  if( node != null ){
      inOrder( node.left );
      console.debug( node.show() + ' ');
      inOrder( node.right );
  }
}


// 先序遍历
// 23 16 3 22 45 37 99. 根左右
function preOrder (node) {
  if( node != null ){
      console.debug( node.show() + ' ');
      preOrder( node.left );
      preOrder( node.right );
  }
}

// 后序遍历
// 3 22 16 37 99 45 23   左右根
function postOrder (node) {
if( node != null ){
      postOrder( node.left );
      postOrder( node.right );
      console.debug( node.show() + ' ');
  }
}