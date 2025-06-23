import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../Context/OrderContext';
import { getCurrentDriverLocation, generateFakeRoute } from '../utils/mockData';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icons
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

export default function OrderTracking() {
  const { orderId } = useParams();
  const { getOrder } = useOrder();
  const [order, setOrder] = useState(null);
  const [driverLoc, setDriverLoc] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const o = getOrder(orderId);
    setOrder(o);
    if (o) setDriverLoc(getCurrentDriverLocation(o));
    let interval;
    if (o && o.status === 'on-the-way' && o.route) {
      interval = setInterval(() => {
        setDriverLoc(getCurrentDriverLocation({ ...o, orderedAt: o.orderedAt, estimatedDelivery: o.estimatedDelivery, status: o.status, route: o.route }));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [orderId, getOrder]);

  useEffect(() => {
    if (!order) return;
    const total = new Date(order.estimatedDelivery) - new Date(order.orderedAt);
    const elapsed = Date.now() - new Date(order.orderedAt);
    setProgress(Math.min(1, elapsed / total));
    const timer = setInterval(() => {
      const elapsed = Date.now() - new Date(order.orderedAt);
      setProgress(Math.min(1, elapsed / total));
    }, 10000);
    return () => clearInterval(timer);
  }, [order]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Order not found</h2>
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

  // Map points
  const restaurantLoc = order.restaurant.location;
  // If delivery location is the same as restaurant, use a random nearby location for map display only
  let deliveryLoc = order.deliveryAddress.location;
  if (deliveryLoc.lat === restaurantLoc.lat && deliveryLoc.lng === restaurantLoc.lng) {
    deliveryLoc = randomNearbyLocation(restaurantLoc, 0.036); // ~4km
  }
  // Always generate a route for the map between restaurant and delivery location
  const route = (order.route && order.route.length > 1)
    ? order.route
    : generateFakeRoute(restaurantLoc, deliveryLoc);

  // Calculate the original expected delivery window (10-15 min)
  let expectedWindow = '';
  if (order) {
    const totalMin = Math.round((new Date(order.estimatedDelivery) - new Date(order.orderedAt)) / 60000);
    // If it's between 10 and 15, show as a window, else show the actual
    if (totalMin >= 10 && totalMin <= 15) {
      expectedWindow = 'Expected delivery: 10-15 min';
    } else {
      expectedWindow = `Expected delivery: ${totalMin} min`;
    }
  }

  return (
    <div className="w-full min-h-[80vh] flex justify-center bg-gray-50 py-8 px-2">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Left: Map & Status */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 min-w-[350px]">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-green-600">Track your order</h1>
            <Link to="/" className="text-sm text-primary-500 underline">Back to Home</Link>
          </div>
          {/* Status Timeline */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl font-bold mb-1 border-2 ${i <= currentStep ? 'bg-green-500 text-white border-green-500' : 'bg-gray-100 text-gray-400 border-gray-300'}`}>{step.icon}</div>
                <span className={`text-xs ${i <= currentStep ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>{step.label}</span>
                {i < steps.length - 1 && <div className={`h-1 w-full bg-gradient-to-r ${i < currentStep ? 'from-green-500 to-green-500' : 'from-gray-300 to-gray-300'} mt-2`}></div>}
              </div>
            ))}
          </div>
          {/* Map and Info */}
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
              {/* Map Legend */}
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
                  <div className="text-xs text-gray-500">{order.driverPhone || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Progress Bar and ETA */}
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
        {/* Right: Order Summary (sticky on desktop) */}
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
            <div className="flex justify-between font-bold text-gray-800 border-t pt-2 text-lg">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 