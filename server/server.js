import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import tariffRRouter from "./routes/tariff_routes.js";

//express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/api/v1", tariffRRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "HMS Server Started" });
});

//db connection
mongoose.connect(
    process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(console.log(`DB GOT CONNECTED`))
    .catch((error) => {
        console.log(`DB CONNECTION ISSUES`);
        console.log(error);
    });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));