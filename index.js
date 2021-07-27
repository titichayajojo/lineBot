"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
require("dotenv").config();
const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};

const client = new line.Client(config);
const port = process.env.PORT || 3000;
const app = express();
const server = app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get("/", function (req, res) {
  res.status(200);
});

app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  var eventText = event.message.text.toLowerCase();
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  } else if (eventText === "text") {
    const payload = {
      type: "text",
      text: "hello world \uDBC0\uDCA4",
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "sticker") {
    const payload = {
      type: "sticker",
      packageId: 11537,
      stickerId: 52002744,
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "image") {
    const payload = {
      type: "image",
      originalContentUrl: "https://mokmoon.com/images/LINEDevelopers.png",
      previewImageUrl: "https://mokmoon.com/images/LINEDEV.png",
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "video") {
    const payload = {
      type: "video",
      originalContentUrl: "https://mokmoon.com/videos/Brown.mp4",
      previewImageUrl: "https://linefriends.com/img/bangolufsen/img_og.jpg",
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "audio") {
    const payload = {
      type: "audio",
      originalContentUrl: "https://mokmoon.com/audios/line.mp3",
      duration: 1000,
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "location") {
    const payload = {
      type: "location",
      title: "LINE Company (Thailand) Limited",
      address:
        "127 อาคารเกษรทาวเวอร์ ชั้น17 ถ.ราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330",
      latitude: 13.7460089,
      longitude: 100.5386192,
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "imagemap") {
    const payload = {
      type: "imagemap",
      baseUrl:
        "https://charabizasia.files.wordpress.com/2017/07/main-1.jpg?w=1040",
      altText: "This is an imagemap",
      baseSize: {
        width: 1040,
        height: 623,
      },
      video: {
        originalContentUrl: "https://mokmoon.com/videos/Brown.mp4",
        previewImageUrl: "https://linefriends.com/img/bangolufsen/img_og.jpg",
        area: {
          x: 260,
          y: 155,
          width: 540,
          height: 360,
        },
        externalLink: {
          linkUri: "https://line.me",
          label: "See More",
        },
      },
      actions: [
        {
          type: "uri",
          linkUri: "https://developers.line.biz",
          area: {
            x: 0,
            y: 0,
            width: 320,
            height: 320,
          },
        },
        {
          type: "message",
          text: "Hello",
          area: {
            x: 720,
            y: 303,
            width: 320,
            height: 320,
          },
        },
      ],
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "buttons template") {
    const payload = {
      type: "template",
      altText: "This is a buttons template",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://www.nylon.com.sg/wp-content/uploads/2017/07/LINE-Friends.jpg",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#FFFFFF",
        title: "Menu",
        text: "Please select",
        defaultAction: {
          type: "uri",
          label: "View detail",
          uri: "https://developers.line.biz",
        },
        actions: [
          {
            type: "postback",
            label: "Buy",
            data: "action=buy&itemid=123",
          },
          {
            type: "uri",
            label: "View detail",
            uri: "https://line.me",
          },
        ],
      },
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "confirm Template") {
    const payload = {
      type: "template",
      altText: "This is a confirm template",
      template: {
        type: "confirm",
        text: "Are you sure?",
        actions: [
          {
            type: "message",
            label: "Yes",
            text: "yes",
          },
          {
            type: "message",
            label: "No",
            text: "no",
          },
        ],
      },
    };
    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "carousel template") {
    const payload = {
      type: "template",
      altText: "This is a carousel template",
      template: {
        type: "carousel",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        columns: [
          {
            thumbnailImageUrl:
              "https://www.koreaexpose.com/wp-content/uploads/2018/01/LINE-Friends-characters-min.jpg",
            imageBackgroundColor: "#FFFFFF",
            title: "this is menu",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "LINE",
              uri: "https://developers.line.biz",
            },
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=111",
              },
            ],
          },
          {
            thumbnailImageUrl:
              "https://www.nylon.com.sg/wp-content/uploads/2017/07/LINE-Friends.jpg",
            imageBackgroundColor: "#000000",
            title: "this is menu",
            text: "description",
            defaultAction: {
              type: "uri",
              label: "LINE",
              uri: "https://developers.line.biz",
            },
            actions: [
              {
                type: "uri",
                label: "LINE",
                uri: "https://line.me",
              },
            ],
          },
        ],
      },
    };

    return client.replyMessage(event.replyToken, payload);
  } else if (eventText === "image carousel template") {
    const payload = {
      type: "template",
      altText: "This is an image carousel template",
      template: {
        type: "image_carousel",
        columns: [
          {
            imageUrl:
              "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
            action: {
              type: "message",
              label: "Brown",
              text: "Brown was selected",
            },
          },
          {
            imageUrl:
              "https://vignette.wikia.nocookie.net/line/images/1/10/2015-cony.png",
            action: {
              type: "uri",
              label: "Cony",
              uri: "https://developers.line.biz",
            },
          },
        ],
      },
    };
    return client.replyMessage(event.replyToken, payload);
  }
}
