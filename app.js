const linebot = require('linebot');
const express = require('express');
const bodyParser = require('body-parser');

// const bot = linebot({
//     channelId: process.env.CHANNEL_ID,
//     channelSecret: process.env.CHANNEL_SECRET,
//     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
// });
const bot = linebot({
    channelId: '1657268941',
    channelSecret: 'b4161cdbb619ed211a9f65c8d4726120',
    channelAccessToken: 'kqx8m0MgkA+C51B3bB0MX1XTXcnPoYeI28e+cEial0hOtA6lB8rYUIYzbr/1OG7lqONSrX6kQyUSvEUWanKs/ixpVAQ6Y3HzfOqz3dlYSlOIoo/2M7j6jF9qyCTtn7f23f5abTKqcLVezKfALjl3kAdB04t89/1O/w1cDnyilFU='
});
let X_Line_Signature = 'OLWBPlnJFG1ZndihlWJ/cz6E9Z4Edq8ZUXFwOqyseEw=';
console.log('run 1 bot: ', bot);

const app = express();

const parser = bodyParser.json({
    verify: (req, res, buf, encoding) => {
        req.rawBody = buf.toString(encoding);

        console.log('run 1 req.rawHeaders: ', req.rawHeaders);
        const hasXLineSignature = req.rawHeaders.includes('X-Line-Signature');
        if (hasXLineSignature) {
            console.log('run 2');
            const valueLength = req.rawHeaders.indexOf('X-Line-Signature') + 1;
            X_Line_Signature = req.rawHeaders[valueLength];
        } else {
            const targetObj = ['X-Line-Signature', X_Line_Signature]
            req.rawHeaders = req.rawHeaders.concat(targetObj);
            console.log('run 3', req.rawHeaders);
        }
    }
});

app.post('/linewebhook', parser, (req, res) => {
    console.log('run 4', req.headers);
    req.headers['X-Line-Signature'] = X_Line_Signature;
    console.log('run 5', req.headers);
    console.log('run 6 ', req.rawBody);
    console.log('run 7 ', req.get('X-Line-Signature'));
    // if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
    //     return res.sendStatus(400);
    // }
    bot.parse(req.body);
    return res.json({});
});

bot.on('message', (event) => {
    event.reply(event.message.text).then((data) => {
        console.log('成功', data);
    }).catch(function (error) {
        console.log('失敗', error);
    });
});

app.listen(process.env.PORT || 80, function () {
    console.log('=== 正在執行 LineBot ===');
});

