import Redis from 'ioredis';
import chalk from 'chalk';

const redis = new Redis();

redis.on('connect', (message) => {
  console.log('✔ [success] redis connected successfully');
});

redis.on('error', (err) => {
  console.log(chalk.red('Redis Client error '), err);
});

export default { redis };
