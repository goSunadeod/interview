### vue的响应式原理

初始化渲染watcher，执行watcher的构造函数，将此watcher push到deptarget栈中，之后执行vm._update(vm._render(), .),先执行render，会触发对vm的访问，触发其getter（在defineReactive里）就会触发dep.depend,其实就是Dep.target.addDep(this), 在addDep里面 又将watcher push到了this.subs, 其就是将当前的渲染watcher订阅到了数据劫持的sub中，之后可以通过notify来通知subs触发更新，之后pop将Dep。target恢复成上一个状态

### inject/provide原理

- 将provide的数据定义在组件的_provide上，供子孙组件查询
- 通过循环查找父组件的_provide中inject的值，找到了就将其定义在组件的数据上

### diff

#### 新旧节点不同：
key, tag isComment、data、input类型 相同
- 创建新节点：createElm
- 更新父的占位节点
- 删除旧节点


#### 新旧节点相同：

 1. oldN 与newN 都存在且不相同时，使用 updateChildren 函数来更新子节点
    核心：设置了oldStart+oldEnd，newStart+newEnd这样2对指针，分别对应oldVdom和newVdom的起点和终点， 一系列if的判断
    1. oldS 与 newS 相同 patchVnode 再++index
    2. oldE 与 newE 相同 patchVnode 再--index
    3. oldS 与 newE 相同 或 oldE 与 newS  就 执行插入 insertBefore  ++startIndex --endIndex
    4. 以后就是处理 新增删除 更新 节点

 2. 如果只有 newN 存在，表示旧节点不需要了。如果旧的节点是文本节点则先将节点的文本清除，然后通过 addVnodes 将newN 批量插入到新节点elm下。
 3. 如果只有oldN存在，表示更新的是空节点，则需要将旧的节点通过removeNodes 全部清除。
 4. 当只有旧节点是文本节点的时候，则清除其节点文本内容。

