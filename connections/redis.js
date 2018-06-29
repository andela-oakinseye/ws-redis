import dotenv from 'dotenv';
import redis from 'redis';
import bluebird from 'bluebird';

dotenv.config();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

export {
  client,
}
