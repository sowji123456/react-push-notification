import 'dotenv/config' ;
import express from 'express';
import { config } from 'dotenv';
import {serviceAccount} from './config/firebase.js';
import bodyParser from "body-parser";
import admin from 'firebase-admin';
import cors from 'cors';
import { sendFCMMessage } from './firebase';

config();
const app = express();
app.use(cors());
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://prismappfcm.firebaseio.com"
});

app.post('/subscribe',(req, res, next) => {
    sendFCMMessage(req.body.token)
    res.status(200).send('successful request');
  })
  app.listen(PORT, () => {
    console.log(`You are runnning the server on port ${PORT}`)
  });