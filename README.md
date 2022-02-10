# BlackRedis
[![Node.js CI](https://github.com/NessWayne/black-redis/actions/workflows/main.yml/badge.svg)](https://github.com/NessWayne/black-redis/actions/workflows/main.yml) [![NPM version](https://img.shields.io/npm/v/black-redis.svg)](https://www.npmjs.com/package/black-redis) [![Install Size](https://packagephobia.com/badge?p=black-redis)](https://packagephobia.com/result?p=black-redis)

Black redis allows you to use redis in a very simple and easy way.

Npm
------------

```bash
npm install black-redis
```


## Usage

### Basic Example

```typescript
import { RedisService } from "black-redis";

(async () => {
  const client = RedisService();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.set('key', 'value', 'db-name (optional)');
  const value = await client.get('key');
})();
```



## License

This repository is licensed under the "MIT" license. See [LICENSE](LICENSE).
