'use client'

import JokeDisplay from "../components/JokeDisplay";
import { ConnectButton } from "thirdweb/react"
import { client } from "@/components/thirdwebClient"
import { baseSepolia } from "thirdweb/chains";

export default function Home() {
  return (
    <>
      <ConnectButton client={client} chain={baseSepolia} />
      <JokeDisplay />
    </>
  );
}
