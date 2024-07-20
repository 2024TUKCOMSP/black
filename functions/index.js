/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

var admin = require("firebase-admin");

var serviceAccount = require("./black-market-129be-firebase-adminsdk-8t0yr-0d9f4d940a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions=require("firebase-functions");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.hello = functions.region('asia-northeast3').https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("안녕하세요");
  }); 

exports.createAlert = functions.region('asia-northeast3')
.firestore.document('chatroom/{docid}').onCreate((snapshot, context)=>{
    var product=snapshot.data().product;
    var who=snapshot.data().who;

    db.collection('user').doc(who[0]).update({ alert : '어떤놈이 채팅검' })
    db.collection('user').doc(who[1]).update({ alert : '어떤놈이 채팅검' })
});