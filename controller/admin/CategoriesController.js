const Category = require("../../model/Category");
const fs = require("fs");
const path = require("path");

module.exports = {
  viewCategories: async (req, res) => {
    const categories = await Category.find();
    return res.render("admin/categories/view_categories", {
      title: "Categories",
      categories,
      user: req.session.user,
    });
  },
  addCategories: async (req, res) => {
    try {
      const data = req.body;

      if (req.file) {
        await Category.create({
          ...data,
          image_url: `images/${req.file.filename}`,
        });
        return res.redirect("/admin/categories");
      }
      await Category.create(data);
      return res.redirect("/admin/categories");
    } catch (error) {
      return res.redirect("/admin/categories");
    }
  },
  editCategories: async (req, res) => {
    try {
      const { id, title, price } = req.body;
      const getCategory = await Category.findOne({ _id: id });
      if (req.file == undefined) {
        getCategory.title = title;
        getCategory.price = price;
        await getCategory.save();

        return res.redirect("/admin/categories");
      }

      await fs.unlinkSync(path.join(`public/${getCategory.image_url}`));
      getCategory.title = title;
      getCategory.price = price;
      getCategory.image_url = `images/${req.file.filename}`;

      await getCategory.save();
      return res.redirect("/admin/categories");
    } catch (error) {
      return res.redirect("/admin/categories");
    }
  },

  deleteCategories: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOneAndDelete({ _id: id });
      const imagePath = `./public/${category.image_url}`;
      if (fs.existsSync) {
        fs.unlinkSync(imagePath);
      }

      return res.redirect("/admin/categories");
    } catch (error) {
      console.log(error);
      return res.redirect("/admin/categories");
    }
  },
};
