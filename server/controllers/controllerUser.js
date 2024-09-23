const User = require('../models/modelUser');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      message: "Erreur lors de la création de l'utilisateur.",
      error: err,
    });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({ message: "Accès accordé", user });
    } else {
      res.status(401).json({ message: "Mot de passe incorrect" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la vérification de l'utilisateur.",
      error: err,
    });
  }
};
