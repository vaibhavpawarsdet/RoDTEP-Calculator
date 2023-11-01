import express from "express";
import { createTariff, getTariff, storeTariff, getAllHsnCode } from "../controllers/tariff_controller.js";

const router = express.Router();

router.post("/create-tariff", createTariff);
router.post("/store-tariff", storeTariff);
router.get("/get-tariff", getTariff);
router.get("/get-hsncode", getAllHsnCode);

export default router;