var form = {}
function timer() {
   var speed = 50, // 设定间隔
   counter = 1,  // 计数
   start = new Date().getTime();
   
   function instance()
   {
    var ideal = (counter * speed),
    real = (new Date().getTime() - start);
    
    counter++;
    form.ideal = ideal; // 记录理想值
    form.real = real;   // 记录真实值

    var diff = (real - ideal);
    form.diff = diff;  // 差值
    console.log(JSON.stringfy(form))

    window.setTimeout(function() { instance(); }, speed);
    //如果这里有额外代码会导致更不准确
   };
   
   window.setTimeout(function() { instance(); }, speed);
}
timer();

/* 
{"ideal":2100,"real":2222,"diff":122}
{"ideal":2150,"real":2277,"diff":127}
{"ideal":2200,"real":2329,"diff":129}
{"ideal":2250,"real":2380,"diff":130}
{"ideal":2300,"real":2431,"diff":131}
{"ideal":2350,"real":2487,"diff":137}
{"ideal":2400,"real":2537,"diff":137}
*/