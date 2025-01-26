const asyncHandler = require("express-async-handler");
const categoryModel = require("../models/categoryModel");

// create new category by  admin
module.exports.createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const user = req.user.id;
  const category = await categoryModel.findOne({ title });
  if (category) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const newCategory = await categoryModel.create({ user, title });
  res.status(201).json({ message: "Category created", newCategory });
});

//  get all categories
module.exports.getAllCategory = asyncHandler(async (req, res) => {
  const categories = await categoryModel
    .find({})
    .populate("user")
    .sort("-createdAt");
  if (!categories) {
    res.status(404);
    throw new Error("Categories not found");
  }
  res.json({ success: true, data: categories });
});

//   get catgory by id
module.exports.getCategroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel
    .findById(id)
    .populate("user")
    .sort("-createdAt");
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.json({ success: true, data: category });
});

// update category
module.exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {title} = req.body;
  const category = await categoryModel.findByIdAndUpdate(
    id,
    {
      title: title,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res
    .status(200)
    .json({ message: "Category Updated", success: true, data: category });
});

module.exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
    res.status(404);
    throw new Error("Category not found");
    }
    res.status(200).json({ message: "Category deleted", success: true });

});


