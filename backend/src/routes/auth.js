const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Criar usuário (cadastro)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // validação simples
    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    // verifica se já existe usuário
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
