const Photo = require("../../model/Photo");

module.exports = {
  Photos: async (req, res) => {
    try {
      const photos = await Photo.find().sort({ createdAt: "asc" });

      return res.json({
        status: "success",
        photos,
      });
    } catch (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  },
};
