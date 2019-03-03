const express = require("express");
const bodyParser = require("body-parser");
const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set endpoint for get req for verification
app.get("/", verificationController);
// set endpoint for post req for message processing
app.post("/", messageWebhookController);
app.listen(3000, () => {
  console.log("webhook listening at 3000");
});
