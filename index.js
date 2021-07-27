"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
require("dotenv").config();

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {

  console.log(event);
  if (event.type === 'message' && event.message.type === 'text') {
      handleMessageEvent(event);
  } else {
      return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {

  var msg = {
      type: 'text',
      text: 'สวัสดีครัช'
  };

  var eventText = event.message.text.toLowerCase()

  if (eventText === 'image') {
    msg = {
        'type': 'image',
        'originalContentUrl': 'https://www.redbubble.com/i/ipad-case/Sad-fat-cat-meme-by-coa6ulasol7e/58988156.MNKGF#&gid=1&pid=1',
        'previewImageUrl': 'https://ih1.redbubble.net/image.1721592334.8156/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg'
    }
} else if (eventText === 'location') {
    msg = {
        "type": "location",
        "title": "my location",
        "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
        "latitude": 35.65910807942215,
        "longitude": 139.70372892916203
    }
} else if (eventText === 'template button') {
    msg = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
            "title": "Menu",
            "text": "Please select",
            "actions": [{
                "type": "postback",
                "label": "Buy",
                "data": "action=buy&itemid=123"
            }, {
                "type": "postback",
                "label": "Add to cart",
                "data": "action=add&itemid=123"
            }, {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            }]
        }
    }
} else if (eventText === 'template confirm') {
    msg = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": "Are you sure?",
            "actions": [{
                "type": "message",
                "label": "Yes",
                "text": "yes"
            }, {
                "type": "message",
                "label": "No",
                "text": "no"
            }]
        }
    }
} else if (eventText === 'carousel') {
    msg = {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                    "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/111"
                        }
                    ]
                },
                {
                    "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                }
            ]
        }
    }
}


  return client.replyMessage(event.replyToken, msg);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
