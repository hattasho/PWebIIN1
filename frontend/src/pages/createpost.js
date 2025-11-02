import React, { useState } from 'react';
import api, { defaultUserId } from '../services/api';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !text) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await api.post('/posts', {
        title,
        text,
        user: defaultUserId, // usa o ID padrão importado do api.js
      });
      alert('Post criado com sucesso!');
      setTitle('');
      setText('');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar post');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="text-center mb-4">Criar Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Texto"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={5}
          ></textarea>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
