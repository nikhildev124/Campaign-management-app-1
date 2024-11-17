import Shop from "../model/shop-schema";
import Customer from "../model/customer-schema";
import Order from "../model/order-schema";
import CommunicationLog from "../model/campaign-shema";

export const addShop = async (request: any, response: any) => {
  try {
    const { email, name, description } = request.body;
    const newCampaign = new Shop({ email, name, description });
    const savedCampaign = await newCampaign.save();
    response.status(200).json({
      email: savedCampaign.email,
      name: savedCampaign.name,
      description: savedCampaign.description,
    });
  } catch (error: unknown) {
    console.log("Error", error);
  }
};

export const getCampaignData = async (request: any, response: any) => {
  try {
    const campaignData = await CommunicationLog.find();

    if (campaignData) {
      response.status(200).json(campaignData);
    } else {
      response.status(401).json({ message: "Nothing to log" });
    }
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const getShopData = async (request: any, response: any) => {
  try {
    const { email } = request.body;
    const shopDetails = await Shop.find({ email });
    if (shopDetails) {
      response.status(200).json({ shopDetails });
    } else {
      response.status(401).json({ message: "No shops" });
    }
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const getCustData = async (req: any, res: any) => {
  try {
    const { shopName } = req.body;

    const customers = await Customer.find({ shopName });
    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(401).json({ message: "No Customers" });
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrderData = async (req: any, res: any) => {
  try {
    const { shopName } = req.body;
    const order = await Order.find({ shopName });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(401).json({ message: "No Customers" });
    }
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
