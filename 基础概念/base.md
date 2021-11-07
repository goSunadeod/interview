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

###  微前端开发的优点与缺点
