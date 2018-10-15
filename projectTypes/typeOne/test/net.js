const {net} = require('electron');
console.log(net);
const request = net.request('https://translate.google.cn');
request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
    });
    response.on('end', () => {
        console.log('response请求中没有更多数据。')
    });
});
request.end();
