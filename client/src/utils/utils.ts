import { Account, Call, num, hash, TypedData, constants, TypedDataRevision } from "starknet";
import { PaymentPayload, PaymentRequirements } from "x402-starknet";

/**
 * Create a payment payload directly without paymaster involvement
 * The user account signs the payment authorization
 */
export async function createPaymentPayload(
  account: Account,
  _x402Version: number,
  paymentRequirements: PaymentRequirements,
): Promise<PaymentPayload> {
  const nonce = '0x0';
  const validUntil = Math.floor(Date.now() / 1000) + 3600; // Valid for 1 hour

  // Create authorization message
const myTypedData: TypedData = {
    domain: {
        name: "DappLand",
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        version: "1.0.2",
        revision: TypedDataRevision.ACTIVE,
    },
    message: {
        name: "MonKeyCollection",
        value: 2312,
        // do not use BigInt type if message sent to a web browser
    },
    primaryType: "Simple",
    types: {
        Simple: [
        {
            name: "name",
            type: "shortstring",
        },
        {
            name: "value",
            type: "u128",
        },
        ],
        StarknetDomain: [
        {
            name: "name",
            type: "shortstring",
        },
        {
            name: "chainId",
            type: "shortstring",
        },
        {
            name: "version",
            type: "shortstring",
        },
        ],
  },
};

  // Sign the authorization message
  const signature = await account.signMessage(myTypedData);

  // Convert signature to array format
  let signatureArray: Array<string>;
  if (Array.isArray(signature)) {
    signatureArray = signature.map((s) => num.toHex(s));
  } else {
    signatureArray = [num.toHex(signature.r), num.toHex(signature.s)];
  }

  // Create payment payload
  const payload: PaymentPayload = {
    x402Version: 2,
    accepted: paymentRequirements,
    payload: {
      signature: {
        r: signatureArray[0] ?? '0x0',
        s: signatureArray[1] ?? '0x0',
      },
      authorization: {
        from: account.address,
        to: paymentRequirements.payTo,
        amount: paymentRequirements.amount,
        token: paymentRequirements.asset,
        nonce,
        validUntil: validUntil.toString(),
      },
    },
  };

  return payload;
}