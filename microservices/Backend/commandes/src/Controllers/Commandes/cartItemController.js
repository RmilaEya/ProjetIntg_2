const axios = require("axios");
const CartItem = require("../../Models/CommandesModels/cartItemModel");

const CATALOGUE_SERVICE_URL = "http://localhost:5002/products"; 






// Ajouter un item au panier
// exports.createCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     if (!productId || !quantity) {
//       return res.status(400).json({ error: "L'ID du produit et la quantité sont requis." });
//     }

//     // Vérifier que le produit existe via le microservice catalogue
//     console.log(`Requête vers ${CATALOGUE_SERVICE_URL}/${productId}`);
//     const response = await axios.get(`${CATALOGUE_SERVICE_URL}/${productId}`);
   

//     console.log("Réponse du catalogue :", response.data);
//     const product = response.data; // Vérifiez si `data.product` est nécessaire

//     if (!product || !product.price) {
//       return res.status(404).json({ error: "Produit introuvable ou prix manquant." });
//     }

//     // Calcul du prix total
//     const totalPrice = product.price * quantity;

//     // Enregistrement dans la base de données
//     const cartItem = await CartItem.create({
//       productId,
//       productName: product.name,
//       price: product.price,
//       quantity,
//       totalPrice
//     });

//     console.log("Produit ajouté au panier :", cartItem);

//     res.status(201).json(cartItem);
//   } catch (error) {
//     console.error("Erreur lors de la création de l'élément du panier :", error.message);
//     res.status(500).json({ error: "Erreur lors de la création de l'élément du panier." });
//   }
// };


// Ajouter un item au panier
exports.createCartItem = async (req, res) => {
  try {
    // Vérifier que l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "L'ID du produit et la quantité sont requis." });
    }

    // Vérifier que le produit existe via le microservice catalogue
    console.log(`Requête vers ${CATALOGUE_SERVICE_URL}/${productId}`);
    const response = await axios.get(`${CATALOGUE_SERVICE_URL}/${productId}`);
    
    console.log("Réponse du catalogue :", response.data);
    const product = response.data;

    if (!product || !product.price) {
      return res.status(404).json({ error: "Produit introuvable ou prix manquant." });
    }

    // Calcul du prix total
    const totalPrice = product.price * quantity;

    // Enregistrement dans la base de données avec l'ID utilisateur
    const cartItem = await CartItem.create({
      productId,
      productName: product.name,
      price: product.price,
      quantity,
      totalPrice,
      userId: req.user.id // Associer l'ID utilisateur au produit dans le panier
    });

    console.log("Produit ajouté au panier :", cartItem);

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Erreur lors de la création de l'élément du panier :", error.message);
    res.status(500).json({ error: "Erreur lors de la création de l'élément du panier." });
  }
};






// Récupérer les items du panier pour l'utilisateur authentifié
exports.getCartItemsForUser = async (req, res) => {
  try {
    // Vérifier que l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    // Récupérer les éléments du panier pour cet utilisateur
    const cartItems = await CartItem.find({ userId: req.user.id });

    if (cartItems.length === 0) {
      return res.status(404).json({ error: "Le panier est vide." });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Erreur lors de la récupération des éléments du panier :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des éléments du panier." });
  }
};


























// Récupérer tous les items
exports.getAllCartItems = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des éléments." });
  }
};
