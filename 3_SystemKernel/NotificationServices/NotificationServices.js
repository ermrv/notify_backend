const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var admin = require("firebase-admin");

var serviceAccount = require('./aspire100-notify-firebase-adminsdk-nd27e-f8f53a9758.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendNotification=()=>{
    const token="fCQcgegUSMeslWSzw3R6z2:APA91bEShlaqAdCdFCTUNijvSVhCoZN4Ky9E7M1DbkCUHSDrawRbJSigB1VXwXiyco8iuDnIzZN_umTS46f7CG6FAlfsnBnc32GrSYVAygQ73XeUejlYX6DUBj7oHxrWHEDQe7mgo0Sj"
    var options = {
        priority: "high",
        timeToLive: 60 * 60 *24
      };
      var payload = {
        notification: {
          title: "This is a Notification",
          body: "This is the body of the notification message."
        }
      };
    admin.messaging().sendToDevice(token,payload,options);
}