const Discount = require("../models/discount");

exports.createDiscount = (req, res) => {
  const { name, percent, createdBy, endDate } = req.body;
  const discount = new Discount({
    name: name,
    percent: percent,
    createdBy: createdBy,
    endDate: endDate,
  });
  discount.save((error, discount) => {
    if (error) return res.status(400).json({ error });
    if (discount) {
      res.status(201).json({ discount });
    }
  });
};

exports.getDiscountByName = (req, res) => {
  Discount.findOne({
    name: req.body.name,
  }).exec((error, discounts) => {
    if (error) return res.status(400).json({ error });
    if (discounts) {
      res.status(200).json({ discounts });
    }
  });
};
