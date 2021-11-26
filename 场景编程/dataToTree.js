// 蚂蚁金服-保险 一面笔试题

// 题目2 完成 convert2(list) 函数，实现将 list 转为 tree



// 源数据
const list = [
    {
        "id": 19,
        "parentId": 0,
    },
    {
        "id": 18,
        "parentId": 16,
    },
    {
        "id": 17,
        "parentId": 16,
    },
    {
        "id": 16,
        "parentId": 0,
    }
];

// 转换后的数据结构

const tree = {
    "id": 0,
    "children": [
        {
            "id": 19,
            "parentId": 0
        },
        {
            "id": 16,
            "parentId": 0,
            "children": [

                {
                    "id": 18,
                    "parentId": 16
                },
                {
                    "id": 17,
                    "parentId": 16
                }
            ]
        }
    ]
}

/**
 * @param list {object[]}, 
 * @param parentKey {string}
 * @param currentKey {string}
 * @param rootValue {any}
 * @return object
 */
function convert2(list, parentKey, currentKey, rootValue) {

}
const result = convert2(list, 'parentId', 'id', 0);
console.log('convert', JSON.stringify(result))



// 微盟一面

// 源数据
const arr = [{
    id: 0,
    data: 1
}, {
    pid: 0,
    id: 1,
    data: 2
}, {
    pid: 0,
    id: 2,
    data: 3,
}, {
    pid: 2,
    id: 3,
    data: 4
}]

// const tree = [{
//     id: 0,
//     data: 1,
//     children: [
//         {
//             pid: 0,
//             id: 1,
//             data: 2,
//         },

//         {
//             pid: 0,
//             id: 2,
//             data: 3,
//             children: [
//                 {
//                     pid: 2,
//                     id: 3,
//                     data: 4
//                 }
//             ]
//         },
//     ]
// }]

function toTree(arr) {

}






// 微盟一面

// 循环
function toTree(arr) {
    const cache = {} // map映射表 
    const result = [] // 初始化结果
    // 构建映射表
    arr.forEach((item) => {
        cache[item.id] = item
    })
    arr.forEach((item) => {
        const parent = cache[item.pid]
        if (!parent) {
            result.push(item) // 初始化添加元素
        } else {
            // 添加本元素到父元素的children 通过对象指针的引用机制添加到父元素中
            ; (parent.children || (parent.children = [])).push(item)
        }
    })
    // 源数据
    return result
}

// 递归
function checkoutArr(oldArr) {
    let newArr = []
    function helpFn(item, arr) {
        if (item.pid === undefined) {
            newArr.push({
                ...item,
                children: []
            })
            return true
        }
        let index = arr.findIndex(arrItem => {
            return item.pid === arrItem.id
        })
        if (index !== -1) {
            arr[index].children.push({
                ...item,
                children: []
            })
            return true
        }
        // 没找到
        for (let ele of arr.values()) {
            if (helpFn(item, ele.children)) return true
        }
    }
    oldArr.forEach(element => {
        helpFn(element, newArr)
    });
    return newArr
}


// map
function array2Tree(arr) {
    const map = new Map()
    const tree = []
    for (const item of arr) {
      item.children = []
      map.set(item.id, item)
    }
    for (const item of arr) {
      if (item.parent !== '0') {
        map.get(item.parent).children.push(item)
      } else {
        tree.push(item)
      }
    }
    return tree
  }