// import { type Request, type Response, type NextFunction } from "express";
// import { buildSTRKPayment, createPaymasterConfig, createProvider, decodePaymentSignature, encodePaymentRequired, HTTP_HEADERS, PAYMENT_PAYLOAD_SCHEMA, settlePayment, verifyPayment, type PaymentRequired, type PaymentRequirements } from "x402-starknet";
// import { type PaymentRequest } from '../types/index.js'
// /**
//  * Example middleware with minimal random function
//  * Replace this with your actual implementation
//  */
// export const randomMiddleware = async (
//     req: PaymentRequest,
//     res: Response,
//     next: NextFunction
// ) => {
//     // TODO: Implement your random logic here
//     // console.log("Random middleware executed");

//     const paymentHeader = req.headers[HTTP_HEADERS.PAYMENT_SIGNATURE.toLowerCase()];

//     // const paymentRequirements: PaymentRequirements = {
//     //     scheme: "exact",
//     //     network: "starknet:sepolia",
//     //     asset: "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D",
//     //     amount: ""
//     // }

//     const requirements = buildSTRKPayment({
//         network: "starknet:sepolia",
//         amount: 10,
//         payTo: "0x044a82abc925cb27a3ef263d013fde574d8c9a02d784ef12e27456a817b5b787",
        
//     })

//     if (!paymentHeader) {
//         // Return 402 with payment requirements
//         const paymentRequired: PaymentRequired = {
//             x402Version: 2,
//             error: "Payment required to access this resource",
//             resource: {
//                 url: req.originalUrl,
//                 description: "Expensive Joke API Endpoint"
//             },
//             accepts: [requirements]
//         }

//         const header = encodePaymentRequired(paymentRequired);
//         return res.status(402).header(
//             HTTP_HEADERS.PAYMENT_REQUIRED, header
//         ).json(paymentRequired);
//     }

//     try {
//         console.log("Payment signature header present")
//         // Parse and validate payment payload
//         const rawPayload = decodePaymentSignature(paymentHeader as string);
//         const payload = PAYMENT_PAYLOAD_SCHEMA.parse(rawPayload);

//         const provider = createProvider(requirements.network);
//         // @ts-ignore
//         const verification = await verifyPayment(provider, payload, requirements)
        
//         if (!verification.isValid) {
//             res.status(402).json({
//                 error: "Payment Failed",
//                 reason: verification.invalidReason,
//             })
//             return;
//         }

//         (req as any).payment = {
//             payload, requirements, provider
//         };
//         next();
//     } catch (err) {
//         res.status(400).json({
//             error: "Invalid Payment Payload",
//             details: (err as Error).message,
//         });
//     }
//     next();
// };

// export async function settlePaymentAfterResponse (req: PaymentRequest) {
//     const payment = req.payment;

//     if (!payment) return;

//     const { payload, provider, requirements } = payment;

//     try {
//         const paymasterConfig = createPaymasterConfig(requirements.network, {
//             apiKey: "549e93f9-5ddb-4d6c-8c1d-438558d02dc5"
//         })

//         // @ts-ignore
//         const result = await settlePayment(provider, payload, requirements, {
//             paymasterConfig
//         })

//         if (result.success) {
//            console.log(`Payment settled: ${result.transaction}`);
//         } else {
//             console.error(`Settlement failed: ${result.errorReason ?? 'unknown'}`);
//         }

//     } catch (err) {
//         console.error("Settlement error: ", (err as Error).message);
//     }
// }