const webpush = require("web-push");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());

app.use(bodyParser.json());

const vapidKeys = {
    publicKey:"BI5ip35fY-C-pIbAW-gfiDgaoXIPNzIau4RF88eVwsNW6tsX0XUGH4fSNy4GALMaWkGOnI5C2w-4pAcAXHDQkAA",
    privateKey:"1nBd14xl4l80Qw9eyEk-QujFz_dOTYehw1tDTwaMaeE"
}

webpush.setVapidDetails(
  "mailto:axelolmar@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const handleResponse = (res, data, code = 200) => {
  res.status(code).send({ data });
};

const savePush = (req, res) => {
  console.log('Entro a save')
  const name = Math.floor(Date.now() / 1000);

  let tokenBrowser = req.body.token;

  let data = JSON.stringify(tokenBrowser, null, 2);

  fs.writeFile(`./tokens/token-${name}.json`, data, (err) => {
    if (err) {
      throw err;
    }
    handleResponse(res, "Save succesfully")
  });
};

const sendPush = (req, res) => {

  const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cEQhq-IezZk:APA91bFcHCbAlX3cj1C3Ky1XYrSvtVXBfSN9qmQFC_uyxzBQHqaqnGqKEMyhYrxVAMsvjGBCtnq1_HhqWOKJpGcoyvAoFEi4l4dKKmqNmhMifQ5wKcmoWbwkEdrgQ6KVQkHgVv9a6e0r",
    "expirationTime": null,
    "keys": {
      auth: "l6CeHaytMMcgyjVjrikapA",
      p256dh: "BFNio01e_r1vMfmDbkRRDNFGCQhnrA0vTWFBZTSkdyE3cQkQde3vFs8j3Ax6fzL2ec-CDMB9zcPi7_9tOalr5rE"
    }
  };

  const payload = {
      "notification": {
          "title": "😄😄 Saludos",
          "body": "Subscribete a mi canal de YOUTUBE",
          "vibrate": [100, 50, 100],
          "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }]
      }
  }

  webpush.sendNotification(
      pushSubscription,
      JSON.stringify(payload))
      .then(res => {
          console.log('Enviado !!');
      }).catch(err => {
          console.log('Error', err);
      })

  res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/save').post(savePush);
app.route('/api/send').post(sendPush);

const httpServer = app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});