const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");
const Discount = require("../../models/discount");
const User = require("../../models/user");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select(
      "_id name price quantity slug description productPictures category sale reviews"
    )
    .populate({ path: "category", select: "_id name" })
    .populate({ path: "reviews.userId", select: "_id firstName lastName" })
    .exec();
  const orders = await Order.find({})
    .populate("items.productId")
    .populate({
      path: "user",
      select: "_id firstName lastName",
    })
    .exec();
  const discounts = await Discount.find({}).exec();
  const users = await User.find({}).exec();
  res.status(200).json({
    categories: createCategories(categories),
    products,
    orders,
    discounts,
    users,
  });
};
