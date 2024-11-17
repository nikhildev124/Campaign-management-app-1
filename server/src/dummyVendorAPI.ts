import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/dummyVendorAPI/batch", (req, res) => {
  const messages = req.body.messages;
  console.log("Received batch messages:", messages);
  res.status(200).send("Batch processed successfully");
});

app.listen(3002, () => {
  console.log("Dummy Vendor API is running on port 3002");
});
