const Compare = require("../models/compare");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Compare.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((resul) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCompare = (req, res) => {
  Compare.findOne({ user: req.user._id }).exec((error, compare) => {
    if (error) return res.status(400).json({ error });
    if (compare) {
      //if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.compareItems.forEach((compareItem) => {
        const product = compareItem.product;
        const item = compare.compareItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "compareItems.product": product };
          update = {
            $set: {
              "compareItems.$": compareItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              compareItems: compareItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
        //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
        // .exec((error, _cart) => {
        //     if(error) return res.status(400).json({ error });
        //     if(_cart){
        //         //return res.status(201).json({ cart: _cart });
        //         updateCount++;
        //     }
        // })
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart not exist then create a new cart
      const compare = new Compare({
        user: req.user._id,
        compareItems: req.body.compareItems,
      });
      compare.save((error, compare) => {
        if (error) return res.status(400).json({ error });
        if (compare) {
          return res.status(201).json({ compare });
        }
      });
    }
  });
};

exports.getCompareItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Compare.findOne({ user: req.user._id })
    .populate(
      "compareItems.product",
      "_id name slug price productPictures description"
    )
    .exec((error, compare) => {
      if (error) {
        console.log("ERRRROORORO: ", error);
        return res.status(400).json({ error });
      }
      if (compare) {
        let compareItems = {};
        compare.compareItems.forEach((item, index) => {
          compareItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            description: item.product.description,
            slug: item.product.slug,
            qty: item.quantity,
          };
        });
        res.status(200).json({ compareItems });
      }
    });
  //}
};

exports.removeCompareItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Compare.updateOne(
      { user: req.user._id },
      {
        $pull: {
          compareItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
