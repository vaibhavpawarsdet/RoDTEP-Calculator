import Tariff from "../model/tariff_model.js";
import TariffItem from "../model/tariffItem_model.js";

// export const createTariff = async (req, res) => {
//   try {
//     const { hsnCode, weight, amount } = req.body; 
//     console.log(hsnCode);
//     const tariffItem = await TariffItem.findOne({ hsnCode }).exec();
    
//     console.log(tariffItem);
//     const { descriptionOfGoods, rodtepRate, uqc, cap } = tariffItem || {};
//     console.log(rodtepRate);

//     const parsedRodtep = parseFloat(rodtepRate) / 100;
//     const rodtepConcession = parsedRodtep * amount;
//     const incentivesAmt = rodtepConcession * 85;
//     const incentivePerKg = incentivesAmt / weight;
//     let finalIncentive;
//     if (cap && incentivePerKg >= cap) {
//       finalIncentive = cap * weight;
//     } else {
//       finalIncentive = incentivesAmt;
//     }
// console.log({parsedRodtep, rodtepConcession, incentivesAmt, incentivesAmt});
//     // const tariffItems = new Tariff({
//     //   hsnCode, descriptionOfGoods, rodtepRate, uqc, cap, weight, amount, finalIncentive
//     // });
//     // console.log(tariffItems);
//     // await tariffItems.save();

//     res.status(201).json({
//       descriptionOfGoods, rodtepRate, uqc, cap, weight,
//       amount, finalIncentive
//     });
//   } catch (error) {
//     console.error("Error to create tariff:", error);
//     res.status(500).json({ error: "Unable to create tariff" });
//   }
// };


export const createTariff = async (req, res) => {
  try {
    const { hsnCode, descriptionOfGoods, rodtepRate, uqc, cap, weight,
      amount } = req.body;
    
    const parsedRodtep = parseFloat(rodtepRate)  / 100;
    const rodtepConcession = parsedRodtep * amount;
    const incentivesAmt = rodtepConcession * 85;
    const incentivePerKg = incentivesAmt / weight;
    let finalIncentive;
    if (cap && incentivePerKg >= cap) {
      finalIncentive = cap * weight;
    } else {
      finalIncentive = incentivesAmt;
    } 

    const tariffItem = new Tariff({
      hsnCode, descriptionOfGoods, rodtepRate, uqc, cap, weight, amount, finalIncentive
    });
    //console.log(tariffItem);
    await tariffItem.save();

    res.status(201).json({ tariffItem, finalIncentive });
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