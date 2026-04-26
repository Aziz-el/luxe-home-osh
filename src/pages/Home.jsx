import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const categories = useStore(state => state.categories);
  const products = useStore(state => state.products);
  const [activeCat, setActiveCat] = useState('all');

  const filteredProducts = activeCat === 'all' 
    ? products 
    : products.filter(p => p.category === activeCat);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">Furniture & Interior</div>
          <h1>Мебель вашей <span>мечты</span></h1>
          <p className="hero-tagline">Where luxury lives</p>
          <p>Премиальная мебель для вашего уюта. Создаём комфорт и роскошь в каждом доме.</p>
          <div className="hero-buttons">
            <a href="#catalog" className="btn btn-primary">Смотреть каталог</a>
            <a href="#contact" className="btn btn-outline">Связаться с нами</a>
          </div>
        </div>
        <div className="hero-decor">
          <span>Листайте вниз</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      <section className="section" id="catalog">
        <div className="section-header">
          <div className="section-label">Каталог</div>
          <h2>Наша коллекция</h2>
          <p>Выберите категорию или просмотрите все товары</p>
        </div>
        <div className="categories">
          <button 
            className={`cat-btn ${activeCat === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCat('all')}
          >
            Все
          </button>
          {categories.map(c => (
            <button 
              key={c.id}
              className={`cat-btn ${activeCat === c.id ? 'active' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="empty-state">
              <h3>Нет товаров в этой категории</h3>
            </div>
          )}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-text">
          <div className="section-label">О нас</div>
          <h2>Luxe Home Osh</h2>
          <p>Мы создаём пространства, в которых хочется жить. Наша мебель сочетает в себе современный дизайн, премиальные материалы и безупречное качество.</p>
          <p>Мы ценим каждого клиента и предлагаем индивидуальный подход к выбору мебели для вашего интерьера.</p>
          <div className="about-stats">
            <div className="stat"><div className="stat-num">500+</div><div>Довольных клиентов</div></div>
            <div className="stat"><div className="stat-num">10+</div><div>Лет опыта</div></div>
            <div className="stat"><div className="stat-num">24/7</div><div>Поддержка</div></div>
          </div>
        </div>
        <div className="about-image" style={{ background: 'linear-gradient(135deg,var(--bg2),var(--gold-l))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontFamily: 'var(--font-h)', fontSize: '3rem', fontWeight: 700, color: 'var(--gold)' }}>L<span style={{ color: 'var(--gold-d)' }}>H</span></div>
            <div style={{ fontFamily: 'var(--font-s)', fontSize: '1.5rem', color: 'var(--gold)', marginTop: '8px' }}>Where luxury lives</div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-label">Контакты</div>
        <h2>Свяжитесь с нами</h2>
        <p style={{ color: 'var(--txt2)', marginTop: '8px' }}>Мы всегда на связи в WhatsApp и Telegram</p>
        <div className="contact-cards">
          <a href="https://wa.me/996556393033" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-card-icon wa">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div><h4>WhatsApp</h4><p>+996 556 393 033</p></div>
          </a>
          <a href="https://t.me/abdulaziz_01_01" target="_blank" rel="noreferrer" className="contact-card">
            <div className="contact-card-icon tg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </div>
            <div><h4>Telegram</h4><p>@abdulaziz_01_01</p></div>
          </a>
        </div>
      </section>
    </>
  );
}
