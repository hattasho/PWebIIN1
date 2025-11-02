const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');

// criar um novo post
router.post('/', async (req, res) => {
  try {
    const { title, text, user } = req.body;

    if (!title || !text || !user) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'ID do usuário inválido' });
    }

    const newPost = new Post({ title, text, user });
    await newPost.save();

    await newPost.populate('user', 'username');

    res.status(201).json({ message: 'Post criado com sucesso', post: newPost });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// listar todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// obter post por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID do post inválido' });
    }

    const post = await Post.findById(id).populate('user', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    res.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
