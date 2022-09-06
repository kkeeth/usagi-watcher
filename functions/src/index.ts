import * as functions from "firebase-functions";
import {expressReceiver} from "./slack/app";

export const slack =
  functions.region("asia-northeast1").https.onRequest(expressReceiver.app);
