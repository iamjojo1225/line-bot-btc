// 引用linebot SDK
var linebot = require('linebot');

// 用於辨識Line Channel的資訊
var bot = linebot({
    channelId: '1657268941',
    channelSecret: 'b4161cdbb619ed211a9f65c8d4726120',
    channelAccessToken: 'kqx8m0MgkA+C51B3bB0MX1XTXcnPoYeI28e+cEial0hOtA6lB8rYUIYzbr/1OG7lqONSrX6kQyUSvEUWanKs/ixpVAQ6Y3HzfOqz3dlYSlOIoo/2M7j6jF9qyCTtn7f23f5abTKqcLVezKfALjl3kAdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', (event) => {
    // event.message.text是使用者傳給bot的訊息
    // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
    var replyMsg = `此頻道為行情監聽`;
    // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
    event.reply(replyMsg).then(function (data) {
        // 當訊息成功回傳後的處理
    }).catch(function (error) {
        // 當訊息回傳失敗後的處理
    });
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});