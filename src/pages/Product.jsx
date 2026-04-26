import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { fmtPrice, showToast } from '../utils';

export default function Product() {
  const { id } = useParams();
  const product = useStore(state => state.products.find(p => p.id === id));
  const categories = useStore(state => state.categories);
  const addToCart = useStore(state => state.addToCart);
  
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="empty-state" style={{ paddingTop: '140px' }}>
        <h3>Товар не найден</h3>
        <p><Link to="/" style={{ color: 'var(--gold)' }}>← Вернуться на главную</Link></p>
      </div>
    );
  }

  const cat = categories.find(c => c.id === product.category);
  const images = product.images?.length > 0 ? product.images : ['/images/sofa.png'];

  const handleAddToCart = () => {
    addToCart(product.id);
    showToast('Добавлено в корзину', 'success');
  };

  const whatsappLink = `https://wa.me/996556393033?text=${encodeURIComponent('Здравствуйте! Хочу заказать: ' + product.name + ' — ' + fmtPrice(product.price))}`;
  const telegramLink = `https://t.me/abdulaziz_01_01?text=${encodeURIComponent('Здравствуйте! Хочу заказать: ' + product.name + ' — ' + fmtPrice(product.price))}`;

  return (
    <>
      <div className="back-link">
        <Link to="/" style={{ color: 'var(--txt2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Назад к каталогу
        </Link>
      </div>
      
      <div className="product-detail">
        <div className="product-detail-grid">
          
          <div className="product-gallery">
            <div className="main-image">
              <img src={images[activeImg]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((img, i) => (
                  <div 
                    key={i} 
                    className={`thumbnail ${activeImg === i ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`Preview ${i}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            {cat && <div className="product-category">{cat.icon} {cat.name}</div>}
            <h1>{product.name}</h1>
            <div className="product-price-tag">{fmtPrice(product.price)}</div>
            <p className="product-description">{product.description || 'Описание товара'}</p>
            <div className="product-specs">
              {product.materials && <div className="spec-item"><div className="spec-label">Материал</div><div className="spec-value">{product.materials}</div></div>}
              {product.dimensions && <div className="spec-item"><div className="spec-label">Размеры</div><div className="spec-value">{product.dimensions}</div></div>}
              <div className="spec-item"><div className="spec-label">Наличие</div><div className="spec-value" style={{ color: '#25D366' }}>✓ В наличии</div></div>
              <div className="spec-item"><div className="spec-label">Доставка</div><div className="spec-value">По г. Ош</div></div>
            </div>
            
            <div className="product-actions">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Добавить в корзину
              </button>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                Заказать через WhatsApp
              </a>
              <a href={telegramLink} target="_blank" rel="noreferrer" className="btn btn-telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Заказать через Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
