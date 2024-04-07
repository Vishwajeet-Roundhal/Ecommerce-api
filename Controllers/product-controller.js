const EProduct = require("../models/productSchema");
const Order = require("../models/orderSchema");

const createProduct = async (req, res) => {
  try {
    const data = await EProduct.create(req.body);
    console.log(data);
    return res.status(200).json({ msg: "data sent sucessfully" });
  } catch (error) {
    return res.status(500).json({ error: "error sending products" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await EProduct.find(); // Retrieve all products from the database
    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id; // Extract product ID from request parameters
    console.log(id);
    const product = await EProduct.find({ _id: id }); // Find product by ID in the database
    console.log(product);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatedProd = req.body;
    console.log(updatedProd);
    const result = await EProduct.updateOne(
      { _id: id },
      {
        $set: updatedProd,
      }
    );
    if (!result) {
      return res.status(404).json({ msg: "update failed" });
    }
    return res.status(200).json({ msg: "updated" });
  } catch (error) {
    return res.status(500).json({ error: "error in update" });
  }
};

const handleBuy = async (req, res) => {
  try {
    // Extract the entire cart object from the request body
    const { cart } = req.body;

    let totalAmount = 0;
    cart.map((item) => {
      totalAmount += item.price * item.amount;
    });

    const newOrder = await Order.create({
      orderDetails: cart,
      totalAmount,
    });

    res.status(201).json(newOrder); // Send response with newly created order
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    
    const orders = await Order.find().sort("date");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "order server error" });
  }
};

const updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  console.log(status);
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updatedOrder) {
    return res.status(404).json({ msg: "No order found for this ID" });
  } else {
    res.json(updatedOrder);
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const singleOrder = await Order.find({
      "orderDetails.userId": req.params.id,
    });
    console.log(singleOrder);
    if (!singleOrder) {
      return res.status(404).json({ msg: "no order found" });
    }
    res.status(200).json(singleOrder);
  } catch (error) {
    res.status(500).json({ error: "internal server at order" });
  }
};

const deletOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.deleteOne({ _id: id });
    if (!deletedOrder) {
      res.status(401).json({ msg: "there is no order" });
    }
    res.status(200).json({ msg: "order deleted" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

const deleteSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProd = await EProduct.deleteOne({ _id: id });
    if (!deletedProd) {
      res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const category = await EProduct.distinct("category");
    if (!category) {
      res.status(404).json({ msg: "no category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).msg({ error: "internal server error" });
  }
};

const getSingleCategory = async (req, res) => {
  const category = req.params.category;
  try {
    let prod;
    if (!category) {
      prod = await EProduct.find();
    } else {
      prod = await EProduct.find({ category: category });
    }
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

const deleteOrderByAdmin = async (req,res) => {
  try {
    const id = req.params.id;
    const order = await Order.deleteOne({_id : id});
    if(!order){
      res.status(404).json({msg:"order not found"})
    }
    res.status(200).json({msg:"order deleted"})
  } catch (error) {
    res.status(500).json({error:"internal server error"})
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  handleBuy,
  getAllOrder,
  updateStatus,
  getSingleOrder,
  deletOrderById,
  deleteSingleProduct,
  getCategories,
  getSingleCategory,
  deleteOrderByAdmin
};
