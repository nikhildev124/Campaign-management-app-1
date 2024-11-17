import mongoose from "mongoose";

const CommunicationLogSchema = new mongoose.Schema({
  custName: String,
  custEmail: String,
  status: String,
});

const CommunicationLog = mongoose.model(
  "CommunicationLog",
  CommunicationLogSchema,
);

export default CommunicationLog;
