import * as functions from "firebase-functions";
import {App, ExpressReceiver} from "@slack/bolt";
import * as UsagiReferee from "../modules/UsagiReferee";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
});

app.message(UsagiReferee.makeRegexp(), async ({message, client}) => {
  await client.reactions.add({
    name: "usagi",
    channel: message.channel,
    timestamp: message.ts,
  });
});
