import paymentModel from "../models/paymentModel.js";
import { createMyPayment } from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  try {
    const {
      user_id,
      property_id,
      amount_paid,
      payment_method,
      payment_details,
      status,
    } = req.body;

    if (
      !user_id ||
      !property_id ||
      !amount_paid ||
      !payment_method ||
      !payment_details ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All payment fields are required",
      });
    }

    const newPayment = new paymentModel({
      user_id,
      property_id,
      amount_paid,
      payment_method,
      payment_details,
      status,
    });

    const result = await createMyPayment(newPayment);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while processing payment",
    });
  }
};
