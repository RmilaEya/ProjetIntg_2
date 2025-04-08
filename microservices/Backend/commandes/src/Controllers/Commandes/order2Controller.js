const axios = require("axios");
const Order2 = require("../../Models/CommandesModels/order2"); // Correctement utiliser Order2

const CATALOGUE_SERVICE_URL = "http://localhost:5002/products";

const createOrder2 = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const response = await axios.get(`${CATALOGUE_SERVICE_URL}/${productId}`);
    const product = response.data;

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    const total = product.price * quantity;

    const newOrder = new Order2({  // Utilisation correcte de Order2
      productId,
      productName: product.name,
      productPrice: product.price,
      quantity,
      total
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erreur lors de la création de la commande", error);
    res.status(500).json({ error: "Erreur lors de la création de la commande" });
  }
};

module.exports = { createOrder2 };
