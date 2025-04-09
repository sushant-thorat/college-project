import { pool } from "../config/db.js";

export const createMyPayment = async (payment) => {
  try {
    const query = `INSERT INTO payment (user_id, property_id, amount_paid, payment_method, payment_details, status) VALUES (?, ?, ?, ?, ?, ?);`;
    const values = [
      payment.user_id,
      payment.property_id,
      payment.amount_paid,
      payment.payment_method,
      JSON.stringify(payment.payment_details),
      payment.status,
    ];

    await pool.execute(query, values);
    return { success: true, message: "Payment successful" };
  } catch (error) {
    console.error("Error adding payment: ", error);
    return {
      success: false,
      message: "Failed to add payment",
    };
  }
};
