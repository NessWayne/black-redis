
import { RedisService } from "../src";

describe('REDIS SERVICE', () => {

  
  const host = process.env.RHOST;
  const port = Number(process.env.RPORT);
  const pass = process.env.RPASS;
  const db = process.env.RDB;
  
  const rd = new RedisService({host : host, 
                               port: port, 
                               password: pass, 
                               db: db});
  
  it('Select DB', async () => {
    expect(await rd.selectDB(0)).toEqual(true);
  }); 

  it('Set Value', async () => {
    expect(await rd.set('SX', 'Hola a todos :)', 0)).toEqual(true);
  });

  it('Set Multi Values', async () => {
    const values : string[] = ['SUPER ADMIN','ADMIN', 'EDITOR', 'USER', 'AUTHOR'];
    expect(await rd.setSADD('ROLES', values , 0)).toEqual(true);
  });

  it('Set Value Expiration', async () => {
    expect(await rd.setex('SXN', 'Esta clave va a terminar', 30)).toEqual(true);
  });

  it('Get Value', async () => {
    expect(await rd.get('SX')).toEqual({ Result: true, Data: 'Hola a todos :)'});
  });

  it('IsConnected', async () => {
    expect(rd.isConnected()).toEqual(true);
  });

  it('Close Client', async () => {
    expect(rd.closeClient()).toEqual(true);
  });

});

