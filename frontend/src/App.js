import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Posts from './pages/posts';
import CreatePost from './pages/createpost';
import Post from './pages/post';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <Link className="navbar-brand" to="/">Quase Twitter</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Posts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createpost">Criar Post</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">Cadastro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
