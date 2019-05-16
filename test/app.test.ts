const { expect } = require('chai');
require('mocha');
import server from './server';
const rp = require('request-promise');

describe('Server', () => {
  before(() => {
    server.start();
  });
  it('should return here is admin', async () => {
    const result = await rp('http://localhost:3000/admin/test');
    expect(JSON.parse(result).message).to.equal('here is admin');
  });
  it('should return hello world', async () => {
    const result = await rp('http://localhost:3000/');
    expect(JSON.parse(result).message).to.equal('hello world');
  });
  it('should return success', async () => {
    const result = await rp({
      uri: 'http://localhost:3000/login',
      method: 'POST',
      body: {
        username: 'pascal',
        password: '123456'
      },
      json: true
    });
    expect(result.status).to.equal('success');
  });
  after(() => {
    process.exit(0);
  });
});