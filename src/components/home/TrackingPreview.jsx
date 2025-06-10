import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockOrders, getCurrentDriverLocation } from '../../utils/mockData'

function TrackingPreview() {
  const [activeOrder] = useState(mockOrders[1]) 
  const [deliveryProgress, setDeliveryProgress] = useState(0)

  useEffect(() => {
    if (activeOrder) {
      const orderTime = new Date(activeOrder.orderedAt).getTime()
      const estimatedTime = new Date(activeOrder.estimatedDelivery).getTime()
      const currentTime = Date.now()
      const totalDuration = estimatedTime - orderTime
      const elapsed = currentTime - orderTime
      
      let progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
      
      if (activeOrder.status === 'delivered') {
        progress = 100
      }
      
      setDeliveryProgress(progress)
      
      const interval = setInterval(() => {
        getCurrentDriverLocation(activeOrder)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [activeOrder])
  
  const getFormattedTime = () => {
    if (!activeOrder) return '--'
    
    const estimatedTime = new Date(activeOrder.estimatedDelivery).getTime()
    const currentTime = Date.now()
    const remainingMs = estimatedTime - currentTime
    
    if (activeOrder.status === 'delivered' || remainingMs <= 0) {
      return 'Delivered'
    }
    
    const minutes = Math.floor(remainingMs / 60000)
    return `${minutes} min`
  }
  const getStatusLabel = (status) => {
    switch (status) {
      case 'ordered': return 'Order Received'
      case 'preparing': return 'Preparing'
      case 'on-the-way': return 'On the Way'
      case 'delivered': return 'Delivered'
      default: return 'Unknown'
    }
  }
  
  return (
    <section className="py-16 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Tracking <span className="text-gradient">Demo</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our real-time tracking works. Watch as your delivery driver navigates through the city, with live updates on your order status.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Order Details</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeOrder.status === 'delivered' ? 'bg-success-500 text-white' :
                  activeOrder.status === 'on-the-way' ? 'bg-primary-500 text-white' :
                  activeOrder.status === 'preparing' ? 'bg-warning-500 text-white' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {getStatusLabel(activeOrder.status)}
                </span>
              </div>
              
              <div className="flex items-center mb-5">
                <img 
                  src={activeOrder.restaurant.image} 
                  alt={activeOrder.restaurant.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h4 className="font-medium">{activeOrder.restaurant.name}</h4>
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
              
              <div className="border-t border-gray-100 pt-4 mb-4">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <ul className="space-y-2 mb-4">
                  {activeOrder.items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${activeOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium mb-2">Delivery Info</h4>
                <div className="text-sm space-y-2">
                  <p className="flex items-start">
                    <svg className="w-4 h-4 text-gray-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{activeOrder.deliveryAddress.address}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Estimated arrival: {getFormattedTime()}</span>
                  </p>
                </div>
              </div>
              
              {activeOrder.status === 'on-the-way' && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <img 
                      src={activeOrder.driverPhoto} 
                      alt={activeOrder.driverName}
                      className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-primary-500"
                    />
                    <div>
                      <p className="font-medium">{activeOrder.driverName}</p>
                      <p className="text-xs text-gray-500">Your delivery driver</p>
                    </div>
                  </div>
                  <a href={`tel:${activeOrder.driverPhone}`} className="btn-secondary w-full text-center mt-2 text-sm py-2">
                    <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Call Driver
                  </a>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2 p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500">Order Progress</div>
                    <div className="text-xs text-gray-500">{Math.round(deliveryProgress)}%</div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${deliveryProgress}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500">
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden h-72 md:h-96 bg-gray-100 shadow-inner">
                <div className="h-full bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute transform -translate-x-16 -translate-y-20">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute transform translate-x-24 translate-y-16">
                        <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute transform -translate-x-4 translate-y-2">
                        <div className="relative">
                          <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                            </svg>
                          </div>
                          <div className="absolute inset-0 rounded-full pulse-ring"></div>
                        </div>
                      </div>
                      
                      <svg width="150" height="150" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <path 
                          d="M25,40 Q50,60 60,80 T110,100" 
                          stroke="#FF7E1D" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeDasharray="5,5"
                          fill="none" 
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">This is a simulated map view.</p>
                      <Link to="/track/order2" className="btn-primary inline-flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                        See Full Tracking
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackingPreview