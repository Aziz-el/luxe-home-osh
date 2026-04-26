import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useStore((state) => state.getCartCount());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCart = () => {
    document.getElementById('cart-sidebar')?.classList.add('open');
    document.getElementById('cart-overlay')?.classList.add('open');
  };

  const isActive = (path) => location.pathname === path || (location.pathname === '/' && location.hash === path);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">L<span>H</span></span>
          <span className="logo-text">Luxe Home</span>
        </Link>
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="/#home" className={`nav-link ${isActive('#home') || location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Главная</a>
          <a href="/#catalog" className={`nav-link ${isActive('#catalog') ? 'active' : ''}`} onClick={closeMenu}>Каталог</a>
          <a href="/#about" className={`nav-link ${isActive('#about') ? 'active' : ''}`} onClick={closeMenu}>О нас</a>
          <a href="/#contact" className={`nav-link ${isActive('#contact') ? 'active' : ''}`} onClick={closeMenu}>Контакты</a>
        </nav>
        <div className="header-actions">
          <button className="cart-btn" onClick={toggleCart} aria-label="Корзина">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Меню">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
