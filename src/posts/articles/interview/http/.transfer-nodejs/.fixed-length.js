// nodejs 模拟服务
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    res.setHeader("Access-Control-Allow-Headers", "*");
    // res.setHeader("content-type", "application/json")

    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Accept-Ranges', 'bytes');
    // Accept-Ranges: bytes
    res.setHeader('Content-Range', 'bytes 0-9/100');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('<p>预备哈哈哈哈哈哈</p>');
    // setTimeout(() => {
    //   res.write('<li>第一次数据</li>');
    // }, 1000);
    // setTimeout(() => {
    //   res.write('<li>第二次数据</li>');
    //   res.end()
    // }, 2000);
  }
});

server.listen(8084, () => {
  console.log('http://localhost:8084');
});
