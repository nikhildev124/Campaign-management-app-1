import express from "express";
import amqp from "amqplib";
import axios from "axios";
import mongoose, { Document, Model } from "mongoose";
import { Connection } from "./database/db";
import CommunicationLog from "./model/campaign-shema";

// Define an interface for the CommunicationLog document
interface ICommunicationLog extends Document {
  _id: string; // Add _id property
  custName: string;
  custEmail: string;
  status: "PENDING" | "SENT" | "FAILED";
}

// Define an interface for the CommunicationLog model
interface ICommunicationLogModel extends Model<ICommunicationLog> {}

// Define an interface for the customer object
interface Customer {
  custName: string;
  custEmail: string;
}

const RABBITMQ_URL =
  process.env.RABBITMQ_URL ||
  "amqps://lbgyymhn:SV9-imIoV_108rlH_nLajN9pwQ-DSFml@rattlesnake.rmq.cloudamqp.com/lbgyymhn";
const QUEUE = "campaignQueue";

Connection();

async function connectRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);

  // Constants for batch processing
  const BATCH_SIZE = 2; // Number of messages to process in each batch
  const BATCH_INTERVAL = 1000; // Interval in milliseconds to wait before processing a batch

  // Buffer to hold incoming messages
  let messageBuffer: amqp.Message[] = [];

  // Function to process a batch of messages
  async function processBatch() {
    try {
      const batch = messageBuffer.splice(0, BATCH_SIZE);
      if (batch.length === 0) return; // No messages to process

      // Process each message in the batch
      for (const msg of batch) {
        const customer: Customer = JSON.parse(msg.content.toString());
        const CommunicationLog: ICommunicationLogModel = mongoose.model<
          ICommunicationLog,
          ICommunicationLogModel
        >("CommunicationLog");
        const log = new CommunicationLog({
          custName: customer.custName,
          custEmail: customer.custEmail,
          status: "PENDING",
        });
        await log.save();
      }

      // Dummy vendor API call for the entire batch
      await axios.post("http://localhost:3002/dummyVendorAPI/batch", {
        messages: batch.map((msg) => JSON.parse(msg.content.toString())),
      });

      // Generate random status for the entire batch
      const statuses: ("SENT" | "FAILED")[] = batch.map(() =>
        Math.random() < 0.9 ? "SENT" : "FAILED",
      );

      // Update delivery receipt for each message in the batch
      for (let i = 0; i < batch.length; i++) {
        const logId = (await CommunicationLog.findOne().sort({ _id: -1 }))!._id; // Get the latest _id
        await axios.post("http://localhost:3003/deliveryReceipt", {
          logId,
          status: statuses[i],
        });
      }
    } catch (error) {
      console.error("Error processing batch", error);
    }
  }

  // Start processing batches at intervals
  setInterval(processBatch, BATCH_INTERVAL);

  channel.consume(QUEUE, async (msg: amqp.Message | null) => {
    if (msg !== null) {
      // Add message to the buffer
      messageBuffer.push(msg);

      // If buffer reaches batch size, process the batch immediately
      if (messageBuffer.length >= BATCH_SIZE) {
        await processBatch();
      }

      // Acknowledge message
      channel.ack(msg);
    }
  });
}

connectRabbitMQ()
  .then(() => {
    console.log("RabbitMQ consumer connected");
  })
  .catch((err) => {
    console.error("Failed to connect to RabbitMQ", err);
  });
