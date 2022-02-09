import * as redis from 'redis';
import { RedisClient } from 'redis';
import { RedisConfig, ResultType } from './parse';

export class RedisService {
  private client: RedisClient;
  //private host: string;
  //private port: number;
  //private password: string;

  constructor(config?: RedisConfig) {
    this.client = redis.createClient(config);

    this.client.on('error', function() {
      //console.error(`❗️ Redis Error: ${error}`)
    });

    this.client.on('connect', () => {
      // console.log('✅ 💃 connect redis success !')
    });

    this.client.on('ready', () => {
      // console.log('✅ 💃 redis have ready !')
    });

    return this;
  }

  /*
    createClient(host?: string, port?: number, password: string = '', db: number = 0) {
        
        let config: RedisConfig = {
            host: host ? host : this.host,
            port: port ? port : this.port,
         };

        if(password != '' || this.password != ''){
            config['password'] = (host && port) ? password : this.password ;   
        }

        if(db != 0){
            config['db'] = db ;   
        }

        this.client = redis.createClient(config);

        //this.client = this.client.duplicate(config);
      
        this.client.on("error", function(error) {
            console.error(`❗️ Redis Error: ${error}`)
        });

          
        this.client.on("connect", () => {
             console.log('✅ 💃 connect redis success !')
        }); 

         this.client.on("ready", () => {
            console.log('✅ 💃 redis have ready !')
        }); 

         return this;
    } */

  getRedisClient() {
    return this.client;
  }

  selectDB(index: number | string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.select(index, function(err: any) {
        // You'll want to check that the select was successful here.
        if (err) reject(false);

        resolve(true);
      });
    });
  }

  async get(key: string, db: number | string = 0): Promise<ResultType> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
    }

    return new Promise((resolve, reject) => {
      this.client.get(key, (err: any, reply: any) => {
        if (err)
          reject({
            Result: false,
            Data: 'Key not found.',
          });

        resolve({
          Result: true,
          Data: reply,
        });
      });
    });
  }

  async getKeysLike(
    pattern: string,
    db: number | string = 0
  ): Promise<ResultType> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
    }

    return new Promise((resolve, reject) => {
      this.client.keys('*' + pattern + '*', (err: any, reply: any) => {
        if (err)
          reject({
            Result: false,
            Data: 'Key not found.',
          });

        resolve({
          Result: true,
          Data: reply,
        });
      });
    });
  }

  async deleteKeysLike(
    pattern: string,
    db: number | string = 0
  ): Promise<ResultType> {
    const { Result: rs, Data: keys } = await this.getKeysLike(pattern, db);

    if (rs) {
      return await this.deleteKey(keys);
    } else {
      return {
        Result: false,
        Data: '',
      };
    }
  }

  async deleteKey(key: string, db: number | string = 0): Promise<ResultType> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
    }

    return new Promise((resolve, reject) => {
      this.client.del(key, (err: any, reply: any) => {
        if (err)
          reject({
            Result: false,
            Data: 'Key not found.',
          });

        resolve({
          Result: true,
          Data: reply,
        });
      });
    });
  }

  async set(key: string, value: string, db: number | string = 0) {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
      return this.client.set(key, value);
    }

    return null;
  }

  async setex(
    key: string,
    value: string,
    expiration: number,
    db: number | string = 0
  ) {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
      return this.client.setex(key, expiration, value);
    }

    return null;
  }

  async setSADD(
    key: string,
    values: string | string[],
    db: number | string = 0
  ): Promise<boolean> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
      return new Promise(async (resolve, reject) => {
        this.client.sadd(key, values, function(err: any) {
          if (err) reject(false);

          resolve(true);
        });
      });
    }

    return false;
  }

  async getSADD(key: string, db: number | string = 0): Promise<ResultType> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
    }

    return new Promise((resolve, reject) => {
      this.client.smembers(key, (err: any, reply: any) => {
        if (err)
          reject({
            Result: false,
            Data: 'Key not found.',
          });

        resolve({
          Result: true,
          Data: reply,
        });
      });
    });
  }

  async existInList(
    key: string,
    value: string,
    db: number | string = 0
  ): Promise<boolean> {
    const isSelected = this.selectDB(db); //Default DataBase 0

    if (await isSelected) {
      return new Promise((resolve, reject) => {
        this.client.sismember(key, value, (err: any, reply: any) => {
          if (err) reject(false);

          resolve(reply);
        });
      });
    }

    return false;
  }

  isConnected(): boolean {
    if (this.client == null) {
      return false;
    } else {
      return this.client.connected;
    }
  }

  closeClient(): boolean {
    return this.client.quit(function(err, res) {
      if (err) {
        // console.log('Error on shutting down Redis client connection.');
      }

      if (res) {
        // console.log('Shutting down Redis client connection.');
      }
    });

    //No se procesaran mas comandos.
    //this.client.end(false);

    //this.client = null;
  }
}
