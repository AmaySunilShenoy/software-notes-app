import express from "express";
import * as healthCheckController from "../controllers/health.controller";
import { Request, Response } from "express";

const router = express.Router();

router.get("/sync", (_req: Request, res: Response) => {
  const result = healthCheckController.healthCheckSync();
  res.json({
    health: result,
    status: 200,
  });
});

router.get("/async", async (_req: Request, res: Response) => {
  const result = await healthCheckController.healthCheckAsync();
  res.json({
    health: result,
    status: 200,
  });
});

export default router;
