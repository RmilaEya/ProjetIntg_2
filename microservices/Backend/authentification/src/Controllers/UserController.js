const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const JWT_SECRET = process.env.JWT_SECRET || 'bb88bb44T66';  // Clé secrète JWT


// ********** Register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation des données
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Enregistrement de l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: newUser });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur', error: error.message });
  }
};

// ********** Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérification de la clé secrète JWT
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'La clé secrète JWT n\'est pas définie' });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

// ********** Logout
const logout = (req, res) => {
 
  res.clearCookie('token', { path: '/' }); 
  
  res.status(200).json({ message: 'Déconnexion réussie' });
};






//**************crud user for admin

// ********** Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
  
    try {
      // Vérification de l'utilisateur
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Mise à jour des champs
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;
  
      // Sauvegarde des modifications
      await user.save();
  
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
    }
  };
  
  // ********** Delete User
  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Vérification de l'existence de l'utilisateur
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Suppression de l'utilisateur
      await user.remove();
  
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
  };
  
  // ********** Get All Users
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
  };


// ********** Get User by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Recherche de l'utilisateur par ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
  };


module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  logout

};
