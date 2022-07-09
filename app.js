const linebot = require('linebot');
const express = require('express');

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
console.log('run 1 bot: ', bot);

const app = express();

const parser = bodyParser.json({
    verify: (req, res, buf, encoding) => {
        req.rawBody = buf.toString(encoding);
        console.log('req: ', req);
    }
});

app.post('/linewebhook', parser, (req, res) => {
    if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
        return res.sendStatus(400);
    }
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

