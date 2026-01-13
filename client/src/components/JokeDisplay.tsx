"use client";

import { ClientEvmSigner } from "@x402/evm";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { wrapFetchWithPayment, x402Client, x402HTTPClient } from "@x402/fetch";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export default function JokeDisplay() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeAccount = useActiveAccount();

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = new x402Client();
      registerExactEvmScheme(client, { signer: activeAccount as ClientEvmSigner })

      const fetchWithPayment = wrapFetchWithPayment(fetch, client);

      const response = await fetchWithPayment("/api/weather", {
        method: "GET",
      })

      const data = await response.json();
      console.log(data);
      setJoke(data.data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while fetching"
      );
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Joke: ", joke)
  }, [joke])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
          😂 Joke Generator
        </h1>

        {joke && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
            <p className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              {joke.setup}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {joke.punchline}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {!joke && !error && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg text-center text-slate-600 dark:text-slate-400">
            Click the button below to get a joke!
          </div>
        )}

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          {loading ? "Loading..." : "Get a Joke"}
        </button>
      </div>
    </div>
  );
}
