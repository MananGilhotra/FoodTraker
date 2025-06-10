import { createContext, useState, useContext } from 'react'
import { mockOrders, generateFakeRoute } from '../utils/mockData'

const OrderContext = createContext()

export function useOrder() {
  return useContext(OrderContext)
}

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState(mockOrders)
  const [activeOrder, setActiveOrder] = useState(null)
  
  const getOrder = (orderId) => {
    const order = orders.find(order => order.id === orderId)
    if (order && !order.route) {
      order.route = generateFakeRoute(order.restaurant.location, order.deliveryAddress.location)
    }
    return order
  }

  const trackOrder = (orderId) => {
    const order = getOrder(orderId)
    setActiveOrder(order)
    return order
  }
  
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => ({ ...prev, status: newStatus }))
    }
  }

  const value = {
    orders,
    activeOrder,
    getOrder,
    trackOrder,
    updateOrderStatus
  }
  
  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}