import util from 'util';
import Connection from '../connection/index.js';
import chalk from 'chalk';

class Redis {
    static async put(key, value, timeout = null) {
        try {
            Connection.Redis.redis.set(key, value);
            if (timeout) {
                await this.setExpire(key, timeout)
            }
        } catch (err) {
            console.log(chalk.red("error from catch redis set"))
            throw err
        }
    }

    static async get(key) {
        try {
            const data = await Connection.Redis.redis.get(key);
            return data;
        } catch (err) {
            console.log(chalk.red("error from catch redis get"), err)
            throw err
        }
    }

    static async del(key) {
        try {
            const data = await Connection.Redis.redis.del(key);
            return data
        } catch (err) {
            console.log(chalk.red("error from catch redis delete"), err)
            throw err
        }
    }

    static async setExpire(key, value) {
        try {
            await Connection.Redis.redis.expire(key, value);
        } catch (err) {
            console.log(chalk.red("error from catch redis setExpire"), err)
            throw err
        }
    }
}



export default Redis
