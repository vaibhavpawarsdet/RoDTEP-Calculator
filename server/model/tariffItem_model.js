import mongoose from "mongoose";

const tariffItemSchema = new mongoose.Schema({
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
  });
  
  const TariffItem = mongoose.model('TariffItem', tariffItemSchema);
  
  export default TariffItem;