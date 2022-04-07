const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('./../../3_SystemKernel/Database/index')



var admin = require("firebase-admin");

var serviceAccount = require('./aspire100-notify-firebase-adminsdk-nd27e-f8f53a9758.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// exports.sendNotification = () => {
//   console.log('sending ')
//   const token = "cjBYYazYSsyOaxNriy6OZv:APA91bEvvII_XVV7E4p1s8CjGt08joc-IQ1-FixoJK3NAgfyPqIS10l2uX18FLsMprXclds_u_7gGESZzWI2Vwr8b8dnLhKvLY1KwkmoPj8c0gZyDGsbtJ-HAcsy91STJPt1iOO4UW1q"
//   var options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
//   };
//   var payload = {
//     notification: {
//       title: "This is a Notification",
//       body: "This is the body of the notification message."
//     }
//   };
//   admin.messaging().sendToDevice(token, payload, options);
// }


exports.sendPostNotification = async (postContent, postData, channelData,) => {
  try {
    const devices = await database.user.find({ _id: { $in: channelData.notifications } }).select('deviceInfo.fcmToken');
    const fcmTokens = [];
    for (let device of devices) {
      fcmTokens.push(device.deviceInfo.fcmToken);
    }

    if (fcmTokens.length !== 0) {
      //getting body of the notification
      let notificationBody;
      if (postData.shared === "true") {
        notificationBody = postData.sharedDetails.sharedDescription
      } else {
        notificationBody = postContent.description+"\n"+postContent.attachments.length+" attachments";
      }
      var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };
      var payload = {
        notification: {
          title: channelData.name,
          body: notificationBody
        }
      };
      admin.messaging().sendToDevice(fcmTokens, payload, options);
    }
  } catch (error) {
    console.log(error);
  }
}


