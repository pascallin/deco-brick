const { expect } = require('chai');
require('mocha');
const server = require('../dist/example/index');
const rp = require('request-promise');

describe('Server', () => {
  it('should return here is admin', async () => {
    const result = await rp('http://localhost:3000/admin/test')
    expect(JSON.parse(result).message).to.equal('here is admin');
  });
  it('should return hello world', async () => {
    const result = await rp('http://localhost:3000/')
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
    })
    expect(result.status).to.equal('success');
  });
});