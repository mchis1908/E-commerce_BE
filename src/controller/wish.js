const Wish = require("../models/wish");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Wish.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((resul) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToWish = (req, res) => {
  Wish.findOne({ user: req.user._id }).exec((error, wish) => {
    if (error) return res.status(400).json({ error });
    if (wish) {
      //if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.wishItems.forEach((wishItem) => {
        const product = wishItem.product;
        const item = wish.wishItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "wishItems.product": product };
          update = {
            $set: {
              "wishItems.$": wishItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              wishItems: wishItem,
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
      const wish = new Wish({
        user: req.user._id,
        wishItems: req.body.wishItems,
      });
      wish.save((error, wish) => {
        if (error) return res.status(400).json({ error });
        if (wish) {
          return res.status(201).json({ wish });
        }
      });
    }
  });
};

exports.getWishItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Wish.findOne({ user: req.user._id })
    .populate(
      "wishItems.product",
      "_id name slug price productPictures quantity"
    )
    .exec((error, wish) => {
      if (error) {
        console.log("ERRRROORORO: ", error);
        return res.status(400).json({ error });
      }
      if (wish) {
        let wishItems = {};
        wish.wishItems.forEach((item, index) => {
          wishItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            slug: item.product.slug,
            qty: item.quantity,
          };
        });
        res.status(200).json({ wishItems });
      }
    });
  //}
};

exports.removeWishItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Wish.updateOne(
      { user: req.user._id },
      {
        $pull: {
          wishItems: {
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
