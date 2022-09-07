import { config } from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";
import * as UsagiReferee from "../modules/UsagiReferee";

const { slack } = config();


export const expressReceiver = new ExpressReceiver({
  signingSecret: slack.signing_secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: slack.bot_token,
});

app.message(UsagiReferee.makeRegexp(), async ({message, client}) => {
  await client.reactions.add({
    name: "usagi",
    channel: message.channel,
    timestamp: message.ts,
  });
});
