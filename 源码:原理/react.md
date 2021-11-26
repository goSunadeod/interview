### useEffect实现原理
```js
const allDeps = [];
let effectCursor = 0;

function useEffect(callback, deps = []) {
  if (!allDeps[effectCursor]) {
    // 初次渲染：赋值 + 调用回调函数
    allDeps[effectCursor] = deps;
    effectCursor+=1;
    callback();
    return;
  }

  const currenEffectCursor = effectCursor;
  const rawDeps = allDeps[currenEffectCursor];
  // 检测依赖项是否发生变化，发生变化需要重新render
  const isChanged = rawDeps.some(
    (dep,index) => dep !== deps[index]
  );
  // 依赖变化
  if (isChanged) {
    // 执行回调
    callback();
    // 修改新的依赖
    allDeps[effectCursor] = deps;
  }
  // 游标递增
  effectCursor+=1;
}
```
### setState之后发生了什么
1. 获取当前组件的instance，将要更新的state放进一个数组里_pendingStateQueue,将instance交给enqueueUpdate处理
2. 判断是否处于创建/更新 -》 是 将当前组件放入dirtyComponent  -》 否 调用batchUpdate
3. 调用batchUpdate 将isBatchingUpdate设为true，然后再判断是否处于创建/更新阶段 -》 是 将当前组件放入dirtyComponent   -》 否 循环调用dirtyComponent 的 updateComponent来更新组建
### redux流程和原理
组件想要获取State， 用ActionCreator（dispatch action）创建了一个请求交给Store,Store(previousState, action)借助Reducer确认了该State的状态，Reducer返回给Store一个结果(newState)，Store再把这个State转给组件。
### Fiber
React Fiber把更新过程碎片化，执行过程如下面的图所示，每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。

维护每一个分片的数据结构，就是Fiber。

React Fiber一个更新过程被分为两个阶段(Phase)：第一个阶段Reconciliation Phase（找出需要更新哪些DOM，这个阶段是可以被打断的）和第二阶段Commit Phase（一鼓作气把DOM更新完，绝不会被打断）。

链表好处：
1. 操作更高效，比如顺序调整、删除，只需要改变节点的指针指向就好了。
2. 不仅可以根据当前节点找到下一个节点，在多向链表中，还可以找到他的父节点或者兄弟节点
### diff

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

3. 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

```js
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
): Fiber | null {

  const isObject = typeof newChild === 'object' && newChild !== null;

  if (isObject) {
    // object类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        // 调用 reconcileSingleElement 处理
      // // ...省略其他case
    }
  }

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    // 调用 reconcileSingleTextNode 处理
    // ...省略
  }

  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }

  // 一些其他情况调用处理函数
  // ...省略

  // 以上都没有命中，删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);

```
其实就是分为单节点/多节点

#### 单节点diff
   dom节点是否可以复用 
   再比较key （相同往下走， 不同将该fiber标记为删除）
   再比较type （type相同就复用，type不同该fiber及其兄弟fiber标记为删除）
   返回创建新Fiber
#### 多节点diff
（每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历）
1. 第一轮遍历：处理更新的节点。

  - let i = 0，遍历newChildren，将newChildren[i]与oldFiber比较，判断DOM节点是否可复用。

  - 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。

  - 如果不可复用，分两种情况：

    - key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

    - key相同type不同导致不可复用，会将oldFiber标记为DELETION，并继续遍历

  - 如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

2. 第二轮遍历：处理剩下的不属于更新的节点。
  - newChildren与oldFiber同时遍历完 代表只需要更新
  - newChildren没遍历完，oldFiber遍历完 意味着本次更新有新节点插入
  - newChildren遍历完，oldFiber没遍历完 意味着节点被删除
  - newChildren与oldFiber都没遍历完 代表需要处理移动
    
      生成一个map放（oldFiber的key： oldFiber的value）

      参照物是：最后一个可复用的节点在oldFiber中的位置索引（用变量lastPlacedIndex表示）。

      变量oldIndex表示遍历到的可复用节点在oldFiber中的位置索引。如果oldIndex < lastPlacedIndex，代表本次更新该节点需要向右移动。

      lastPlacedIndex初始为0，每遍历一个可复用的节点，如果oldIndex >= lastPlacedIndex，则lastPlacedIndex = oldIndex。

