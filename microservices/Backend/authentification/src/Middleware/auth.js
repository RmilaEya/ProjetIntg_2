const jwt = require('jsonwebtoken');

// ********** Vérification du token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extraction du token Bearer
  console.log('Token reçu:', token);  // Log du token

  if (!token) {
    console.log('Aucun token fourni');
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  const JWT_SECRET = process.env.JWT_SECRET || 'bb88bb44T66';  // Clé secrète JWT, assure-toi qu'elle est cohérente

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Erreur lors de la vérification du token:', err);  // Log de l'erreur
      return res.status(403).json({ message: 'Token invalide' });
    }

    console.log('Token vérifié avec succès:', user);  // Log de l'utilisateur extrait du token
    req.user = user;
    next();
  });
};

// ********** Vérification du rôle
const authorizeRole = (role) => {
  return (req, res, next) => {
    console.log('Vérification du rôle pour l\'utilisateur:', req.user);  // Log des infos de l'utilisateur

    if (req.user.role !== role) {
      console.log(`Accès interdit, l'utilisateur n'a pas le rôle ${role}`);  // Log du refus d'accès
      return res.status(403).json({ message: 'Accès interdit' });
    }

    console.log('Rôle valide, accès autorisé');
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};

