# Canopy

Your portfolio, markets, swaps, bridges, and staking—all under one canopy.

Canopy brings these tools into one interface, with light/dark themes, TradingView charts, DexScreener RH market data, and an injected-wallet testnet workspace. The current build combines market data, simulations, and testnet functionality as documented below.

## Run and build

`npm ci`, `npm run build`, then serve `dist/`. `npm test` runs the test-pool contract on an ephemeral local Ganache chain. The published static assets include the locally bundled ethers client and reproducible Solidity artifacts. No API keys or wallet secrets are stored.

## Data

41 stock/crypto/meme chart choices. Legacy portfolio quotes and balances remain sample data. Newly added symbols have chart links rather than invented prices. TradingView availability and exchange delay vary.

RH markets use DexScreener's public tokens API. A seed universe of 28 tokens is expanded on refresh with public RH search results and latest token profiles (up to 90 addresses). It is ranked by the 24-hour volume of each token's most liquid pool. This is NOT the proprietary trending leaderboard or complete chain coverage. Refresh runs hourly while the page is open and catches up on visibility return. It is not a background server cron. Successful snapshots are cached with timestamps; errors preserve the last snapshot. `scripts/seed-rh.py` rebuilds discovery snapshots using the documented search endpoint.

## Wallet testing

Open in a Rabby-enabled desktop browser. EIP-6963 discovery and injected EVM wallets are supported. No WalletConnect relay is configured. Explicit user connection and wallet confirmation are required.

Supported networks: RH testnet 46630, Arbitrum Sepolia 421614, Ethereum Sepolia 11155111. Mainnet signing is blocked in the client, and the pool constructor refuses mainnet deployment.

1. Connect Rabby, select RH testnet, and get test ETH from the linked official faucet.
2. Deploy a personal ETH/CAN test pool with 0.001 test ETH plus gas. It allocates 100,000 CAN to the wallet and 100,000 CAN to its reserve.
3. Buy or sell CAN; swaps charge 0.3% and use 0.5% slippage and a ten-minute deadline. CAN has no value. Seed liquidity cannot be withdrawn. This is a test harness, not production DEX integration or a general ERC20 implementation.
4. To bridge, use an ordinary EOA on Ethereum Sepolia with test ETH. Select RH testnet or Arbitrum Sepolia and deposit through the verified canonical inbox. Smart/delegated wallets are rejected because depositEth aliases contract callers. L1 confirmation is NOT L2 arrival. Direct L2-to-L2 routing is not implemented; the official bridge link covers other routes.

The agent has tested contracts locally and disconnected-wallet UI, not a user-signed Rabby transaction on public testnet. Staking and original trade pages remain simulations. Contract and transaction references are shown in the wallet review and explorer links.

## Sources

- https://docs.robinhood.com/chain/connecting/
- https://docs.robinhood.com/chain/protocol-contracts/
- https://docs.arbitrum.io/chain-info
- https://docs.arbitrum.io/how-arbitrum-works/deep-dives/l1-to-l2-messaging
- https://docs.dexscreener.com/api/reference
- https://eips.ethereum.org/EIPS/eip-6963

## Interface and wallet safeguards

Favicon and loading motion use the Canopy leaf. Navigation collapses to five mobile items with a More dialog. Decorative market sparklines were removed. Stock vector marks are sourced from Simple Icons; provider artwork and stock images retain their respective ownership. Source records are in dist/data.

Wallet icons use bounded image data URIs and are rendered only as img elements, never inserted as SVG markup. Announced names and icons are self-reported by extensions and are not identity verification. Connection requests public accounts only; transactions still require wallet confirmation. Switching or disconnecting cleans provider listeners; account and chain context is revalidated before signing. No private keys, seed phrases, or token approval signatures are requested by the app.

TradingView runs in a sandboxed, cross-origin iframe on its own domain. No TradingView script executes in the host page, isolating it from the host wallet provider and local state. Mainnet signing remains disabled. Automated checks cover malformed icon input and changed wallet context; this is not an independent security audit.

## Welcome and account access

The welcome screen includes sign-in/sign-up, a falling-leaf loader, light/dark mode, and guest exploration. Account access uses the bundled official Supabase client: email magic links, Google OAuth with PKCE, and Ethereum wallet-message verification. Connecting a wallet for transactions remains separate from signing into an account. Existing sample balances are browser-local and are not synced to an account.

Set `dist/auth-config.json` to your Supabase project URL and **public publishable key** (or legacy anon key). Never use a service-role or secret key. An empty configuration keeps account access unavailable, with guest access working. Enable Email, Google, and Web3/Ethereum in Supabase Auth. Allow `https://jacksonx28.github.io/canopy/dist/` as a redirect URL; set the Site URL to that same URL. Configure Google credentials in Supabase, not in this repository. Email links must be opened in the browser that requested them for PKCE. Configure production email delivery before launch.

Run `npm run build` after modifying `src/welcome.js`. The welcome stylesheet and markup are in `dist/welcome.css` and `dist/index.html`. Supabase details are still required to verify live account creation, Google redirects, and signed wallet sessions.