```js
// 之前
abcd

// 之后
acdb

===第一轮遍历开始===
a（之后）vs a（之前）  
key不变，可复用
此时 a 对应的oldFiber（之前的a）在之前的数组（abcd）中索引为0
所以 lastPlacedIndex = 0;

继续第一轮遍历...

c（之后）vs b（之前）  
key改变，不能复用，跳出第一轮遍历
此时 lastPlacedIndex === 0;
===第一轮遍历结束===

===第二轮遍历开始===
newChildren === cdb，没用完，不需要执行删除旧节点
oldFiber === bcd，没用完，不需要执行插入新节点

将剩余oldFiber（bcd）保存为map

// 当前oldFiber：bcd
// 当前newChildren：cdb

继续遍历剩余newChildren

key === c 在 oldFiber中存在
const oldIndex = c（之前）.index;
此时 oldIndex === 2;  // 之前节点为 abcd，所以c.index === 2
比较 oldIndex 与 lastPlacedIndex;

如果 oldIndex >= lastPlacedIndex 代表该可复用节点不需要移动
并将 lastPlacedIndex = oldIndex;
如果 oldIndex < lastplacedIndex 该可复用节点之前插入的位置索引小于这次更新需要插入的位置索引，代表该节点需要向右移动

在例子中，oldIndex 2 > lastPlacedIndex 0，
则 lastPlacedIndex = 2;
c节点位置不变

继续遍历剩余newChildren

// 当前oldFiber：bd
// 当前newChildren：db

key === d 在 oldFiber中存在
const oldIndex = d（之前）.index;
oldIndex 3 > lastPlacedIndex 2 // 之前节点为 abcd，所以d.index === 3
则 lastPlacedIndex = 3;
d节点位置不变

继续遍历剩余newChildren

// 当前oldFiber：b
// 当前newChildren：b

key === b 在 oldFiber中存在
const oldIndex = b（之前）.index;
oldIndex 1 < lastPlacedIndex 3 // 之前节点为 abcd，所以b.index === 1
则 b节点需要向右移动
===第二轮遍历结束===

最终acd 3个节点都没有移动，b节点被标记为移动
```


### suspense实现
```js
export class Suspense extends React.Component {
    state = {
        isLoading: false
    };

    componentDidCatch(error) {
        if (this._mounted) {
            if (typeof error.then === 'function') {
                this.setState({ isLoading: true });
                error.then(() => {
                    if (this._mounted) {
                        this.setState({ isLoading: false })
                    }
                });
            }
        }
    }
    componentDidMount() {
        this._mounted = true;
    }
    componentWillUnmount() {
        console.log('unm')
        this._mounted = false;
    }


    render() {
        const { children, fallback} = this.props;
        const { isLoading } = this.state;

        return isLoading ? fallback : children;
    }
}
```
### 为什么hooks不能放入if中
state多个状态，应该是保存在一个专门的全局容器中。这个容器，就是一个朴实无华的 Array 对象。具体过程如下：

- 第一次渲染时候，根据 useState 顺序，逐个声明 state 并且将其放入全局 Array 中。每次声明 state，都要将 cursor 增加 1。
- 更新 state，触发再次渲染的时候。cursor 被重置为 0。按照 useState 的声明顺序，依次拿出最新的 state 的值，视图更新。

### useMemo 实现
```js
    let hookState = [];
    let hookIndex = 0;
    function useMemo(callBack, dependencies) {
      if (hookState[hookIndex]) {
        const [oldData, oldDependencies] = hookState[hookIndex];
        // 空数组every为true
        let same  = dependencies.every((item,index)=>item===oldDependencies[index])
        if(same) {
          hookIndex++
          return oldData
        }else{
           const newData = callBack()
           hookState[hookIndex++] = [newData, dependencies];
        }
        //  非首次渲染
      } else {
        // 首次渲染
        const newData = callBack();
        hookState[hookIndex++] = [newData, dependencies];
      }
   }

```