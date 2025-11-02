import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { defaultUserId } from '../services/api';

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRes = await api.get(`/posts/${id}`);
        setPost(postRes.data);
        const commentsRes = await api.get(`/comments/post/${id}`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Erro ao carregar post:', err);
        alert('Erro ao carregar post');
      }
    };
    fetchPostData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) {
      alert('Escreva um comentário!');
      return;
    }

    try {
      // envia o comentário usando postId
      await api.post('/comments', {
        text: commentText,
        postId: id,           // <-- campo correto
        user: defaultUserId,
      });

      setCommentText('');
      const commentsRes = await api.get(`/comments/post/${id}`);
      setComments(commentsRes.data);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar comentário');
    }
  };

  if (!post) return <p>Carregando post...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: 700 }}>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <small className="text-muted">Autor: {post.user?.username}</small>

      <hr />

      <h5>Comentários ({comments.length})</h5>
      {comments.length === 0 ? (
        <p>Nenhum comentário ainda.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            className="border rounded p-2 mb-2"
            style={{ background: '#f9f9f9' }}
          >
            <p>{c.text}</p>
            <small className="text-muted">Por: {c.user?.username}</small>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          className="form-control mb-2"
          placeholder="Escreva um comentário..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
        ></textarea>
        <button className="btn btn-success w-100" type="submit">
          Comentar
        </button>
      </form>
    </div>
  );
}

export default Post;
