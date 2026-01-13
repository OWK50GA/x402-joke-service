import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { x402Client, x402HTTPClient } from "@x402/fetch";
import { NextRequest, NextResponse } from "next/server";
import { privateKeyToAccount } from "viem/accounts"

const apiBaseUrl = process.env.API_BASE_URL

export async function GET(request: NextRequest) {
    if (!apiBaseUrl) {
        throw new Error("Api Base Url not defined")
    }
    const paymentHeaderFromClient = request.headers.get("Payment-Signature");

    const client = new x402Client();
    
    if (!paymentHeaderFromClient) {
        const res = await fetch(`${apiBaseUrl}/joke`, {
            method: "GET"
        });

        if (res.status !== 402) return;
        const paymentRequired = res.headers.get("Payment-Required")

        if (!paymentRequired) {
            return NextResponse.json(
                { message: "Server Error" },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: "Payment Required" },
            {
                status: 402,
                headers: {
                    "Payment-Required": paymentRequired
                }
            }
        )
    }
    
    const response = await fetch(`${apiBaseUrl}/joke`, {
        method: "GET",
        headers: {
            "Payment-Signature": paymentHeaderFromClient
        }
    });
    const data = await response.json();
    console.log("Response data: ", data);
    
    if (response.ok) {
        const httpClient = new x402HTTPClient(client);
        const paymentResponse = httpClient.getPaymentSettleResponse((name) => response.headers.get(name));
    
        console.log("Payment Settled: ", paymentResponse);
    }

    return NextResponse.json({
        data: data
    })
}