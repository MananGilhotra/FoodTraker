import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrder } from "../Context/OrderContext"
import { getCurrentDriverLocation } from '../utils/mockData'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const mapContainerStyle = { width: '100%', height: '400px' }
const defaultZoom = 13

function getMapCenter(order) {
  if (!order) return { lat: 40.7128, lng: -74.0060 }
  // Center between restaurant and delivery address
  const { lat: lat1, lng: lng1 } = order.restaurant.location
  const { lat: lat2, lng: lng2 } = order.deliveryAddress.location
  return {
    lat: (lat1 + lat2) / 2,
    lng: (lng1 + lng2) / 2
  }
}

const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})
const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})
const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

function OrderTracking() {
  const { orderId } = useParams()
  const { getOrder, trackOrder, updateOrderStatus } = useOrder()
  const [activeOrder, setActiveOrder] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [deliveryProgress, setDeliveryProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [routePolyline, setRoutePolyline] = useState(null)
  
  const timeIntervalRef = useRef(null)
  const locationIntervalRef = useRef(null)
  
  useEffect(() => {
    const order = trackOrder(orderId)
    setActiveOrder(order)
    
    document.title = `Tracking Order #${orderId.slice(-4)} - FoodTracker`
    
    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current)
      if (locationIntervalRef.current) clearInterval(locationIntervalRef.current)
    }
  }, [orderId, trackOrder])
  
  useEffect(() => {
    timeIntervalRef.current = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current)
    }
  }, [])
  
  // Update driver location every 3 seconds
  useEffect(() => {
    if (activeOrder) {
      const updateLocation = () => {
        setDriverLocation(getCurrentDriverLocation(activeOrder))
      }
      
      updateLocation() 
      locationIntervalRef.current = setInterval(updateLocation, 3000)
      
      return () => {
        if (locationIntervalRef.current) clearInterval(locationIntervalRef.current)
      }
    }
  }, [activeOrder])
  
  useEffect(() => {
    if (activeOrder) {
      const orderTime = new Date(activeOrder.orderedAt).getTime()
      const estimatedTime = new Date(activeOrder.estimatedDelivery).getTime()
      const currentTimeMs = currentTime.getTime()
      const totalDuration = estimatedTime - orderTime
      const elapsed = currentTimeMs - orderTime
      
      let progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
      
      if (activeOrder.status === 'delivered') {
        progress = 100
      }
      
      setDeliveryProgress(progress)
      
      if (progress > 75 && activeOrder.status === 'preparing') {
        updateOrderStatus(activeOrder.id, 'on-the-way')
      } else if (progress >= 100 && activeOrder.status === 'on-the-way') {
        updateOrderStatus(activeOrder.id, 'delivered')
      }
    }
  }, [activeOrder, currentTime, updateOrderStatus])
  
  useEffect(() => {
    async function fetchRoute() {
      if (!activeOrder) return;
      const start = activeOrder.restaurant.location;
      const end = activeOrder.deliveryAddress.location;
      const apiKey = import.meta.env.VITE_ORS_API_KEY;
      if (!apiKey) return;
      try {
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.features && data.features[0]) {
          const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRoutePolyline(coords);
        }
      } catch (e) {
        setRoutePolyline(null);
      }
    }
    fetchRoute();
  }, [activeOrder]);
  
  const getFormattedTime = () => {
    if (!activeOrder) return '--'
    if (activeOrder.status === 'delivered') return 'Delivered'
    // If routePolyline exists, estimate time based on length (1 min per km, rough)
    if (routePolyline && routePolyline.length > 1) {
      let totalDistance = 0;
      for (let i = 1; i < routePolyline.length; i++) {
        const [lat1, lng1] = routePolyline[i - 1];
        const [lat2, lng2] = routePolyline[i];
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        totalDistance += R * c;
      }
      // Assume 1 min per km, min 15 min
      const etaMin = Math.max(Math.round(totalDistance), 15);
      // If already delivered, show Delivered
      if (activeOrder.status === 'delivered') return 'Delivered';
      // If on-the-way or preparing, show remaining time
      const orderTime = new Date(activeOrder.orderedAt).getTime();
      const now = Date.now();
      const elapsedMin = Math.floor((now - orderTime) / 60000);
      const remaining = Math.max(etaMin - elapsedMin, 0);
      return remaining === 0 ? 'Arriving soon' : `${remaining} min`;
    }
    // Fallback: use estimatedDelivery
    const estimatedTime = new Date(activeOrder.estimatedDelivery).getTime()
    const currentTimeMs = currentTime.getTime()
    const remainingMs = Math.max(estimatedTime - currentTimeMs, 0)
    const minutes = Math.floor(remainingMs / 60000)
    return minutes === 0 ? 'Arriving soon' : `${minutes} min`
  }
  
  if (!activeOrder) {
    return (
      <div className="pt-28 pb-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find an order with ID: {orderId}</p>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    )
  }
  const steps = [
    { id: 'ordered', label: 'Order Received' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'on-the-way', label: 'On the Way' },
    { id: 'delivered', label: 'Delivered' }
  ]
  
  const currentStepIndex = steps.findIndex(step => step.id === activeOrder.status)
  
  return (
    <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center space-x-1 text-sm font-medium"
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Back to Home</span>
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Progress, Driver, Summary */}
          <div className="lg:col-span-1 space-y-8">
            {/* Order Progress */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Order Progress</h2>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-xl font-bold">Order #{orderId.slice(-4)}</h1>
                  <p className="text-gray-500 text-xs">{new Date(activeOrder.orderedAt).toLocaleString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeOrder.status === 'delivered' ? 'bg-success-500 text-white' :
                  activeOrder.status === 'on-the-way' ? 'bg-primary-500 text-white' :
                  activeOrder.status === 'preparing' ? 'bg-warning-500 text-white' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {steps.find(step => step.id === activeOrder.status)?.label}
                </div>
              </div>
              {/* Stepper */}
              <div className="mb-4">
                <div className="relative flex justify-between items-center">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                        idx <= currentStepIndex ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {idx < currentStepIndex ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${idx <= currentStepIndex ? 'text-primary-500' : 'text-gray-400'}`}>{step.label}</span>
                    </div>
                  ))}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 z-0" style={{ transform: 'translateY(-50%)' }}></div>
                  <div className="absolute top-1/2 left-0 h-1 bg-primary-500 z-0 transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, transform: 'translateY(-50%)' }}></div>
                </div>
              </div>
              {/* ETA */}
              <div className="text-center mt-4">
                <div className="text-xs text-gray-500 mb-1">Estimated Delivery</div>
                <div className="text-2xl font-bold text-primary-500">{getFormattedTime()}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {activeOrder.status === 'delivered' ? 'Delivered!' : activeOrder.status === 'on-the-way' ? 'Your food is on the way' : 'Being prepared'}
                </div>
              </div>
            </section>
            {/* Driver Info */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Delivery Driver</h2>
              {activeOrder.status === 'on-the-way' && activeOrder.driverName && activeOrder.driverName !== 'Not assigned' ? (
                <div className="flex items-center gap-4">
                  <img src={activeOrder.driverPhoto || 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'} alt={activeOrder.driverName} className="w-14 h-14 object-cover rounded-full border-2 border-primary-500" />
                  <div>
                    <h4 className="font-bold">{activeOrder.driverName}</h4>
                    <div className="text-xs text-gray-500">3 years experience</div>
                    <div className="flex gap-2 mt-2">
                      <a href={`tel:${activeOrder.driverPhone}`} className="btn-secondary px-3 py-1 text-xs">Call</a>
                      <button className="btn-outline px-3 py-1 text-xs">Text</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Driver not assigned yet.</div>
              )}
            </section>
            {/* Order Summary */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <ul className="space-y-2 mb-4">
                {activeOrder.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-100 pt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{(activeOrder.total - 5.99 - 125).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Delivery Fee</span><span>₹5.99</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>₹125</span></div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-100"><span>Total</span><span>₹{activeOrder.total.toFixed(2)}</span></div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-1">Delivery Address</div>
                <p className="text-gray-600 text-xs">{activeOrder.deliveryAddress.address}</p>
              </div>
            </section>
          </div>
          {/* Right: Map */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <h2 className="text-lg font-bold p-6 pb-0">Live Delivery Map</h2>
              <div className="h-[400px] w-full">
                <MapContainer
                  center={getMapCenter(activeOrder)}
                  zoom={defaultZoom}
                  style={mapContainerStyle}
                  scrollWheelZoom={false}
                  dragging={true}
                  doubleClickZoom={false}
                  attributionControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  />
                  {/* Restaurant Marker */}
                  <Marker position={activeOrder.restaurant.location} icon={restaurantIcon}>
                    <Popup>Restaurant: {activeOrder.restaurant.name}</Popup>
                  </Marker>
                  {/* Delivery Address Marker */}
                  <Marker position={activeOrder.deliveryAddress.location} icon={deliveryIcon}>
                    <Popup>Delivery Address</Popup>
                  </Marker>
                  {/* Driver Marker (animated) */}
                  {driverLocation && (
                    <Marker position={driverLocation} icon={driverIcon}>
                      <Popup>Driver</Popup>
                    </Marker>
                  )}
                  {/* Full route polyline (blue) */}
                  {routePolyline && (
                    <Polyline positions={routePolyline} pathOptions={{ color: '#2563eb', weight: 5 }} />
                  )}
                  {/* Fallback: straight line if no routePolyline */}
                  {!routePolyline && (
                    <Polyline
                      positions={[
                        [activeOrder.restaurant.location.lat, activeOrder.restaurant.location.lng],
                        [activeOrder.deliveryAddress.location.lat, activeOrder.deliveryAddress.location.lng]
                      ]}
                      pathOptions={{ color: '#2563eb', weight: 5, dashArray: '8,8' }}
                    />
                  )}
                  {/* Polyline from driver to delivery address (cyan) */}
                  {driverLocation && (
                    <Polyline
                      positions={[
                        [driverLocation.lat, driverLocation.lng],
                        [activeOrder.deliveryAddress.location.lat, activeOrder.deliveryAddress.location.lng]
                      ]}
                      pathOptions={{ color: '#22D3EE', weight: 5, dashArray: '8,8' }}
                    />
                  )}
                </MapContainer>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking