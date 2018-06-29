import dotenv from 'dotenv';
dotenv.config()

export const isAuthorizedClient = request => {
  const AUTHORIZED_CLIENT_IP = process.env.AUTHORIZED_CLIENT;
  const clientRawAddress = request.connection.remoteAddress;
  const clientIp = clientRawAddress.replace(/^::ffff:/, '').trim();
  console.log(`${clientIp} connected`);
  return clientIp === AUTHORIZED_CLIENT_IP;
}
