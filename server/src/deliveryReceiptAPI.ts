import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import CommunicationLog from "./model/campaign-shema";
import { Connection } from "./database/db";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

Connection();

app.post("/deliveryReceipt", async (req, res) => {
  const { logId, status } = req.body;

  try {
    await CommunicationLog.findByIdAndUpdate(logId, { status });
    res.status(200).send("Status updated");
  } catch (error) {
    res.status(500).send("Error updating status");
  }
});

app.listen(3003, () => {
  console.log("Delivery Receipt API is running on port 3003");
});
