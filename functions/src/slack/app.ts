import * as functions from 'firebase-functions';
import { App, ExpressReceiver } from '@slack/bolt';
import * as DoughnutsReferee from '../modules/DoughnutsReferee';

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
    signingSecret: config.slack.secret,
    endpoints: '/events',
    processBeforeResponse: true,
});

const app = new App({
    receiver: expressReceiver,
    token: config.slack.token,
});

app.message(DoughnutsReferee.makeRegexp(), async ({ message, client, body }) => {
    await client.reactions.add({
        name: 'usagi',
        channel: message.channel,
        timestamp: message.ts,
    })
});