### 性能优化指标
- FP (PerformanceObserver)
- FCP (PerformanceObserver / web_vitals)
- TTI (tti-polyfill)
- LCP (web_vitals)
- TTFB (responseStart - requestStart)	

### 模块化的理解
模块化开发就是封装细节，提供使用接口，彼此之间互不影响，每个模块都是实现某一特定的功能。模块化开发的基础就是函数 优点（可维护性/命名空间/可复用性） 。。。。commonjs/esModule

### https握手流程
1. TCP 三次握手

   1. 客户端向服务端发送带有 SYN 的数据段以及客户端开始发送数据段
   2. 服务端收到数据段时，向客户端发送带有 SYN 和 ACK 的数据段
   3. 客户端向服务端发送带有 ACK 的数据段，确认服务端的初始序列号
   
2. TLS 建立连接
  - 客户端向服务端发送 Client Hello 消息，其中携带客户端支持的协议版本、加密算法、压缩算法以及客户端生成的随机数；
  - 服务端收到客户端支持的协议版本、加密算法等信息后；
    1. 向客户端发送 Server Hello 消息，并携带选择特定的协议版本、加密方法、会话 ID 以及服务端生成的随机数；
    2. 向客户端发送 Certificate 消息，即服务端的证书链，其中包含证书支持的域名、发行方和有效期等信息；
    3. 向客户端发送 Server Key Exchange 消息，传递公钥以及签名等信息；
    4. 向客户端发送可选的消息 CertificateRequest，验证客户端的证书；
    5. 向客户端发送 Server Hello Done 消息，通知服务端已经发送了全部的相关信息；
  - 客户端收到服务端的协议版本、加密方法、会话 ID 以及证书等信息后，验证服务端的证书；
    1. 向服务端发送 Client Key Exchange 消息，包含使用服务端公钥加密后的随机字符串，即预主密钥（Pre Master Secret）；
    2. 向服务端发送 Change Cipher Spec 消息，通知服务端后面的数据段会加密传输；
    3. 向服务端发送 Finished 消息，其中包含加密后的握手信息；
  - 服务端收到 Change Cipher Spec 和 Finished 消息后；
    1. 向客户端发送 Change Cipher Spec 消息，通知客户端后面的数据段会加密传输；
    2. 向客户端发送 Finished 消息，验证客户端的 Finished 消息并完成 TLS 握手；


###  webpack优化
- 减少
- 合并
- 缓存

webpack-bundle-analyzer体积 动态import/splitChunks
thread-loader
压缩
cache-loader
hard-source-webpack-plugin
extensions/mainFiles/include
动态Polyfill
Scope Hoisting 
###  微前端开发的优点与缺点
- 优点
 适用于大规模 Web 应用的开发 不局限于框架
 独立开发，独立部署，减少后面维护的成本

- 缺点
 统一规范一下开发模版（复杂度从代码转向基础设施）
 整个应用的稳定性和安全性变得更加不可控
 子服务的划分至关重要，需要根据业务属性和数据相关性因地制宜。如果子服务间公共代码过多，且不好合并的时候。微服务显得比较鸡肋


##### qiankun相比于single-spa做了
- 样式隔离
qiankun 实现了两种样式隔离

  - 严格的样式隔离模式，为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响
  - 实验性的方式，通过动态改写 css 选择器来实现，可以理解为 css scoped 的方式



