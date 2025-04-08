const Cart = require("../../Models/CommandesModels/cartModel");
const CartItem = require("../../Models/CommandesModels/cartItemModel");
const Order = require('../../Models/CommandesModels/orderModel'); 





// // Fonction pour récupérer toutes les commandes
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('userId', 'name email') 
//       .populate('carts.cartId') 
//       .exec();

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
//   }
// };









// Fonction pour créer une commande
exports.createOrder = async (req, res) => {
  try {
    const { carts } = req.body; // Extraire les données du corps de la requête
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis le token

    // Vérification des données fournies
    if (!Array.isArray(carts) || carts.length === 0) {
      return res.status(400).json({ error: "Les informations sont incomplètes." });
    }

    // (1) Vérification si les paniers référencés existent
    const cartIds = carts.map((item) => item.cartId); // Extraire les ID des paniers
    const foundCarts = await Cart.find({ _id: { $in: cartIds } });

    if (foundCarts.length !== carts.length) {
      return res.status(404).json({ error: "Un ou plusieurs paniers n'ont pas été trouvés." });
    }

    // (2) Création de la commande
    const order = new Order({
      userId, // Utilisateur authentifié
      carts: carts.map((cart) => ({
        cartId: cart.cartId,
        quantity: cart.quantity || 1, // Quantité par défaut : 1
      })),
    });

    // Sauvegarder la commande dans la base de données
    const savedOrder = await order.save();

    // (3) Réponse avec la commande créée
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};


// Récupérer les commandes d'un utilisateur
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis le token

    // Rechercher toutes les commandes associées à l'utilisateur
    const orders = await Order.find({ userId })
      .populate("carts.cartId", "name price") // Récupérer les détails des paniers (nom, prix)
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des commandes." });
  }
};




// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Enrichir avec les détails utilisateur
      .populate("carts.cartId", "name price") // Enrichir avec les détails des articles
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Aucune commande trouvée." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des commandes." });
  }
};


