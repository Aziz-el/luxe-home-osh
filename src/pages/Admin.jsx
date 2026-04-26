import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { fmtPrice, showToast } from '../utils';

export default function Admin() {
  const { 
    categories, products, addCategory, removeCategory, addProduct, deleteProduct 
  } = useStore();

  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📦');
  
  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodCat, setProdCat] = useState(categories[0]?.id || '');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDim, setProdDim] = useState('');
  const [prodMat, setProdMat] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const fileInputRef = useRef(null);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return showToast('Введите название', 'error');
    addCategory(newCatName.trim(), newCatIcon.trim() || '📦');
    setNewCatName('');
    showToast('Категория добавлена', 'success');
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxW = 800;
          const scale = Math.min(maxW / img.width, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setUploadedImages(prev => [...prev, dataUrl]);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return showToast('Заполните название и цену', 'error');
    
    await addProduct({
      name: prodName,
      category: prodCat || categories[0]?.id,
      price: parseInt(prodPrice) || 0,
      description: prodDesc,
      materials: prodMat,
      dimensions: prodDim,
      images: uploadedImages.length > 0 ? uploadedImages : ['/images/sofa.png'],
      has3d: false
    });

    setProdName(''); setProdPrice(''); setProdDesc(''); setProdMat(''); setProdDim(''); setUploadedImages([]);
    showToast('Товар добавлен!', 'success');
  };

  return (
    <div className="admin-page">
      <h1>Панель управления</h1>

      <div className="admin-section">
        <h2>📂 Категории</h2>
        <div className="form-group">
          <label>Добавить категорию</label>
          <div className="settings-row">
            <input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="Название категории" />
            <input type="text" value={newCatIcon} onChange={e => setNewCatIcon(e.target.value)} placeholder="Иконка" style={{ maxWidth: '100px' }} />
            <button className="btn btn-primary btn-sm" onClick={handleAddCategory}>Добавить</button>
          </div>
        </div>
        <div className="tag-list">
          {categories.map(c => (
            <span key={c.id} className="tag">{c.icon} {c.name}
              <button onClick={() => removeCategory(c.id)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>➕ Добавить товар</h2>
        <form onSubmit={handleSaveProduct}>
          <div className="form-row">
            <div className="form-group">
              <label>Название</label>
              <input type="text" value={prodName} onChange={e => setProdName(e.target.value)} required placeholder="Название мебели" />
            </div>
            <div className="form-group">
              <label>Категория</label>
              <select value={prodCat} onChange={e => setProdCat(e.target.value)}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Цена (сом)</label>
              <input type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} required placeholder="50000" />
            </div>
            <div className="form-group">
              <label>Размеры</label>
              <input type="text" value={prodDim} onChange={e => setProdDim(e.target.value)} placeholder="200×90×85 см" />
            </div>
          </div>
          <div className="form-group">
            <label>Материалы</label>
            <input type="text" value={prodMat} onChange={e => setProdMat(e.target.value)} placeholder="Велюр, дерево, металл" />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <textarea rows="3" value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="Описание товара..."></textarea>
          </div>
          <div className="form-group">
            <label>Фото товара</label>
            <div 
              className="upload-zone" 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p>Нажмите для выбора фотографий</p>
              <input type="file" ref={fileInputRef} onChange={e => handleFiles(e.target.files)} multiple accept="image/*" style={{ display: 'none' }} />
            </div>
            <div className="upload-previews">
              {uploadedImages.map((img, i) => (
                <div key={i} className="upload-preview">
                  <img src={img} alt="preview" />
                  <button type="button" onClick={() => setUploadedImages(prev => prev.filter((_, idx) => idx !== i))}>&times;</button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Сохранить товар</button>
        </form>
      </div>

      <div className="admin-section">
        <h2>📋 Товары ({products.length})</h2>
        <div className="admin-products-list">
          {products.length === 0 ? <div className="empty-state"><p>Товаров пока нет</p></div> : 
            products.map(p => (
              <div key={p.id} className="admin-product-item">
                <img src={p.images?.[0] || '/images/sofa.png'} alt={p.name} />
                <div className="info">
                  <h4>{p.name}</h4>
                  <p>{fmtPrice(p.price)} • {categories.find(c => c.id === p.category)?.name || 'Без категории'}</p>
                </div>
                <div className="actions">
                  <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Удалить</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
