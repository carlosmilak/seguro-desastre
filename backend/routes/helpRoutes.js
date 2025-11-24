import express from "express";
import { createHelpRequest, getNearby } from "../controllers/helpController.js";

const router = express.Router();

router.post("/create", createHelpRequest);
router.get("/nearby", getNearby);

export default router;