- **运行时沙箱 **
qiankun 的运行时沙箱分为 JS 沙箱和 `样式沙箱``

JS 沙箱为每个微应用生成单独的 window proxy 对象，配合 HTML Entry 提供的 JS 脚本执行器 (execScripts) 来实现 JS 隔离；

样式沙箱 通过重写 DOM 操作方法，来劫持动态样式和 JS 脚本的添加，让样式和脚本添加到正确的地方，即主应用的插入到主应用模版内，微应用的插入到微应用模版，并且为劫持的动态样式做了 scoped css 的处理，为劫持的脚本做了 JS 隔离的处理，更加具体的内容可继续往下阅读或者直接阅读 qiankun 2.x 运行时沙箱 源码分析


- 资源预加载
qiankun 实现预加载的思路有两种，一种是当主应用执行 start 方法启动 qiankun 以后立即去预加载微应用的静态资源，另一种是在第一个微应用挂载以后预加载其它微应用的静态资源，这个是利用 single-spa 提供的 single-spa:first-mount 事件来实现的


- 应用间通信
qiankun 通过发布订阅模式来实现应用间通信，状态由框架来统一维护，每个应用在初始化时由框架生成一套通信方法，应用通过这些方法来更改全局状态和注册回调函数，全局状态发生改变时触发各个应用注册的回调函数执行，将新旧状态传递到所有应用

### jsBridge原理
SBridge是一种桥接器，通过JS引擎或Webview容器为媒介 ，约定协议进行通信，实现Native端和Web端双向通信的一种机制。

JS调用Native  
注入 API 和 拦截 URL SCHEME。
拼接成一个url scheme 内部早就创建好的一个隐藏iframe来触发scheme
 
Native如何调用JS
执行拼接 JavaScript 字符串,从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上


### react为什么需要合成事件
方便GC/ 内部上下文方便异步setState批量更新

- 当在 React 的函数中调用 setState，会被识别到当前的上下文执行环境有一次可以优化的批量更新操作，进而去对这些处于同一个函数执行上下文的 setState 去批量更新。
- 而当使用 setTimeout 使得 setState 并没有压入函数上下文执行栈，而是进入事件队列了，然后此时React对于这些脱离自己控制的 setState 都是进行同步更新没有做额外的优化



### 简单请求和复杂请求
#### 简单请求
  请求方法：GET、POST、HEAD 
- 除了以下的请求头字段之外，没有自定义的请求头
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
- Content-Type的值只有以下三种(Content-Type一般是指在post请求中，get请求中设置没有实际意义)

  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded
#### 复杂请求
复杂请求我们也可以称之为在实际进行请求之前，需要发起预检请求的请求。


### 安全
- CSRF（跨站请求伪造）
  - 涉及到数据修改操作严格使用 post 请求而不是 get 请求
  - HTTP 协议中使用 Referer 属性来确定请求来源进行过滤（禁止外域）
  - 请求地址添加 token ，使黑客无法伪造用户请求
  - HTTP 头自定义属性验证（类似上一条）
  - 显示验证方式：添加验证码、密码等
  - Cookie SameSite设置

- XSS（跨站脚本攻击）
  - 对用户输入内容和服务端返回内容进行过滤和转译
  - 重要内容加密传输
  - cookie httpOnly
  - 过滤一些危险属性或者方法，例如onerror方法、href属性、src属性等

- ClickJacking（点击劫持）
  - 在HTTP投中加入 X-FRAME-OPTIONS 属性，此属性控制页面是否可被嵌入 iframe 中
  - 判断当前网页是否被 iframe 嵌套
  ```js
  if(top.location != self.location){
      top.location.href = 'http://www.baidu.com'
  }
  ```


### 浏览器一帧会进行哪些过程

- 接受输入事件
- 执行事件回调
- 开始一帧
- 执行 RAF (RequestAnimationFrame)
- 页面布局，样式计算
- 绘制渲染
- 执行 RIC (RequestIdelCallback)

使用 requestAnimationFrame 实现的动画效果比 setTimeout 好的原因如下：

使用 requestAnimationFrame 不需要设置具体的时间；

它提供一个原生的API去执行动画的效果，它会在一帧（一般是 16ms）间隔内根据选择浏览器情况去执行相关动作。
setTimeout 是在特定的时间间隔去执行任务，不到时间间隔不会去执行，这样浏览器就没有办法去自动优化


requestAnimationFrame 里面的回调函数是在页面刷新之前执行，它跟着屏幕的刷新频率走，保证每个刷新间隔只执行一次；
如果页面未激活的话，requestAnimationFrame 也会停止渲染，这样既可以保证页面的流畅性，又能节省主线程执行函数的开销。


### meta标签的作用
meta标签里的数据是供机器解读的，其主要作用有：搜索引擎优化（SEO），定义页面使用语言，自动刷新并指向新的页面，实现网页转换时的动态效果，控制页面缓冲，网页定级评价，控制网页显示的窗口等等。

```html
<meta name="keywords" content="your keywords">
<meta http-equiv="charset" content="iso-8859-1">
<meta http-equiv="expires" content="31 Dec 2018">
<meta http-equiv="refresh" contect="5;url=https://www.deannhan.cn">
<meta http-equiv="pragma" contect="no-cache">
<meta http-equiv="content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' *.xx.com *.xx.cn 'unsafe-inline' 'unsafe-eval';">


```

### px，rem，em的区别
1. px是固定的像素，一旦设置了就无法因为适应页面大小而改变。
2. em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。
3. em是相对于其父元素来设置字体大小的，一般都是以<body>的“font-size”为基准。这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而rem是相对于根元素<html>，这样就意味着，我们只需要在根元素确定一个参考值。

总之：对于em和rem的区别一句话概括：

em相对于父元素，rem相对于根元素 , em 单位基于使用他们的元素的字体大小。 rem 单位基于 html 元素的字体大小

```js
// 分辨率
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            　window.innerWidth>max ?  window.innerWidth : max;
            if (!clientWidth) return;
            docEl.style.fontSize = (clientWidth / 750)*100+ + 'px';
        };
 
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```


### sameSite
- Strict 
完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
- Lax
大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get（链接，预加载请求，GET 表单） 请求除外。
- None
前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效


### eventLoop
1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

4. 主线程不断重复上面的第三步。 

### addEventListener('error')和onError区别
window.onerror是一个全局变量，默认值为null。当有js运行时错误触发时，window会触发error事件，并执行window.onerror()。onerror可以接受多个参数。

监听js运行时错误事件，会比window.onerror先触发，与onerror的功能大体类似，不过事件回调函数传参只有一个保存所有错误信息的参数，不能阻止默认事件处理函数的执行，但可以全局捕获资源加载异常的错误