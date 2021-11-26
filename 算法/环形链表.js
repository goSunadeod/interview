

var hasCycle = function(head) {
  if (head === null) return false
   let l1 = head, l2 = head.next;
  while (l1 != null && l2 != null && l2.next != null) {
      if (l1 == l2) {
          return true;
      }
      l1 = l1.next;
      l2 = l2.next.next;
  }
  return false;
};


// funny
var hasCycle = function (head) {
  try {
      JSON.stringify(head)
  } catch{
      return true
  }
  return false
};