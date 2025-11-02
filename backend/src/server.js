require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectDB = require('./config/db');

// rotas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const app = express();

// conectar ao banco
connectDB();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentRoutes); // <-- garante que /api/comments/post/:postId funcione

// rota de saúde
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

// lidar com rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
