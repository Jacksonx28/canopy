import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import test from 'node:test';
import { createWalletConnection, parseAuthConfig, parseZeroNetwork, walletError } from '../src/zero-wallet.js';

const first = `0x${'a'.repeat(40)}`;
const second = `0x${'b'.repeat(40)}`;

class MockWallet extends EventEmitter {
  accounts = [first];
  chain = '0x1';
  methods = [];
  signature = '0x11';
  rejected = false;

  async request({ method }) {
    this.methods.push(method);
    if (method === 'eth_requestAccounts' && this.rejected) throw Object.assign(Error('rejected'), { code: 4001 });
    if (method === 'eth_requestAccounts' || method === 'eth_accounts') return this.accounts;
    if (method === 'eth_chainId') return this.chain;
    if (method === 'personal_sign') return this.signature;
    throw Error(`Unexpected method ${method}`);
  }
}

test('connect requests one account permission and updates on account, chain, and disconnect events', async () => {
  const provider = new MockWallet();
  const updates = [];
  const connection = createWalletConnection(context => updates.push(context));
  await connection.connect({ provider });
  assert.deepEqual(provider.methods, ['eth_requestAccounts', 'eth_accounts', 'eth_chainId']);
  assert.equal(connection.current().address, first);
  provider.accounts = [second];
  provider.emit('accountsChanged', [second]);
  assert.equal(connection.current().address, second);
  provider.chain = '0xa7fa';
  provider.emit('chainChanged', '0xa7fa');
  assert.equal(connection.current().chainId, 43002);
  provider.emit('disconnect');
  assert.equal(connection.current(), null);
  assert.equal(provider.listenerCount('accountsChanged'), 0);
  assert.deepEqual(updates.map(context => context?.address), [first, second, second, undefined]);
});

test('wallet cancellation and a provider with no accounts leave the previously connected wallet intact', async () => {
  const connection = createWalletConnection(() => {});
  const original = await connection.connect({ provider: new MockWallet() });
  const rejected = new MockWallet();
  rejected.rejected = true;
  await assert.rejects(connection.connect({ provider: rejected }), error => walletError(error) === 'Wallet request cancelled.');
  const noAccount = new MockWallet();
  noAccount.accounts = [];
  await assert.rejects(connection.connect({ provider: noAccount }), /did not share an EVM account/);
  assert.equal(connection.current(), original);
});

test('the sign-in adapter only forwards personal_sign for the connected address and rejects changes during approval', async () => {
  const provider = new MockWallet();
  const connection = createWalletConnection(() => {});
  const context = await connection.connect({ provider });
  const adapter = connection.signInAdapter(context);
  const request = { method: 'personal_sign', params: ['0xabcd', first] };
  assert.deepEqual(await adapter.request({ method: 'eth_requestAccounts' }), [first]);
  assert.equal(provider.methods.filter(method => method === 'eth_requestAccounts').length, 1);
  await assert.rejects(adapter.request({ method: 'eth_sendTransaction' }), /Unexpected wallet request/);
  await assert.rejects(adapter.request({ method: 'personal_sign', params: ['0xabc', second] }), /Unexpected wallet request/);
  assert.equal(await adapter.request(request), '0x11');
  let approve;
  let promptOpened;
  const shown = new Promise(resolve => { promptOpened = resolve; });
  provider.signature = new Promise(resolve => { approve = resolve; });
  const originalRequest = provider.request.bind(provider);
  provider.request = async params => {
    if (params.method === 'personal_sign') promptOpened();
    return originalRequest(params);
  };
  const signing = adapter.request(request);
  await shown;
  provider.emit('accountsChanged', []);
  approve('0x22');
  await assert.rejects(signing, /changed/);
});

test('config accepts an absent backend or public Supabase key and rejects privileged keys', () => {
  const url = 'https://test-project.supabase.co';
  assert.equal(parseAuthConfig({}), null);
  assert.deepEqual(parseAuthConfig({ url: 'https://project123.supabase.co', publishableKey: 'sb_publishable_demo' }), {
    url: 'https://project123.supabase.co', key: 'sb_publishable_demo',
  });
  assert.throws(() => parseAuthConfig({ url, publishableKey: 'sb_secret_demo' }));
  assert.throws(() => parseAuthConfig({ url: 'https://project123.supabase.co', publishableKey: `prefix.${Buffer.from('{"role":"service_role"}').toString('base64url')}.suffix` }), /public/);
});

test('Zero network metadata permits an unknown explorer and validates endpoint scheme', () => {
  const network = {
    name: 'Zero Interop Testnet',
    chainId: 43002,
    rpcUrl: 'https://testnet.zero.layerzero.network',
    explorerUrl: null,
    sourceUrl: 'https://metadata.layerzero-api.com/v1/metadata',
  };
  assert.equal(parseZeroNetwork(null), null);
  assert.equal(parseZeroNetwork(network).explorerUrl, null);
  assert.equal(parseZeroNetwork(network).chainId, 43002);
  assert.throws(() => parseZeroNetwork({ ...network, rpcUrl: 'http://bad.example' }), /HTTPS/);
  assert.throws(() => parseZeroNetwork({ ...network, chainId: '43002' }), /configuration/);
});
