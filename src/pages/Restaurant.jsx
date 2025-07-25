import { useParams, useNavigate } from 'react-router-dom';
import { restaurants, generateFakeRoute } from '../utils/mockData';
import { useCart } from '../Context/CartContext';
import { useOrder } from '../Context/OrderContext';
import { useState } from 'react';


function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        resolve({
          lat: 28.6139,
          lng: 77.2090
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

function haversineDistance(loc1, loc2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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
    
    try {
      
      const deliveryLocation = await getCurrentLocation();
      
      const distanceKm = haversineDistance(restaurant.location, deliveryLocation);
      
      const basePrepMin = 10;
      const deliverySpeedKmh = 50;
      const travelMin = (distanceKm / deliverySpeedKmh) * 60;
      const totalMin = Math.round(basePrepMin + Math.max(5, Math.min(travelMin, 60)));

      const orderId = 'order' + Date.now();

      const orderItems = cart.items.map(({ item, quantity }) => ({
        name: item.name,
        quantity,
        price: item.price
      }));

      const orderedAt = new Date();
      const order = {
        id: orderId,
        restaurant,
        items: orderItems,
        status: 'ordered',
        orderedAt,
        estimatedDelivery: new Date(orderedAt.getTime() + totalMin * 60000),
        deliveryAddress: {
          location: deliveryLocation,
          address: `Your current location (${deliveryLocation.lat.toFixed(4)}, ${deliveryLocation.lng.toFixed(4)})`
        },
        driverName: 'Not assigned',
        driverPhone: '',
        driverPhoto: '',
        total: cart.total,
        route: generateFakeRoute(restaurant.location, deliveryLocation),
        paymentMethod: paymentMethod === 'upi' ? 'upi' : 'cod'
      };
      
      addOrder(order);
      clearCart();
      setTimeout(() => {
        setPlacing(false);
        navigate(`/track/${orderId}`);
      }, 800);
    } catch (error) {
      console.error('Error placing order:', error);
      setPlacing(false);
      alert('Unable to get your location. Please ensure location permissions are enabled.');
    }
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