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

const linebotParser = bot.parser();

app.post('/linewebhook', linebotParser);

bot.on('message', function (event) {
    event.reply(event.message.text).then(function (data) {
        console.log('成功', data);
    }).catch(function (error) {
        console.log('失敗', error);
    });
});

app.listen(process.env.PORT || 80, function () {
    console.log('=== 正在執行 LineBot ===');
});
