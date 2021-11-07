//  如何遍历一个dom树

// 递归写法
function traversal(node) {
    // 对node的处理
    if (node && node.nodeType === 1) {
        console.log(node.tagName);
    }
    //递归先序遍历子节点
    let childNodes = node.childNodes,
        item;
    for (var i = 0; i < childNodes.length; i++) {
        item = childNodes[i];
        if (item.nodeType === 1) {
            traversal(item);
        }
    }
}


// 广度遍历 栈写法
function traversal(node) {
    const stack = [];
    stack.push(node);
    while (stack.length > 0) {
        const elem = stack.pop();
        if (elem && elem.nodeType === 1) {
            console.log(elem.tagName);
            const children = elem.children;
            const len = children.length;
            // 子节点入栈 添加到头部 先进先出
            for (let i = 0; i < len; i++) {
                stack.unshift(children[i]);
            }
        }
    }
}
