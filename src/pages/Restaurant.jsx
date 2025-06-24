import { useParams, useNavigate } from 'react-router-dom';
import { restaurants, generateFakeRoute } from '../utils/mockData';
import { useCart } from '../Context/CartContext';
import { useOrder } from '../Context/OrderContext';
import { useState } from 'react';

// Helper to generate a random point near a given location
function randomNearbyLocation(center, radius = 0.036) {
  const randomAngle = Math.random() * Math.PI * 2;
  const randomRadius = Math.random() * radius;
  const offsetLat = randomRadius * Math.cos(randomAngle);
  const offsetLng = randomRadius * Math.sin(randomAngle);
  return {
    lat: center.lat + offsetLat,
    lng: center.lng + offsetLng
  };
}

export default function Restaurant() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const { addToCart, getCartSummary, updateQuantity, removeFromCart, clearCart } = useCart();
  const cart = getCartSummary(id);
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!restaurant) {
    return <div className="pt-28 pb-16 text-center">Restaurant not found.</div>;
  }

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) return;
    setPlacing(true);
    // Generate a unique orderId
    const orderId = 'order' + Date.now();
    // Prepare order items in the format: { name, quantity, price }
    const orderItems = cart.items.map(({ item, quantity }) => ({
      name: item.name,
      quantity,
      price: item.price
    }));
    // Create order object
    const orderedAt = new Date();
    const randomMinutes = Math.floor(Math.random() * 6) + 10; // 10-15 min
    const deliveryLocation = randomNearbyLocation(restaurant.location, 0.036); // random point within ~4km
    const order = {
      id: orderId,
      restaurant,
      items: orderItems,
      status: 'ordered',
      orderedAt,
      estimatedDelivery: new Date(orderedAt.getTime() + randomMinutes * 60000), // 10-15 min from now
      deliveryAddress: {
        location: deliveryLocation
      },
      driverName: 'Not assigned',
      driverPhone: '',
      driverPhoto: '',
      total: cart.total,
      route: generateFakeRoute(restaurant.location, deliveryLocation),
      paymentMethod: paymentMethod === 'upi' ? 'upi' : 'cod'
    };
    // Add order to context
    addOrder(order);
    clearCart();
    setTimeout(() => {
      setPlacing(false);
      navigate(`/track/${orderId}`);
    }, 800);
  };

  return (
    <div className="pt-28 pb-16 container-custom">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <img src={restaurant.image} alt={restaurant.name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
          <div>
            <h1 className="text-3xl font-bold mb-1">{restaurant.name}</h1>
            <div className="text-gray-600 text-sm mb-1">{restaurant.cuisine} • {restaurant.priceRange}</div>
            <div className="flex items-center text-yellow-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {restaurant.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Menu */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurant.menu.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary-500">₹{item.price.toFixed(2)}</span>
                  <button
                    className="btn-primary px-4 py-1 text-sm"
                    onClick={() => addToCart(restaurant.id, item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart & Bill */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.items.length === 0 ? (
            <div className="text-gray-500 text-center">Cart is empty.</div>
          ) : (
            <>
              <ul className="mb-4 divide-y divide-gray-100">
                {cart.items.map(({ item, quantity }) => (
                  <li key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">₹{item.price.toFixed(2)} x {quantity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(restaurant.id, item.id, quantity - 1)}>-</button>
                      <span>{quantity}</span>
                      <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => updateQuantity(restaurant.id, item.id, quantity + 1)}>+</button>
                      <button className="ml-2 text-red-500" onClick={() => removeFromCart(restaurant.id, item.id)} title="Remove">×</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span>₹{cart.tax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>₹{cart.delivery.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{cart.total.toFixed(2)}</span></div>
              </div>
              <button className="btn-secondary w-full mt-4" onClick={clearCart}>Clear Cart</button>
              {/* Payment Method Selection */}
              <div className="mt-4">
                <label className="block font-medium mb-1">Payment Method</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-method"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-primary-500"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-method"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-primary-500"
                    />
                    <span>UPI</span>
                  </label>
                </div>
              </div>
              <button className="btn-primary w-full mt-2" disabled={placing} onClick={handlePlaceOrder}>
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 