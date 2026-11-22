# Canopy Zero

Canopy Zero is a public demo of the Canopy workspace for the Zero ecosystem. The `canopy-zero` branch carries this edition. The original Canopy website is deployed independently from `main`.

- [Canopy Zero preview](https://canopy-zero.israeljackson854.chatgpt.site)
- [Original Canopy](https://jacksonx28.github.io/canopy/)

## Run locally

```sh
npm ci
npm run build
npm test
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173/`. Portfolio balances, swaps, bridge transfers, staking, and activity are simulations stored in the browser. TradingView charts show external exchange data where an exact market is mapped. A missing pair shows an unavailable state. Perps and Rewards are previews of future sections.

## Wallets and account sign-in

Rabby, MetaMask, and other injected EVM wallets are discovered with EIP-6963 and legacy wallet detection. Connecting gives Canopy Zero the public address and current chain ID. Guests and connected wallets use the same demo simulation. A separate signed-message flow uses Supabase Auth when configured. Its public project URL and publishable key go in `dist/auth-config.json`. The preview uses an empty configuration until a backend is supplied. Enable Ethereum Web3 sign-in in that project and configure the preview origin using the [Supabase Web3 authentication docs](https://supabase.com/docs/guides/auth/auth-web3). Keep secret and service-role keys out of the frontend. Google sign-in is deferred.

## Zero network readiness

[LayerZero’s metadata](https://metadata.layerzero-api.com/v1/metadata) lists Zero mainnet as chain ID `33002` and its testnet as `43002`. Both list 18-decimal ZRO. The published testnet RPC is `https://testnet.zero.layerzero.network`. The endpoint returned HTTP 403 when checked for `eth_chainId`, and [LayerZero's deployment request](https://github.com/safe-fndn/safe-singleton-factory/issues/1500) describes allowlisted IP or API key access. The metadata lists no explorer for either network. The Zero network config is separate from execution. Mainnet transactions, live swaps, token approvals and ATLAS execution are disabled in this demo.

The development testnet pool, bridge helpers and tests are retained in `src/`, `contracts/`, and `tests/`. To build the old testnet client for internal work, run `npm run build -- --dev-testnet`. Its artifacts go in `.dev-testnet/` and aren’t included in the preview.
