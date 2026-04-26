import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { fmtPrice, showToast } from '../utils';

export default function ProductCard({ product }) {
  const categories = useStore(state => state.categories);
  const addToCart = useStore(state => state.addToCart);
  
  const cat = categories.find(c => c.id === product.category);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    showToast('Добавлено в корзину', 'success');
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-img">
        <img src={product.images?.[0] || '/images/sofa.png'} alt={product.name} loading="lazy" />
        {cat && <span className="product-card-badge">{cat.name}</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-title">{product.name}</div>
        <div className="product-card-cat">{cat ? `${cat.icon} ${cat.name}` : ''}</div>
        <div className="product-card-footer">
          <div className="product-card-price">{fmtPrice(product.price)}</div>
          <button className="product-card-btn" onClick={handleAddToCart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
