import { create } from 'zustand';
import { get, set } from 'idb-keyval';

const KEYS = {
  PRODUCTS: 'lh_products',
  CATEGORIES: 'lh_categories',
  CART: 'lh_cart'
};

const DEFAULT_CATEGORIES = [
  { id: 'sofas', name: 'Диваны', icon: '🛋️' },
  { id: 'chairs', name: 'Кресла', icon: '💺' },
  { id: 'tables', name: 'Столы', icon: '🪑' },
  { id: 'beds', name: 'Кровати', icon: '🛏️' }
];

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Диван Elegance Premium',
    category: 'sofas',
    price: 85000,
    description: 'Роскошный диван с бежевой велюровой обивкой и золотыми ножками. Идеальное сочетание комфорта и стиля для вашей гостиной.',
    materials: 'Велюр, металл, поролон',
    dimensions: '220×90×85 см',
    images: ['/images/sofa.png']
  },
  {
    id: '2',
    name: 'Кресло Royal Comfort',
    category: 'chairs',
    price: 45000,
    description: 'Элегантное кресло с изящными изгибами и мягкой обивкой кремового цвета. Станет украшением любого интерьера.',
    materials: 'Ткань, дерево, металл',
    dimensions: '75×80×85 см',
    images: ['/images/armchair.png']
  },
  {
    id: '3',
    name: 'Стол Marble Gold',
    category: 'tables',
    price: 65000,
    description: 'Обеденный стол с мраморной столешницей и золотыми ножками. Воплощение современной роскоши.',
    materials: 'Мрамор, металл',
    dimensions: '180×90×76 см',
    images: ['/images/table.png']
  },
  {
    id: '4',
    name: 'Кровать Luxe Dream',
    category: 'beds',
    price: 120000,
    description: 'Королевская кровать с мягким изголовьем и золотым каркасом. Подарит незабываемый сон каждую ночь.',
    materials: 'Экокожа, металл, дерево',
    dimensions: '200×180×120 см',
    images: ['/images/bed.png']
  }
];

function loadLocal(key, fallback) {
  try {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d) : fallback;
  } catch { return fallback; }
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const useStore = create((setZustand, getZustand) => ({
  categories: loadLocal(KEYS.CATEGORIES, DEFAULT_CATEGORIES),
  products: [], // Loaded async
  cart: loadLocal(KEYS.CART, []),
  isAdminAuth: sessionStorage.getItem('isAdminAuth') === 'true',
  isProductsLoaded: false,

  initProducts: async () => {
    try {
      const storedProducts = await get(KEYS.PRODUCTS);
      if (storedProducts && storedProducts.length > 0) {
        setZustand({ products: storedProducts, isProductsLoaded: true });
      } else {
        await set(KEYS.PRODUCTS, DEFAULT_PRODUCTS);
        setZustand({ products: DEFAULT_PRODUCTS, isProductsLoaded: true });
      }
    } catch (e) {
      console.error("Failed to load products from IndexedDB", e);
      setZustand({ products: DEFAULT_PRODUCTS, isProductsLoaded: true });
    }
  },

  // Categories
  addCategory: (name, icon = '📦') => {
    const id = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();
    const newCat = { id, name, icon };
    setZustand((state) => {
      const updated = [...state.categories, newCat];
      saveLocal(KEYS.CATEGORIES, updated);
      return { categories: updated };
    });
  },
  removeCategory: (id) => {
    setZustand((state) => {
      const updated = state.categories.filter(c => c.id !== id);
      saveLocal(KEYS.CATEGORIES, updated);
      return { categories: updated };
    });
  },

  // Products
  addProduct: async (product) => {
    product.id = Date.now().toString();
    const updated = [...getZustand().products, product];
    await set(KEYS.PRODUCTS, updated);
    setZustand({ products: updated });
  },
  deleteProduct: async (id) => {
    const updated = getZustand().products.filter(p => p.id !== id);
    await set(KEYS.PRODUCTS, updated);
    setZustand({ products: updated });
  },

  // Cart
  addToCart: (productId) => {
    setZustand((state) => {
      const existing = state.cart.find(i => i.productId === productId);
      let updated;
      if (existing) {
        updated = state.cart.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i);
      } else {
        updated = [...state.cart, { productId, qty: 1 }];
      }
      saveLocal(KEYS.CART, updated);
      return { cart: updated };
    });
  },
  updateCartQty: (productId, qty) => {
    setZustand((state) => {
      let updated;
      if (qty <= 0) {
        updated = state.cart.filter(i => i.productId !== productId);
      } else {
        updated = state.cart.map(i => i.productId === productId ? { ...i, qty } : i);
      }
      saveLocal(KEYS.CART, updated);
      return { cart: updated };
    });
  },
  getCartCount: () => {
    return getZustand().cart.reduce((sum, item) => sum + item.qty, 0);
  },

  // Auth
  setAdminAuth: (status) => {
    sessionStorage.setItem('isAdminAuth', status ? 'true' : 'false');
    setZustand({ isAdminAuth: status });
  }
}));
