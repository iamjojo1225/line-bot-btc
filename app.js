// app.js
const line = require('@line/bot-sdk');
const crypto = require('crypto');


var express = require('express');
const config = {
    channelAccessToken: 'kqx8m0MgkA+C51B3bB0MX1XTXcnPoYeI28e+cEial0hOtA6lB8rYUIYzbr/1OG7lqONSrX6kQyUSvEUWanKs/ixpVAQ6Y3HzfOqz3dlYSlOIoo/2M7j6jF9qyCTtn7f23f5abTKqcLVezKfALjl3kAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'b4161cdbb619ed211a9f65c8d4726120'
};
// LINE 頻道秘密
const channelSecret = config.channelSecret;
// 創建 LINE SDK 客戶端
const client = new line.Client(config);
// create Express app
// about Express itself: <https://expressjs.com/>
const app = express();



app.post('/test', (req, res) => {
    console.log('run 0-1 req: ', req)
    console.log('run 0-2 res: ', res)
    // 給 LINE 的 body 要是 string
    const body = JSON.stringify(req.body);
    console.log('run 1: ', body);

    // 取得 LINE 的簽名
    // const signature = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
    // 取得 headers 中的 X-Line-Signature
    // const headerX = req.get('x-line-signature');

    // 當LINE的簽名 與 X-Line-Signature 一致時
    // console.log('run 2: ', signature, headerX);
    // if (signature === headerX) {

    // webhook event
    const event = req.body.events[0];
    console.log('run 3: ', event);



    // Promise
    //     .all(req.body.events.map(handleEvent))
    //     .then((result) => res.json(result))
    //     .catch((err) => {
    //         console.error(err);
    //         res.status(500).end();
    //     });
});


app.post('/linewebhook', line.middleware(config), (req, res) => {
    console.log('run 0-1 req: ', req)
    console.log('run 0-2 res: ', res)
    // 給 LINE 的 body 要是 string
    const body = JSON.stringify(req.body);
    console.log('run 1: ', body);

    // 取得 LINE 的簽名
    // const signature = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
    // 取得 headers 中的 X-Line-Signature
    // const headerX = req.get('x-line-signature');

    // 當LINE的簽名 與 X-Line-Signature 一致時
    // console.log('run 2: ', signature, headerX);
    // if (signature === headerX) {

    // webhook event
    const event = req.body.events[0];
    console.log('run 3: ', event);



    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
    // }
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