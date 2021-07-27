"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "PED9E+NkGkld2BRkwwOgEo+ADmnxkvGv0CVKhxcTiSdjWbbG2wG2bK0GoQiEOHQIpyNc/r3+ZhyVN1bgXnlVSyY5OFKsbFEHJ54rtxS244qYgMJ7U49bSMAVYlSsPQYjssJ/Fi6oTsM3u9X5hWWUyQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "9dace8cb11d9f98d3314e2bc84811d58",
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

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } 
  
  else if (
    event.message.type === "text" &&
    event.message.text === "คำสั่ง"
  ) {
    const payload = {
      type: "text",
      text: "คำสั่ง Bot : Message, URI, Postback, Datetime, Camera, CameraRoll, Location",
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  } 

  //Message Action
  else if (
    event.message.type === "text" &&
    event.message.text === "Message"
  ) {
    const payload = {
      type: "text",
      text: "Message Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "message",
              label: "Message",
              text: "Hello World!",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  } 
  
   //URI Action
   else if (event.message.type === "text" && event.message.text === "URI") {
    const payload = {
      type: "flex",
      altText: "This is a Flex Message",
      contents: {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              action: {
                type: "uri",
                label: "Add to Cart",
                uri: "https://developers.line.me",
              },
            },
          ],
        },
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  } 
  
   //Postback Action
   else if (
    event.message.type === "text" &&
    event.message.text === "Postback"
  ) {
    const payload = {
      type: "text",
      text: "Postback Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "postback",
              label: "Postback",
              data: "DATAPOSTBACK",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  } 
  
   //Datetime Picker Action
   else if (
    event.message.type === "text" &&
    event.message.text === "Datetime"
  ) {
    const payload = {
      type: "text",
      text: "Datetime picker Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "datetimepicker",
              label: "Datetime Picker",
              data: "storeId=12345",
              mode: "datetime",
              max: "2021-12-31T23:59",
              min: "2021-01-01T00:00",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  } 
   //Camera Action
   else if (event.message.type === "text" && event.message.text === "Camera") {
    const payload = {
      type: "text",
      text: "Camera Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "camera",
              label: "Camera",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  }    
  //CameraRoll Action
  else if (
    event.message.type === "text" &&
    event.message.text === "CameraRoll"
  ) {
    const payload = {
      type: "text",
      text: "CameraRoll Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "cameraRoll",
              label: "Gallery",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  }    
  //Location Action
   else if (
    event.message.type === "text" &&
    event.message.text === "Location"
  ) {
    const payload = {
      type: "text",
      text: "Location Action!",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "location",
              label: "Location",
            },
          },
        ],
      },
    };
    // use reply API
    return client.replyMessage(event.replyToken, payload);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
