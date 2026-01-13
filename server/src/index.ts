import express, { type Request, type Response } from "express";
import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { paymentMiddleware } from "@x402/express";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import jokeRouter from "./routes/jokes.js"
import "dotenv"

const app = express();
const PORT = process.env.PORT || 3000;

const payTo = "0x6220837A2898Bd482c96A5DFA8EE8533d56964B7"

// Create facilitator client (testnet)
const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator"
});

// Create resource server and register EVM scheme
const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

app.use(
  paymentMiddleware(
    {
      "GET /weather": {
        accepts: [
          {
            scheme: "exact",
            price: "$0.001", // USDC amount in dollars
            network: "eip155:84532", // Base Sepolia (CAIP-2 format)
            payTo,
          },
        ],
        description: "Get current weather data for any location",
        mimeType: "application/json",
      },
      "GET /joke": {
        accepts: [
          {
            scheme: "exact",
            price: "$0.001", // USDC amount in dollars
            network: "eip155:84532", // Base Sepolia (CAIP-2 format)
            payTo,
          },
        ],
        description: "Get a random joke",
        mimeType: "application/json",
      },
    },
    server,
  ),
);

// Implement your route
app.get("/weather", (_req: Request, res: Response) => {
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.use("/joke", jokeRouter)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});