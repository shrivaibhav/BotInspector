const API_AI_ACCESS_TOKEN = "3ca4894616db4ce9993543a7a31b6362";
const FACEBOOK_ACCES_TOKEN =
  "EAAlVE15tCggBAG2tgIVY4LelkwxS1J8UbaYFw8SKD5LimhgxWZA3fZApnR5N959TQA1tnycNDDLe2jgBYOEI7nawSvzFX3mVWAOz37xZBLmcNc2p6VZBM9Hhc3bQBHjOMUM2n8IZAHtmrxrZAodTWqb0CloJQbvOsVIiB9WYAZC2oLgKLLbY4aK";
const apiAiClient = require("apiai")(API_AI_ACCESS_TOKEN);
const request = require("request");

const sendTextMessage = (senderId, text) => {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: FACEBOOK_ACCES_TOKEN },
    method: "POST",
    json: { recipient: { id: senderId }, message: { text } }
  });
};

module.exports = event => {
  const senderId = event.sender.id;
  const message = event.message.text;

  // sessionId could be any string as per our wish
  const apiAiSession = apiAiClient.textRequest(message, {
    sessionId: "botsamplebot_agent"
  });

  // response event
  apiAiSession.on("response", response => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiAiSession.on("error", error => {
    console.log("error from api.ai: ", error);
  });
  apiAiSession.end();
};
