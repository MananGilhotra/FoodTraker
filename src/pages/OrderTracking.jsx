import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../Context/OrderContext';
import { getCurrentDriverLocation, generateFakeRoute } from '../utils/mockData';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});
const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});
const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapAutoFit({ route, deliveryLoc, restaurantLoc }) {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 1) {
      const bounds = L.latLngBounds([
        ...route.map(p => [p.lat, p.lng]),
        [deliveryLoc.lat, deliveryLoc.lng],
        [restaurantLoc.lat, restaurantLoc.lng],
      ]);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [route, map, deliveryLoc, restaurantLoc]);
  return null;
}

export default function OrderTracking() {
  const { orderId } = useParams();
  const { getOrder, updateOrderStatus } = useOrder();
  const [order, setOrder] = useState(null);
  const [driverLoc, setDriverLoc] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      console.log('OrderTracking: orderId =', orderId);
      const o = getOrder(orderId);
      console.log('OrderTracking: order =', o);
      
      if (!o) {
        setError('Order not found');
        setOrder(null);
      } else {
        
        if (!o.driverName || o.driverName === 'Not assigned') {
          const drivers = ['Raj Kumar', 'Amit Singh', 'Vikram Patel', 'Rajesh Sharma', 'Suresh Verma'];
          const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
          o.driverName = randomDriver;
          o.driverPhone = '+91 ' + Math.floor(Math.random() * 9000000000) + 1000000000;
          o.driverPhoto = 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
        }
        setOrder(o);
      }
      setLoading(false);
    } catch (err) {
      console.error('OrderTracking: Error loading order:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [orderId, getOrder]);

  
  useEffect(() => {
    if (!order) return;

    const checkAndUpdateStatus = () => {
      const now = Date.now();
      const orderTime = new Date(order.orderedAt).getTime();
      const elapsedMinutes = (now - orderTime) / 60000;

      let newStatus = order.status;

      
      if (order.status === 'ordered' && elapsedMinutes >= 1) {
        newStatus = 'preparing';
      } else if (order.status === 'preparing' && elapsedMinutes >= 2) {
        newStatus = 'on-the-way';
      } else if (order.status === 'on-the-way' && elapsedMinutes >= 12) {
        newStatus = 'delivered';
      }

      
      if (newStatus !== order.status) {
        updateOrderStatus(orderId, newStatus);
        setOrder(prev => ({ ...prev, status: newStatus }));
      }
    };

    const interval = setInterval(checkAndUpdateStatus, 30000);
    checkAndUpdateStatus();
    return () => clearInterval(interval);
  }, [order, orderId, updateOrderStatus]);

  
  const calculateRoute = (order) => {
    if (!order) return [];
    
    try {
      const restaurantLoc = order.restaurant.location;
      let deliveryLoc = order.deliveryAddress.location;
      
      
      if (deliveryLoc.lat === restaurantLoc.lat && deliveryLoc.lng === restaurantLoc.lng) {
        deliveryLoc = restaurantLoc;
      }
      
      
      return (order.route && order.route.length > 1)
        ? order.route
        : generateFakeRoute(restaurantLoc, deliveryLoc);
    } catch (err) {
      console.error('Error calculating route:', err);
      return [];
    }
  };

  const route = calculateRoute(order);

  
  useEffect(() => {
    if (!order || !route || route.length < 2) return;
    const updateDriverLoc = () => {
      try {
        const total = new Date(order.estimatedDelivery) - new Date(order.orderedAt);
        const elapsed = Date.now() - new Date(order.orderedAt);
        const prog = Math.min(1, elapsed / total);
        setProgress(prog);
        
        const idx = Math.floor(prog * (route.length - 1));
        const nextIdx = Math.min(idx + 1, route.length - 1);
        const frac = (prog * (route.length - 1)) - idx;
        const p1 = route[idx];
        const p2 = route[nextIdx];
        const lat = p1.lat + (p2.lat - p1.lat) * frac;
        const lng = p1.lng + (p2.lng - p1.lng) * frac;
        setDriverLoc({ lat, lng });
      } catch (err) {
        console.error('Error updating driver location:', err);
      }
    };
    updateDriverLoc();
    const interval = setInterval(updateDriverLoc, 2000);
    return () => clearInterval(interval);
  }, [order, route]);

  useEffect(() => {
    if (!order) return;
    try {
      const total = new Date(order.estimatedDelivery) - new Date(order.orderedAt);
      const elapsed = Date.now() - new Date(order.orderedAt);
      setProgress(Math.min(1, elapsed / total));
      const timer = setInterval(() => {
        const elapsed = Date.now() - new Date(order.orderedAt);
        setProgress(Math.min(1, elapsed / total));
      }, 10000);
      return () => clearInterval(timer);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }, [order]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2 text-red-600">Order not found</h2>
        <p className="text-gray-600 mb-4">{error || 'The order you are looking for does not exist.'}</p>
        <Link to="/" className="text-primary-500 underline">Back to Home</Link>
      </div>
    );
  }

  const steps = [
    { key: 'ordered', label: 'Ordered', icon: '🛒' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'on-the-way', label: 'On the way', icon: '🚗' },
    { key: 'delivered', label: 'Delivered', icon: '✅' },
  ];
  const currentStep = steps.findIndex(s => s.key === order.status);
  const eta = Math.max(0, Math.round((new Date(order.estimatedDelivery) - Date.now()) / 60000));

  
  const orderTime = new Date(order.orderedAt).getTime();
  const elapsedMinutes = Math.floor((Date.now() - orderTime) / 60000);

  
  const restaurantLoc = order.restaurant.location;
  
  let deliveryLoc = order.deliveryAddress.location;
  if (deliveryLoc.lat === restaurantLoc.lat && deliveryLoc.lng === restaurantLoc.lng) {
    deliveryLoc = restaurantLoc;
  }

  
  let expectedWindow = '';
  if (order) {
    const totalMin = Math.round((new Date(order.estimatedDelivery) - new Date(order.orderedAt)) / 60000);
    
    if (totalMin >= 10 && totalMin <= 15) {
      expectedWindow = 'Expected delivery: 10-15 min';
    } else {
      expectedWindow = `Expected delivery: ${totalMin} min`;
    }
  }

  console.log('OrderTracking: Rendering with order =', order);
  console.log('OrderTracking: route =', route);
  
  return (
    <div className="w-full min-h-[80vh] flex justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 min-w-[350px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-green-600">Track your order</h1>
            <Link to="/" className="text-sm text-primary-500 underline">Back to Home</Link>
        </div>
        
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800 text-center">
              <span className="font-semibold">Time elapsed:</span> {Math.floor((Date.now() - new Date(order.orderedAt).getTime()) / 60000)} minutes
                  </div>
            <div className="text-xs text-blue-600 text-center mt-1">
              Order placed at {new Date(order.orderedAt).toLocaleTimeString()}
                  </div>
                </div>
              
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              ></div>
                    </div>
            <div className="text-xs text-gray-500 mt-1 text-center">
              {eta > 0 ? `${eta} minutes remaining` : 'Almost there!'}
                  </div>
                </div>
                
          
                  <div className="relative">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, i) => (
                <div key={step.key} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold mb-2 border-4 transition-all duration-300 ${
                    i < currentStep 
                      ? 'bg-green-500 text-white border-green-500 shadow-lg' 
                      : i === currentStep 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-lg animate-pulse' 
                      : 'bg-gray-100 text-gray-400 border-gray-300'
                  }`}>
                    {step.icon}
                          </div>
                  <span className={`text-sm font-medium text-center ${i <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                  {i < steps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-1 transition-all duration-500 ${
                      i < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`} style={{ transform: 'translateX(50%)' }}></div>
                  )}
                        </div>
                      ))}
                    </div>
                  </div>
          
          
          <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-lg font-semibold text-blue-800">
              Current Status: {steps[currentStep]?.label}
                </div>
            <div className="text-sm text-blue-600 mt-1">
              {steps[currentStep]?.icon} {steps[currentStep]?.label}
                  </div>
                </div>
                
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-w-[220px]">
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow relative">
                {route.length > 1 && (
                  <MapContainer
                    className="w-full h-full"
                    style={{ height: '100%', width: '100%', minHeight: 256, borderRadius: '0.75rem' }}
                    scrollWheelZoom={false}
                    dragging={true}
                    zoomControl={true}
                    doubleClickZoom={false}
                    attributionControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <MapAutoFit route={route} deliveryLoc={deliveryLoc} restaurantLoc={restaurantLoc} />
                    {/* Route polyline */}
                    <Polyline positions={route.map(p => [p.lat, p.lng])} color="#22c55e" weight={5} />
                    {/* Restaurant marker */}
                    <Marker position={[restaurantLoc.lat, restaurantLoc.lng]} icon={restaurantIcon}>
                      <Popup>Restaurant</Popup>
                    </Marker>
                    {/* Delivery marker */}
                    <Marker position={[deliveryLoc.lat, deliveryLoc.lng]} icon={deliveryIcon}>
                      <Popup>Delivery</Popup>
                    </Marker>
                    {/* Driver marker (only if driverLoc is available) */}
                    {driverLoc && (
                      <Marker position={[driverLoc.lat, driverLoc.lng]} icon={driverIcon}>
                        <Popup>Driver</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                )}
                {!route.length && <span className="z-10 text-gray-400 font-semibold absolute inset-0 flex items-center justify-center">Live Map</span>}
              </div>
              
              <div className="flex justify-center gap-6 mt-3 text-xs text-gray-600">
                <div className="flex items-center gap-1"><img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Restaurant" className="w-5 h-5" /> Restaurant</div>
                <div className="flex items-center gap-1"><img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" alt="Driver" className="w-5 h-5" /> Driver</div>
                <div className="flex items-center gap-1"><img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Delivery" className="w-5 h-5" /> Delivery</div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Restaurant</span>
                <span>Delivery</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <div className="flex items-center gap-2">
                <img src={order.restaurant.image} alt="restaurant" className="w-12 h-12 rounded-full object-cover border shadow" />
                      <div>
                  <div className="font-semibold text-gray-800 text-lg">{order.restaurant.name}</div>
                  <div className="text-xs text-gray-500">{order.restaurant.cuisine} • {order.restaurant.priceRange}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{order.deliveryAddress.address}</div>
              <div className="flex items-center gap-2 mt-2">
                <img src={order.driverPhoto || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'} alt="driver" className="w-10 h-10 rounded-full object-cover border shadow" />
                <div>
                  <div className="text-base font-semibold text-gray-700">{order.driverName || 'Not assigned'}</div>
                  <div className="text-xs text-gray-500">{order.driverPhone ? order.driverPhone.replace(/[^0-9]/g, '').slice(-10) : 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            {expectedWindow && (
              <div className="text-xs text-gray-500 mb-1">{expectedWindow}</div>
            )}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Estimated delivery</span>
              <span className="text-xs font-semibold text-green-600">{eta > 0 ? `${eta} min` : 'Arriving soon'}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress * 100}%` }}></div>
                    </div>
                  </div>
                </div>
        
        <div className="w-full md:w-[350px] lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <div className="font-semibold text-gray-800 mb-2 text-lg">Order Summary</div>
            <ul className="mb-2">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-base text-gray-700 mb-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-2 text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (8%)</span><span>₹{((order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)) * 0.08).toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹2.99</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{order.total.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 border-t pt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-700">Payment Method:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                  {order.paymentMethod === 'upi' ? (
                    <>
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path></svg>
                      UPI
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"></path></svg>
                      Cash on Delivery
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}