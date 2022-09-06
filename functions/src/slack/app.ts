import {App, ExpressReceiver} from "@slack/bolt";
import * as UsagiReferee from "../modules/UsagiReferee";
import { config } from "dotenv";
config()

const authorizeFn = async () => {
  return {
    botToken: process.env.SLACK_BOT_TOKEN,
    botId: process.env.SLACK_BOT_ID,
  };

  throw new Error("No matching authorizations");
};

export const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "",
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: process.env.SLACK_BOT_TOKEN,
  authorize: authorizeFn,
});

app.message(UsagiReferee.makeRegexp(), async ({message, client}) => {
  await client.reactions.add({
    name: "usagi",
    channel: message.channel,
    timestamp: message.ts,
  });
});
