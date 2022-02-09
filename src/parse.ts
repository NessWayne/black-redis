
 export type ResultType = {
                Result: boolean,
                Data: any
            }


/* export type RedisConfig = {
                host: string,
                port: number,
                password?: string,
                db?: number
 } */
 

 
  export class RedisConfig  {
                 host?: string = "127.0.0.1";
                 port?: number = 6379;
                 password?: string ;
                 db?: number | string = 0;
 }
 