const Cart = require("../../Models/CommandesModels/cartModel");
const CartItem = require("../../Models/CommandesModels/cartItemModel");
const authenticateToken = require("../../../../authentification/src/Middleware/auth");

// Créer un panier pour un utilisateur authentifié
exports.createCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id; 

    // Calculer le prix total
    let totalPrice = 0;
    for (const item of items) {
      const cartItem = await CartItem.findById(item.cartItemId);
      if (cartItem) {
        totalPrice += cartItem.price * item.quantity;
      }
    }

    const cart = await Cart.create({ userId, items, totalPrice });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du panier." });
  }
};


// Récupérer le panier de l'utilisateur authentifié
exports.getCartByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Récupère l'ID de l'utilisateur depuis le token
    const cart = await Cart.findOne({ userId }).populate("items.cartItemId");

    if (!cart) {
      return res.status(404).json({ message: "Aucun panier trouvé pour cet utilisateur." });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    res.status(500).json({ error: "Erreur lors de la récupération du panier." });
  }
};

// Middleware pour vérifier le token JWT
exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ message: 'Token manquant.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }

    req.user = user;  
    next();
  });
};


// // Récupérer tous les paniers pour admin
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("items.cartItemId");
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des paniers." });
  }
};
