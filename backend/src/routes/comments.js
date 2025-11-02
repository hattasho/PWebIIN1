const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const router = express.Router();

// Criar comentário
router.post('/', async (req, res) => {
  try {
    const { text, postId, user } = req.body;

    if (!text || !postId || !user) {
      return res.status(400).json({ message: 'Campos obrigatórios: text, postId e user' });
    }

    if (!mongoose.isValidObjectId(postId) || !mongoose.isValidObjectId(user)) {
      return res.status(400).json({ message: 'postId ou user inválido' });
    }

    const comment = await Comment.create({ text, postId, user });
    // popula username do usuário
    await comment.populate('user', 'username');

    res.status(201).json(comment);
  } catch (err) {
    console.error('Erro ao criar comentário:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Listar comentários de um post
router.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json({ message: 'postId inválido' });
    }

    const comments = await Comment.find({ postId })
      .populate('user', 'username') // popula username do usuário
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error('Erro ao listar comentários:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
