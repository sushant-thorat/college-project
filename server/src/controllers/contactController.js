export const createContact = async (req, res) => {
  try {
  } catch (error) {
    console.error("Contact Error: ", error);
    return res.satus(500).json({ success: false, message: "Server Error" });
  }
};
