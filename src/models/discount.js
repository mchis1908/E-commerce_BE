const mongoose = require("mongoose");

// Tạo lược đồ CSDL product
const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
