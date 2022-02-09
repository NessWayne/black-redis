# BlackRedis

Overview
--------

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