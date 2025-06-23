import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function getInitialCart() {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (restaurantId, item) => {
    setCart(prev => {
      const existing = prev.find(
        c => c.restaurantId === restaurantId && c.item.id === item.id
      );
      if (existing) {
        return prev.map(c =>
          c.restaurantId === restaurantId && c.item.id === item.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      } else {
        return [...prev, { restaurantId, item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (restaurantId, itemId) => {
    setCart(prev => prev.filter(c => !(c.restaurantId === restaurantId && c.item.id === itemId)));
  };

  const updateQuantity = (restaurantId, itemId, quantity) => {
    setCart(prev =>
      prev.map(c =>
        c.restaurantId === restaurantId && c.item.id === itemId
          ? { ...c, quantity }
          : c
      ).filter(c => c.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const getCartForRestaurant = (restaurantId) =>
    cart.filter(c => c.restaurantId === restaurantId);

  const getCartSummary = (restaurantId) => {
    const items = getCartForRestaurant(restaurantId);
    const subtotal = items.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
    const tax = subtotal * 0.08;
    const delivery = subtotal > 0 ? 2.99 : 0;
    const total = subtotal + tax + delivery;
    return { subtotal, tax, delivery, total, items };
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartForRestaurant,
    getCartSummary
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
} 