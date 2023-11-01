import mongoose from "mongoose";

const tariffSchema = new mongoose.Schema({
    hsnCode: {
      type: String
    },
    descriptionOfGoods: {
      type: String
    },
    rodtepRate: {
      type: String
    },
    uqc: {
      type: String
    },
    cap: {
      type: String
    },
    weight: {
      type: String
    },
    amount: {
      type: String
    },
  });
  
  const Tariff = mongoose.model('Tariff', tariffSchema);
  
  export default Tariff;