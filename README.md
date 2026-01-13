# x402-joke-service

**Pay 0.001 USDC (Base Sepolia) to hear a dad joke from my server.** This is a tiny practice project — a fun experiment that mashes up an Express/TypeScript server and a small client to deliver dad jokes when a micro-payment is detected. ([GitHub][1])

> This repo is a practice - insignificant charge for each joke, just to demonstrate usage of x402 in a React environment

---

# What it does

* Hosts a small server that responds with a dad joke after detecting a payment of **0.001 USDC** on **Base Sepolia** (test network).
* Includes a client interface (simple front-end) to trigger the payment / request the joke.
* Built for learning: TypeScript, simple wallet integration, and basic payment-detection logic.

---

# Tech stack

* Node.js (ESM) + Express (server)
* TypeScript
* A small client (likely React/Next or plain React — check `client/` folder)
* Testnet crypto: USDC on Base Sepolia (testnet)
* @x402 - entire package: server, client, facilitator, express, fetch, etc

---

# Quickstart (recommended)

> These are general instructions — double-check the `package.json` files in `server/` and `client/` for exact scripts.

Prerequisites

* Node.js >= 18 (the build logs in your environment show Node 25.x used, but Node 18+ is typically safe)
* pnpm (or npm/yarn) — repo appears to use pnpm in CI logs
* A Base Sepolia testnet wallet with small test USDC (for local testing)

Server (run the Express backend)

```bash
# from repo root
cd server

# install deps (use pnpm)
pnpm install

# build (compiles TypeScript to dist/)
pnpm build

# run
pnpm start
# or
node dist/index.js
```

Client (if present)

```bash
cd client
pnpm install
pnpm dev      # or pnpm build && pnpm start, check client/package.json
```

> If the server build fails with `Cannot find type definition file for 'node'` (TS2688), install the node types:
>
> ```bash
> cd server
> pnpm add -D @types/node
> ```

---

# Environment variables

* `THIRDWEB_CLIENT_ID` — client id for integrating thirdweb in your dApp
* `API_BASE_URL` — Base URL where you are running the server


---

# How it works (high level)

1. Client asks the server to tell it a dad joke
2. (Next Server) sends the same request to the express server, and if the response is a 402, sends the paymentRequired Header to the client
3. Client asks the user to send **0.001 USDC** to a server wallet (or it creates a payment request).
4. The facilitator is there to help the server confirm that the client has made the payment.
5. Once the required payment is confirmed, the server returns a dad joke payload to the client.

This is a playful micro-pay-for-joke flow — meant for practice with wallets, payments, and server-side verification.

---

# Usage examples

* Endpoint (example): `POST /api/weather` — completely offline, but no return in ui.
* Endpoint (example): `GET /api/joke?tx=0x...` — server validates `tx` hash then returns one-liner dad joke.

---

# Tests & CI

* There are no formal tests in this practice project (unless you add them).
* If you deploy to Render or other hosts, ensure your build command runs `pnpm install` (or the correct package manager) *before* `pnpm build`.

Example Render build command to be explicit:

```bash
pnpm install && pnpm build
```

---

# Deployment

* Backend: any Node host that runs the compiled `dist/` JS (Render, Heroku, Fly, etc.). Ensure you set env vars and install dev types if `tsc` requires them during build.
* Frontend: Vercel/Netlify if it’s a Next/React client; or serve statically if built to `build/`/`dist/`.

---

# Contributing / Development notes

* This is a practice repo — contributions are welcome but not required.
* If you’re extending it, consider:

  * Improving payment verification (listen to events rather than polling)
  * Adding unit tests for the payment and joke-delivery logic
  * Protecting endpoints with rate-limits / replay checks (even on testnets)

---

# About dad jokes (because why not)

Dad jokes are short, pun-forward jokes that are intentionally groan-worthy. They live for eye-rolls and are guaranteed to produce at least one part-laugh part-sigh reaction. 
If you find yourself hitting roadblocks while doing the project, remember that a dad joke awaits you. 
Examples you might find in this project:

* “I’d tell you a construction joke, but I’m still working on it.”
* “Why did the scarecrow win an award? Because he was outstanding in his field.”

If this service charges 0.001 USDC for one, it’s basically the vending machine of comedic groans. Classic dad-joke value economy.

---

[1]: https://github.com/OWK50GA/x402-joke-service "GitHub - OWK50GA/x402-joke-service: Pay 0.001 USDC (Base Sepolia) to hear a dad joke from my server"
