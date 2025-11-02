import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
        alert('Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Carregando posts...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>Todos os Posts</h2>

      <div style={{ marginBottom: 20 }}>
        <Link to="/createpost">+ Criar novo post</Link>
      </div>

      {posts.length === 0 ? (
        <p>Nenhum post ainda.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: '1px solid #ccc',
              padding: 15,
              marginBottom: 15,
              borderRadius: 10,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h4>
              <Link
                to={`/post/${post._id}`}
                style={{ textDecoration: 'none', color: '#0d6efd' }}
              >
                {post.title}
              </Link>
            </h4>
            <p>{post.text}</p>
            <small style={{ color: '#555' }}>Autor: {post.user.username}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
