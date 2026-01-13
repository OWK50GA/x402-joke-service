import express, { Router, type Request, type Response } from "express";
import { JokeService } from "../services/jokeService.js";
// import { randomMiddleware } from "../middleware/index.js";
// import { settlePaymentAfterResponse } from "../middleware/randomMiddleware.js";
import type { PaymentRequest } from "../types/index.js";

const router: Router = express.Router();

/**
 * GET /joke
 * Returns a random joke
 */
router.get("/", async (req, res: Response) => {
  try {
    const joke = await JokeService.getRandomJoke();
    res.json({
      success: true,
      data: joke,
    });

    // await settlePaymentAfterResponse(req);
  } catch (error) {
    console.error("Error in joke controller:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch joke",
    });
  }
});

export default router;
