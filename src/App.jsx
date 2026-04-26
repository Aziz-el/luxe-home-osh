import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useStore } from './store/useStore';

// Protected Route Component for Admin
const ProtectedRoute = ({ children }) => {
  const isAdminAuth = useStore(state => state.isAdminAuth);
  if (!isAdminAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const initProducts = useStore(state => state.initProducts);

  React.useEffect(() => {
    initProducts();
  }, [initProducts]);

  return (
    <>
      <Header />
      <main id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Cart />
    </>
  );
}
