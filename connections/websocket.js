import dotenv from 'dotenv';
import { Server } from 'ws';

import {  resendPendingMessages, savePendingMessage } from '../utils/pendingMessages';
import { isAuthorizedClient } from '../utils/isAuthorizedClient';

dotenv.config();

const { log } = console;
const client = new Map();
const WS_PORT = process.env.WS_PORT;
const server = new Server({ port: WS_PORT });

const addClientMessageListeners = (session) => {
  session.on('message', message => {
    return log(`received: `, message);
  });
};

const initSocket = () => {
  return new Promise((resolve, reject) => {
    server.on("connection", (socket, request) => {
      if(isAuthorizedClient(request)) {
        client.set('session', socket);
        addClientMessageListeners(socket);
        resendPendingMessages();
        return resolve(true);
      }
      socket.send(`You are not allowed to connect`)
      socket.terminate();
      return reject('unauthorized connection');
    });
  });
}

const sendToClient = message => {
  try {
    if(client.get('session'))
      client.get('session').send(message);
    throw Error("no connected client");
  } catch(err) {
    return savePendingMessage(message)
  }
}

export {
  initSocket,
  sendToClient,
}