var request = require('request');

function getTKK(cb) {
    request('https://translate.google.cn', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var ind = body.indexOf('TKK');
            body = body.substring(ind - 10,ind + 50).split(';').filter(_ => _.indexOf('TKK') + 1)[0].split("'")[1];
            console.log(body);
            cb(body);
        }
    });
}

exports.getTKK = getTKK;
