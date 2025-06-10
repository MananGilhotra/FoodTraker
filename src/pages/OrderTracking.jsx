import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrder } from "../Context/OrderContext"
import { getCurrentDriverLocation } from '../utils/mockData'

function OrderTracking() {
  const { orderId } = useParams()
  const { getOrder, trackOrder, updateOrderStatus } = useOrder()
  const [activeOrder, setActiveOrder] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [deliveryProgress, setDeliveryProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const timeIntervalRef = useRef(null)
  const locationIntervalRef = useRef(null)
  
  useEffect(() => {
    const order = trackOrder(orderId)
    setActiveOrder(order)
    
    document.title = `Tracking Order #${orderId.slice(-4)} - FoodKhoj`
    
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
  
  const getFormattedTime = () => {
    if (!activeOrder) return '--'
    
    const estimatedTime = new Date(activeOrder.estimatedDelivery).getTime()
    const currentTimeMs = currentTime.getTime()
    const remainingMs = estimatedTime - currentTimeMs
    
    if (activeOrder.status === 'delivered' || remainingMs <= 0) {
      return 'Delivered'
    }
    
    const minutes = Math.floor(remainingMs / 60000)
    const seconds = Math.floor((remainingMs % 60000) / 1000)
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
    <div className="pt-28 pb-16">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/" className="text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">Order #{orderId.slice(-4)}</h1>
                    <p className="text-gray-500 text-sm">
                      {new Date(activeOrder.orderedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeOrder.status === 'delivered' ? 'bg-success-500 text-white' :
                    activeOrder.status === 'on-the-way' ? 'bg-primary-500 text-white' :
                    activeOrder.status === 'preparing' ? 'bg-warning-500 text-white' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {steps.find(step => step.id === activeOrder.status)?.label}
                  </div>
                </div>
              
                <div className="flex items-center mb-6">
                  <img 
                    src={activeOrder.restaurant.image} 
                    alt={activeOrder.restaurant.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{activeOrder.restaurant.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        {activeOrder.restaurant.rating}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{activeOrder.restaurant.cuisine}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute top-5 left-4 right-4 h-0.5 bg-gray-200"></div>
                    <div 
                      className="absolute top-5 left-4 h-0.5 bg-primary-500 transition-all duration-500"
                      style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    ></div>
                    
                    <div className="relative flex justify-between">
                      {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                            index <= currentStepIndex 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {index < currentStepIndex ? (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            ) : (
                              <span className="text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          <span className={`text-xs mt-2 font-medium ${
                            index <= currentStepIndex ? 'text-primary-500' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">Estimated Delivery</div>
                  <div className="text-3xl font-bold text-primary-500">{getFormattedTime()}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {activeOrder.status === 'delivered' 
                      ? 'Delivered!' 
                      : activeOrder.status === 'on-the-way'
                        ? 'Your food is on the way'
                        : 'Being prepared'}
                  </div>
                </div>
                
                {activeOrder.status === 'on-the-way' && (
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-medium mb-3">Your Delivery Driver</h3>
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <img 
                          src={activeOrder.driverPhoto} 
                          alt={activeOrder.driverName}
                          className="w-14 h-14 object-cover rounded-full mr-4 border-2 border-primary-500"
                        />
                        <div className="absolute bottom-0 right-3 w-4 h-4 bg-success-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h4 className="font-bold">{activeOrder.driverName}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            4.9
                          </span>
                          <span className="mx-2">•</span>
                          <span>3 years experience</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={`tel:${activeOrder.driverPhone}`} 
                        className="btn-secondary flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        Call
                      </a>
                      <button className="btn-outline flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Text
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                
                <ul className="space-y-3 mb-4">
                  {activeOrder.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                      </div>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${(activeOrder.total - 5.99).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span>79Rupees</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>125Rupees</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${activeOrder.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-sm font-medium mb-2">Delivery Address</div>
                  <p className="text-gray-600 text-sm">
                    {activeOrder.deliveryAddress.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px]">
              <div className="h-full bg-secondary-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute transform -translate-x-32 -translate-y-40">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                          {activeOrder.restaurant.name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="absolute transform translate-x-40 translate-y-40">
                      <div className="relative">
                        <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                          </svg>
                        </div>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                          Your Location
                        </span>
                      </div>
                    </div>
                    
                    <div className="absolute" style={{ 
                      transform: `translate(${-20 + deliveryProgress * 0.6}px, ${-20 + deliveryProgress * 0.8}px)` 
                    }}>
                      <div className="relative">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                          </svg>
                        </div>
                        <div className="absolute inset-0 rounded-full pulse-ring"></div>
                        {activeOrder.status === 'on-the-way' && (
                          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                            {activeOrder.driverName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <svg width="300" height="300" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <path 
                        d="M0,0 Q60,70 150,150 T300,300" 
                        stroke="#FF7E1D" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeDasharray="5,5"
                        fill="none" 
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Live Tracking</h3>
                      <p className="text-sm text-gray-600">
                        {activeOrder.status === 'delivered'
                          ? 'Your order has been delivered!'
                          : activeOrder.status === 'on-the-way'
                            ? `${activeOrder.driverName} is on the way with your food`
                            : `${activeOrder.restaurant.name} is preparing your order`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    This is a simulated map view for demonstration purposes.This would connect to the Google Maps API for real-time tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking