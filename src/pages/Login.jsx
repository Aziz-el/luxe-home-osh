import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { showToast } from '../utils';
export default function Login() {
  const [password1, setPassword] = useState('');
  const setAdminAuth = useStore(state => state.setAdminAuth);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password1 === import.meta.env.VITE_PASSWORD) {
      setAdminAuth(true);
      showToast('Успешный вход', 'success');
      navigate('/admin');
    } else {
      showToast('Неверный пароль', 'error');
    }
  };

  return (
    <div className="admin-page" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="admin-section">
        <h2 style={{ textAlign: 'center', borderBottom: 'none' }}>Вход в админ-панель</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password1}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Войти</button>
        </form>
      </div>
    </div>
  );
}
