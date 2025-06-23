const generateRandomPoint = (center, radius = 0.01) => {
  const randomAngle = Math.random() * Math.PI * 2 
  const randomRadius = Math.random() * radius 
  
  const offsetLat = randomRadius * Math.cos(randomAngle)
  const offsetLng = randomRadius * Math.sin(randomAngle)
  
  return {
    lat: center.lat + offsetLat,
    lng: center.lng + offsetLng
  }
}

export const generateFakeRoute = (start, end, waypoints = 8) => {
  const route = []
  
  route.push(start)
  for (let i = 1; i <= waypoints; i++) {
    const fraction = i / (waypoints + 1)
    const lat = start.lat + (end.lat - start.lat) * fraction
    const lng = start.lng + (end.lng - start.lng) * fraction
    
    const jitter = 0.0005 * Math.sin(i * Math.PI) 
    
    route.push({
      lat: lat + jitter,
      lng: lng + jitter * 2
    })
  }
  
  route.push(end)
  
  return route
}

export const restaurants = [
  {
    id: 'rest1',
    name: 'Shutup & Eat',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4XRDUz3bnRzqAy_W5ALFyktYofrUzJCFhg&s',
    location: { lat: 40.7128, lng: -74.0060 }, // NYC
    rating: 4.7,
    cuisine: 'Indian',
    priceRange: '$$',
    menu: [
      { id: 'item1', name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry.', price: 15.99, image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/butter-chicken.jpg' },
      { id: 'item2', name: 'Garlic Naan', description: 'Soft Indian bread with garlic.', price: 3.99, image: 'https://www.cookwithmanali.com/wp-content/uploads/2018/05/Garlic-Naan-500x500.jpg' },
      { id: 'item3', name: 'Mango Lassi', description: 'Sweet mango yogurt drink.', price: 4.99, image: 'https://www.cookwithmanali.com/wp-content/uploads/2017/05/Mango-Lassi-500x500.jpg' }
    ]
  },
  {
    id: 'rest2',
    name: 'Burger King',
    image: 'https://i.pinimg.com/736x/70/38/01/703801fc16a7c10fdd7aadec9dc5ab81.jpg',
    location: { lat: 40.7112, lng: -74.0125 },
    rating: 4.5,
    cuisine: 'American',
    priceRange: '$$',
    menu: [
      { id: 'item4', name: 'Double Cheeseburger', description: 'Two beef patties, cheese, and toppings.', price: 8.99, image: 'https://www.burgerking.in/Images/Product/cheese-burger.png' },
      { id: 'item5', name: 'Fries (Large)', description: 'Crispy golden fries.', price: 3.99, image: 'https://www.burgerking.in/Images/Product/fries.png' },
      { id: 'item6', name: 'Chocolate Milkshake', description: 'Rich chocolate shake.', price: 4.99, image: 'https://www.burgerking.in/Images/Product/chocolate-milkshake.png' }
    ]
  },
  {
    id: 'rest3',
    name: 'Billus Kitchen',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXm6nuKcjT7n3JTa_g2JzGtly3mby6uhY_A&s',
    location: { lat: 40.7200, lng: -74.0090 },
    rating: 4.8,
    cuisine: 'Italian',
    priceRange: '$$$',
    menu: [
      { id: 'item7', name: 'Fettuccine Alfredo', description: 'Pasta in creamy Alfredo sauce.', price: 16.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Fettuccine-Alfredo-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' },
      { id: 'item8', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil.', price: 8.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Caprese-Salad-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' },
      { id: 'item9', name: 'Tiramisu', description: 'Classic Italian dessert.', price: 7.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Tiramisu-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' }
    ]
  },
  {
    id: 'rest4',
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7306, lng: -73.9866 },
    rating: 4.6,
    cuisine: 'Japanese',
    priceRange: '$$$',
    menu: [
      { id: 'item10', name: 'Salmon Sushi', description: 'Fresh salmon over rice.', price: 12.99, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
      { id: 'item11', name: 'Miso Soup', description: 'Classic Japanese soup.', price: 3.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'rest5',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1514512364185-4c2b67857b39?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7412, lng: -73.9896 },
    rating: 4.3,
    cuisine: 'Mexican',
    priceRange: '$$',
    menu: [
      { id: 'item12', name: 'Chicken Taco', description: 'Spicy grilled chicken taco.', price: 5.99, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 'item13', name: 'Guacamole', description: 'Fresh avocado dip.', price: 4.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'rest6',
    name: 'Pizza Palace',
    image: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7527, lng: -73.9772 },
    rating: 4.9,
    cuisine: 'Pizza',
    priceRange: '$$',
    menu: [
      { id: 'item14', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 10.99, image: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=400&q=80' },
      { id: 'item15', name: 'Pepperoni Pizza', description: 'Pepperoni and cheese.', price: 12.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'rest7',
    name: 'Vegan Delight',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7589, lng: -73.9851 },
    rating: 4.4,
    cuisine: 'Vegan',
    priceRange: '$$',
    menu: [
      { id: 'item16', name: 'Vegan Burger', description: 'Plant-based burger.', price: 9.99, image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
      { id: 'item17', name: 'Quinoa Salad', description: 'Healthy quinoa and veggies.', price: 7.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'rest8',
    name: 'Curry House',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7484, lng: -73.9857 },
    rating: 4.2,
    cuisine: 'Indian',
    priceRange: '$$',
    menu: [
      { id: 'item18', name: 'Paneer Tikka Masala', description: 'Spicy paneer curry.', price: 13.99, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
      { id: 'item19', name: 'Aloo Gobi', description: 'Potato and cauliflower curry.', price: 8.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'rest9',
    name: 'BBQ Nation',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    location: { lat: 40.7549, lng: -73.9840 },
    rating: 4.7,
    cuisine: 'BBQ',
    priceRange: '$$$',
    menu: [
      { id: 'item20', name: 'BBQ Chicken', description: 'Grilled chicken with BBQ sauce.', price: 15.99, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
      { id: 'item21', name: 'Corn on the Cob', description: 'Grilled corn.', price: 4.99, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' }
    ]
  }
]

export const mockOrders = [
  {
    id: 'order1',
    restaurant: restaurants[0],
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 15.99 },
      { name: 'Garlic Naan', quantity: 2, price: 3.99 },
      { name: 'Mango Lassi', quantity: 1, price: 4.99 }
    ],
    status: 'preparing', 
    orderedAt: new Date(Date.now() - 25 * 60000), // 25 minutes ago
    estimatedDelivery: new Date(Date.now() + 20 * 60000), // 20 minutes from now
    deliveryAddress: {
      address: '123 Main St, New York, NY 10001',
      location: { lat: 40.7282, lng: -73.9942 }
    },
    driverName: 'Manan Gilhotra',
    driverPhone: '+91 6969696969',
    driverPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    total: 34.95,
    route: generateFakeRoute(
      restaurants[0].location,
      { lat: 40.7282, lng: -73.9942 }
    )
  },
  {
    id: 'order2',
    restaurant: restaurants[1],
    items: [
      { name: 'Double Cheeseburger', quantity: 2, price: 8.99 },
      { name: 'Fries (Large)', quantity: 1, price: 3.99 },
      { name: 'Coke (Large)', quantity: 1, price: 2.50 },
      { name: 'Chocolate Milkshake', quantity: 2, price: 4.99 }
    ],
    status: 'on-the-way',
    orderedAt: new Date(Date.now() - 35 * 60000), // 35 minutes ago
    estimatedDelivery: new Date(Date.now() + 10 * 60000), // 10 minutes from now
    deliveryAddress: {
      address: '123 Netaji Subhas Palace, Mumbai, Maharashtra 400080',
      location: { lat: 40.7580, lng: -73.9755 }
    },
    driverName: 'Manan Gilhotra',
    driverPhone: '91 1234567890',
    driverPhoto: 'https://t4.ftcdn.net/jpg/01/79/99/99/360_F_179999999_1mzWKikF52md2KxaKIh2yPC47A365Jtx.jpg',
    total: 45.95
  },
  {
    id: 'order3',
    restaurant: restaurants[2],
    items: [
      { name: 'Fettuccine Alfredo', quantity: 1, price: 16.99 },
      { name: 'Caprese Salad', quantity: 1, price: 8.99 },
      { name: 'Tiramisu', quantity: 1, price: 7.99 }
    ],
    status: 'ordered',
    orderedAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    estimatedDelivery: new Date(Date.now() + 45 * 60000), // 45 minutes from now
    deliveryAddress: {
      address: '789 Broadway, New York, NY 10003',
      location: { lat: 40.7352, lng: -73.9911 }
    },
    driverName: 'Not assigned',
    driverPhone: '',
    driverPhoto: '',
    total: 33.97
  }
]

export const getCurrentDriverLocation = (order) => {
  if (!order || !order.route || order.status === 'ordered' || order.status === 'delivered') {
    return order?.restaurant?.location || { lat: 40.7128, lng: -74.0060 }
  }
  
  const routeLength = order.route.length
  let progressIndex = 0
  
  if (order.status === 'preparing') {
    progressIndex = 0
  } else if (order.status === 'on-the-way') {
    const totalDeliveryTime = order.estimatedDelivery - order.orderedAt
    const elapsedTime = Date.now() - order.orderedAt
    const progressPercent = Math.min(elapsedTime / totalDeliveryTime, 0.95)
    
    progressIndex = Math.floor(progressPercent * (routeLength - 1))
  }
  
  return order.route[progressIndex]
}

// FAQ data
export const faqData = [
  {
    question: 'How does real-time tracking work?',
    answer: 'Our real-time tracking system uses GPS technology to monitor your delivery driver\'s location. The app updates every few seconds to give you the most accurate location data possible, allowing you to see exactly where your food is and when it will arrive.'
  },
  {
    question: 'What happens if my food arrives late?',
    answer: 'If your food arrives later than the estimated delivery time, you may be eligible for a partial or full refund depending on the circumstances. Contact our customer support team through the app for assistance with late deliveries.'
  },
  {
    question: 'Can I change my delivery address after placing an order?',
    answer: 'Address changes can only be made before the restaurant begins preparing your food. If you need to change your delivery address, contact customer support immediately. Changes after food preparation has begun may not be possible.'
  },
  {
    question: 'How accurate is the estimated delivery time?',
    answer: 'Our delivery time estimates take into account current traffic conditions, distance, weather, and historical delivery data. While we strive for accuracy, unexpected factors can occasionally affect delivery times. The app will notify you of any significant changes to your estimated delivery time.'
  },
  {
    question: 'Can I add instructions for the delivery driver?',
    answer: 'Yes! You can add specific delivery instructions when placing your order. Look for the "Delivery Instructions" field during checkout where you can specify details like gate codes, building entrances, or preferred drop-off locations.'
  },
  {
    question: 'Is it possible to schedule an order for later?',
    answer: 'Absolutely! Our app allows you to schedule orders up to 7 days in advance. Simply select "Schedule for Later" during checkout and choose your preferred date and time. You\'ll receive tracking information once the restaurant begins preparing your order.'
  }
]

export const teamMembers = [
  {
    name: 'Manan Gilhotra',
    role: 'Founder & CEO',
    bio: 'Former Google Maps engineer with a passion for food and technology.',
    image: 'https://i.pinimg.com/736x/a2/0c/41/a20c4157ac8cc7e84c9262555923e39c.jpg'
  },
  {
    name: 'Siya Kapoor',
    role: 'CTO',
    bio: 'Tech innovator with 15+ years of experience in location-based services.',
    image: 'https://i.pinimg.com/736x/35/b9/75/35b975625ea33670de9dfc152fec2e91.jpg'
  },
  {
    name: 'Aarav Singh',
    role: 'Head of Operations',
    bio: 'Restaurant industry veteran focused on creating seamless delivery experiences.',
    image: 'https://i.pinimg.com/736x/16/13/8c/16138c62e20e751a5a03be61aa29c971.jpg'
  },
  {
    name: 'Nia Sharma',
    role: 'Lead Designer',
    bio: 'Award-winning UX/UI designer dedicated to intuitive user experiences.',
    image: 'https://i.pinimg.com/736x/ca/ff/95/caff958c2022dce63d677fe2a1bef10f.jpg'
  }
]