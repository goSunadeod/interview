// https://leetcode-cn.com/problems/reverse-linked-list/
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr != null) {
      let nextTemp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextTemp;
  }
  return prev;
};

// 递归
let reverse = (head) => {
  if (head.next == null) return head;
  let last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}