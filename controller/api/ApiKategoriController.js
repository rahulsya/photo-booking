const Category = require("../../model/Category");

module.exports = {
  categories: async (req, res) => {
    try {
      const categories = await Category.find();

      return res.json({
        status: "success",
        categories,
      });
    } catch (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
  },
};
