import crypto from 'crypto';
import { initSocket, sendToClient } from './connections/websocket';

initSocket()
  .then(() => {
    console.log(`Connection established`);
  })
  .catch((err) => {
    console.log(err);
  })

/** Attempt to send messages to when server starts */
setInterval(() => {
  const messageId = crypto.randomBytes(25).toString('hex');
  const message = JSON.stringify({
    [messageId]: new Date().getTime()
  });
  sendToClient(messageId);
}, 5000);