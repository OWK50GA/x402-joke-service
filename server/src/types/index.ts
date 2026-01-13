import { type Request } from "express"
import type { createProvider, PAYMENT_PAYLOAD_SCHEMA, PaymentRequirements } from "x402-starknet";

export interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export interface PaymentRequest extends Request {
    payment?: {
        payload: ReturnType<typeof PAYMENT_PAYLOAD_SCHEMA.parse>;
        requirements: PaymentRequirements;
        provider: ReturnType<typeof createProvider>;
    };
}