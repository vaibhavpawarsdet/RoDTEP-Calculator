import TariffItem from "../model/tariffItem_model.js";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const createTariff = async (req, res) => {
  try {
    const { hsnCode, weight, amount } = req.body;
    const tariffItem = await TariffItem.findOne({ hsnCode }).exec();
    const { descriptionOfGoods, rodtepRate, uqc, cap } = tariffItem || {};

    const parsedRodtep = parseFloat(rodtepRate) / 100;
    const exchangeRateResponse = await axios.get(process.env.Currency_Exchange_URL);
    const dollarRate = exchangeRateResponse.data.quotes;
    const rates = parseFloat(dollarRate.USDINR);

    const decimalPlaces = 2;
    const rodtepConcession = Math.round(parsedRodtep * amount * rates);
    const incentivePerKg = Math.round((rodtepConcession / weight));

    let finalIncentive;
    if (cap && incentivePerKg >= cap) {
      finalIncentive = Math.round(cap * weight);
    } else {
      finalIncentive = rodtepConcession;
    }
    res.status(201).json({
      descriptionOfGoods, rodtepRate, uqc, cap, weight,
      amount, finalIncentive
    });
  } catch (error) {
    console.error("Error to create tariff:", error);
    res.status(500).json({ error: "Unable to create tariff" });
  }
};

export const storeTariff = async (req, res) => {
  try {
    const { hsnCode, descriptionOfGoods, rodtepRate, uqc, cap } = req.body;

    const tariffItem = new TariffItem({
      hsnCode, descriptionOfGoods, rodtepRate, uqc, cap,
    });
    //console.log(tariffItem);
    await tariffItem.save();

    res.status(201).json(tariffItem);
  } catch (error) {
    console.error("Error to create tariff:", error);
    res.status(500).json({ error: "Unable to store tariff" });
  }
};


export const getTariff = async (req, res) => {
  try {
    const tariffItems = await TariffItem.find({});

    if (!tariffItems) {
      return res.status(404).json({ error: 'Tariff not found' });
    }
    res.status(200).json(tariffItems);
  } catch (error) {
    console.error("Error fetching tariff items:", error);
    res.status(500).json({ error: "Unable to fetch tariff items" });
  }
};
export const getAllHsnCode = async (req, res) => {
  try {

    const tariffItems = await TariffItem.find({}, { hsnCode: 1 }).exec();
    if (!tariffItems) {
      return res.status(404).json({ error: 'Tariff not found' });
    }
    // const filterItems = tariffItems.map((t) => t.hsnCode)

    res.status(200).json(tariffItems);
  } catch (error) {
    console.error("Error fetching tariff items:", error);
    res.status(500).json({ error: "Unable to fetch tariff items" });
  }
};