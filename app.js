// // 引用linebot SDK
// var linebot = require('linebot');

// // 用於辨識Line Channel的資訊
// var bot = linebot({
//     channelId: '1657268941',
//     channelSecret: 'b4161cdbb619ed211a9f65c8d4726120',
//     channelAccessToken: 'kqx8m0MgkA+C51B3bB0MX1XTXcnPoYeI28e+cEial0hOtA6lB8rYUIYzbr/1OG7lqONSrX6kQyUSvEUWanKs/ixpVAQ6Y3HzfOqz3dlYSlOIoo/2M7j6jF9qyCTtn7f23f5abTKqcLVezKfALjl3kAdB04t89/1O/w1cDnyilFU='
// });
// const CONFIG = {}

// // 當有人傳送訊息給Bot時
// bot.on('message', (event) => {
//     // event.message.text是使用者傳給bot的訊息
//     // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
//     var replyMsg = `此頻道為行情監聽`;
//     // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
//     event.reply(replyMsg).then(function (data) {
//         // 當訊息成功回傳後的處理
//     }).catch(function (error) {
//         // 當訊息回傳失敗後的處理
//     });
// });

// // Bot所監聽的webhook路徑與port
// bot.listen('/linewebhook', 3000, function () {
//     console.log('[BOT已準備就緒]');
// });
//===========================================================
// index.js
const line = require('@line/bot-sdk');
var express = require('express');
const config = {
    channelAccessToken: 'kqx8m0MgkA+C51B3bB0MX1XTXcnPoYeI28e+cEial0hOtA6lB8rYUIYzbr/1OG7lqONSrX6kQyUSvEUWanKs/ixpVAQ6Y3HzfOqz3dlYSlOIoo/2M7j6jF9qyCTtn7f23f5abTKqcLVezKfALjl3kAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'b4161cdbb619ed211a9f65c8d4726120'
};
// create LINE SDK client
const client = new line.Client(config);
// create Express app
// about Express itself: <https://expressjs.com/>
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/linewebhook', line.middleware(config), (req, res) => {
    console.log(req, res)
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});
// event handler
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
    // use reply API
    return client.replyMessage(event.replyToken, echo);
}
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});