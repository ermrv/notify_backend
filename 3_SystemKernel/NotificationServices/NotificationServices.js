const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const database = require('./../../3_SystemKernel/Database/index')



var admin = require("firebase-admin");

var serviceAccount = require('./aspire100-notify-firebase-adminsdk-nd27e-f8f53a9758.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.sendNotification = () => {
  const token = "fCQcgegUSMeslWSzw3R6z2:APA91bEShlaqAdCdFCTUNijvSVhCoZN4Ky9E7M1DbkCUHSDrawRbJSigB1VXwXiyco8iuDnIzZN_umTS46f7CG6FAlfsnBnc32GrSYVAygQ73XeUejlYX6DUBj7oHxrWHEDQe7mgo0Sj"
  var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };
  var payload = {
    notification: {
      title: "This is a Notification",
      body: "This is the body of the notification message."
    }
  };
  admin.messaging().sendToDevice(token, payload, options);
}


exports.sendPostNotification = async (postContent, postData, channelData,) => {
  console.log(postData);
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
        notificationBody = postData.sharedDetails.sharedDescription +"\n"+postContent.attachments.length+" attachments";
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


