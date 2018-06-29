import dotenv from 'dotenv';

import { client } from '../connections/redis';
import { sendToClient } from '../connections/websocket';

dotenv.config()

const { log } = console;
const PENDING_MESSAGES = process.env.PENDING_MESSAGES_KEY || 'PENDING_MESSAGES';

export const resendPendingMessages = () => {
  client.lrangeAsync(PENDING_MESSAGES, 0, -1).then(messages => {
    client.delAsync(PENDING_MESSAGES);
      messages.forEach((message, index) => {
          console.log('resending', message)
          sendToClient(`${index}` + message);
      });
    })
    .catch((error) => {
      log(error);
    })
}

export const savePendingMessage = message => {
  client.lpushAsync(PENDING_MESSAGES, message);
}