import { type Joke } from "../types/index.js";

export class JokeService {
  /**
   * Fetches a random joke from the Official Joke API
   * @returns Promise resolving to a Joke object
   */
  static async getRandomJoke(): Promise<Joke> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const joke = await response.json();
      // const joke: Joke = {
      //   id: 12,
      //   type: "regular",
      //   setup: "Setup of this joke",
      //   punchline: "Yoooo... Punchline!"
      // }
      console.log(joke)
      return joke as Joke;
    } catch (error) {
      console.error("Error fetching joke:", error);
      throw error;
    }
  }
}
