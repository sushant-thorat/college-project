import ClientModel from "../models/clientModel.js";
import {
  addClientFeedback,
  getAllClientFeedbacks,
  updateClientFeedback,
  deleteClientFeedback,
} from "../services/clientService.js";

// Add Client Feedback
export const createClientFeedback = async (req, res) => {
  try {
    const { first_name, last_name, feedback, rating, image } = req.body;
    if (!first_name || !last_name || !feedback || !rating || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const clientFeedback = new ClientModel({
      first_name,
      last_name,
      feedback,
      rating,
      image,
    });
    const response = await addClientFeedback(clientFeedback);
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error creating client feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Client Feedbacks
export const fetchClientFeedbacks = async (req, res) => {
  try {
    const response = await getAllClientFeedbacks();
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error fetching client feedbacks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Client Feedback
export const modifyClientFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, feedback, rating, image } = req.body;

    if (!first_name || !last_name || !feedback || !rating || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const response = await updateClientFeedback(id, {
      first_name,
      last_name,
      feedback,
      rating,
      image,
    });
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error updating client feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Client Feedback
export const removeClientFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteClientFeedback(id);
    return res.status(response.success ? 200 : 400).json(response);
  } catch (error) {
    console.error("Error deleting client feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
