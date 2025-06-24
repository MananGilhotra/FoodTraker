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
    location: { lat: 28.6139, lng: 77.2090 }, // Delhi
    rating: 4.7,
    cuisine: 'Indian',
    priceRange: '',
    menu: [
      { id: 'item1', name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry.', price: 350, image: 'https://static01.nyt.com/images/2024/10/29/multimedia/Butter-Chickenrex-tbvz/Butter-Chickenrex-tbvz-mediumSquareAt3X.jpg' },
      { id: 'item2', name: 'Garlic Naan', description: 'Soft Indian bread with garlic.', price: 320, image: 'https://hostthetoast.com/wp-content/uploads/2018/08/naan-202-320x320-1.jpg' },
      { id: 'item3', name: 'Mango Lassi', description: 'Sweet mango yogurt drink.', price: 310, image: 'https://www.midwestliving.com/thmb/2n9egOlUYE0dnPxJoHYY7disquI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KeyIngredient_MangoLassi_BP_1019_preview-0bdf9f28d35043748efaa9fd1c7b806c.jpg' }
    ]
  },
  {
    id: 'rest2',
    name: 'Burger King',
    image: 'https://i.pinimg.com/736x/70/38/01/703801fc16a7c10fdd7aadec9dc5ab81.jpg',
    location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
    rating: 4.5,
    cuisine: 'American',
    priceRange: '',
    menu: [
      { id: 'item4', name: 'Double Cheeseburger', description: 'Two beef patties, cheese, and toppings.', price: 399, image: 'https://www.farmerboys.com/images/menu/big-cheese.jpg' },
      { id: 'item5', name: 'Fries (Large)', description: 'Crispy golden fries.', price: 320, image: 'https://compote.slate.com/images/c72f30b4-4e25-46dc-b1f4-b6a7063b3d56.jpeg?crop=1558%2C1039%2Cx0%2Cy0' },
      { id: 'item6', name: 'Chocolate Milkshake', description: 'Rich chocolate shake.', price: 350, image: 'https://breadsandsweets.com/wp-content/uploads/2022/07/chocolate-milkshake-sq-1-of-1.jpg' },
      { id: 'item20', name: 'Coke (Large)', description: 'Chilled Coca-Cola.', price: 310, image: 'https://media-order.bkdelivery.co.id/thumb/product_photo/2023/3/20/nxych6c6q5ejwfcgpbbmiu_product_details.jpg' }
    ]
  },
  {
    id: 'rest3',
    name: 'Billus Kitchen',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXm6nuKcjT7n3JTa_g2JzGtly3mby6uhY_A&s',
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    rating: 4.8,
    cuisine: 'Italian',
    priceRange: '',
    menu: [
      { id: 'item7', name: 'Fettuccine Alfredo', description: 'Pasta in creamy Alfredo sauce.', price: 420, image: 'https://cookingwithcassandra.com/wp-content/uploads/2022/10/Copy-of-Copy-of-DSC03750-2-scaled.jpg' },
      { id: 'item8', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil.', price: 350, image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/07/Caprese-Salad-2-2.jpg' },
      { id: 'item9', name: 'Tiramisu', description: 'Classic Italian dessert.', price: 360, image: 'https://mediterraneantaste.com/wp-content/uploads/2023/11/tiramisu-4583-500x500.jpg' }
    ]
  },
  {
    id: 'rest4',
    name: 'Sushi Zen',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/SwW5Yv2VnJ32x2TQ4niI2w/258s.jpg',
    location: { lat: 22.5726, lng: 88.3639 }, // Kolkata
    rating: 4.6,
    cuisine: 'Japanese',
    priceRange: '',
    menu: [
      { id: 'item10', name: 'Salmon Sushi', description: 'Fresh salmon over rice.', price: 450, image: 'https://www.kikkoman.eu/fileadmin/_processed_/0/f/csm_1025-recipe-page-Spicy-tuna-and-salmon-rolls_desktop_43b394c33d.jpg' },
      { id: 'item11', name: 'Miso Soup', description: 'Classic Japanese soup.', price: 320, image: 'https://thestayathomechef.com/wp-content/uploads/2020/04/Miso-Soup-2-scaled.jpg' }
    ]
  },
  {
    id: 'rest5',
    name: 'Taco Fiesta',
    image: 'https://s3-media0.fl.yelpcdn.com/bphoto/MQftiZlRhzqe08unb1uveA/348s.jpg',
    location: { lat: 23.0225, lng: 72.5714 }, // Ahmedabad
    rating: 4.3,
    cuisine: 'Mexican',
    priceRange: '',
    menu: [
      { id: 'item12', name: 'Chicken Taco', description: 'Spicy grilled chicken taco.', price: 350, image: 'https://littlechefwithin.com/wp-content/uploads/2024/01/Shredded-Chicken-Tacos-Little-Chef-Within.jpg' },
      { id: 'item13', name: 'Guacamole', description: 'Fresh avocado dip.', price: 320, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoVG5MgOuVztIcFwHyXFpX9CsewCUHV3XxWg&s' }
    ]
  },
  {
    id: 'rest6',
    name: 'Pizza Palace',
    image: 'https://content.jdmagicbox.com/v2/comp/delhi/l7/011pxx11.xx11.180222115026.k8l7/catalogue/da-pizza-palace-shastri-nagar-n-delhi-pizza-outlets-1mz5boc85g.jpg',
    location: { lat: 18.5204, lng: 73.8567 }, // Pune
    rating: 4.9,
    cuisine: 'Pizza',
    priceRange: '',
    menu: [
      { id: 'item14', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 399, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1bdKKaTySsc4t8ahzTXQIG87Ls_J8ph907w&s' },
      { id: 'item15', name: 'Pepperoni Pizza', description: 'Pepperoni and cheese.', price: 420, image: 'https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/9449/31939/P111023181554_1__26792.1722540163.jpg?c=2' }
    ]
  },
  {
    id: 'rest7',
    name: 'Vegan Delight',
    image: 'https://www.ipohecho.com.my/wp-content/uploads/2021/10/VeganDelights-2.jpg',
    location: { lat: 26.9124, lng: 75.7873 }, // Jaipur
    rating: 4.4,
    cuisine: 'Vegan',
    priceRange: '',
    menu: [
      { id: 'item16', name: 'Vegan Burger', description: 'Plant-based burger.', price: 350, image: 'https://images.ctfassets.net/qu53tdnhexvd/VkS6PdhsxZDX3fbtebFhG/beda70c3f440d8e7f0f069ee0ecfe229/Vegan-burger-1200-x-600.jpg?w=1080&h=1080' },
      { id: 'item17', name: 'Quinoa Salad', description: 'Healthy quinoa and veggies.', price: 320, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-zp6yy1BqD4vu8YGdJIFa9ea5IwzmoNRNw&s' }
    ]
  },
  {
    id: 'rest8',
    name: 'Curry House',
    image: 'https://ca-times.brightspotcdn.com/dims4/default/10e02ca/2147483647/strip/false/crop/4032x3024+0+0/resize/1486x1115!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9c%2Fb0%2F83a0766646cc88a1a5b07a7e7c36%2Fimg-9348.jpg',
    location: { lat: 17.3850, lng: 78.4867 }, // Hyderabad
    rating: 4.2,
    cuisine: 'Indian',
    priceRange: '',
    menu: [
      { id: 'item18', name: 'Paneer Tikka Masala', description: 'Spicy paneer curry.', price: 350, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_w-NpRCnX_t4ro-6LXLqPPAQA9F_VQljbQ&s' },
      { id: 'item19', name: 'Aloo Gobi', description: 'Potato and cauliflower curry.', price: 320, image: 'https://niksharmacooks.com/wp-content/uploads/2022/11/AlooGobiDSC_5234.jpg' }
    ]
  },
  {
    id: 'rest9',
    name: 'BBQ Nation',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNj8dIbAMLCUm3sQScQwMHMmkOYubP5TXnw&s',
    location: { lat: 13.0827, lng: 80.2707 }, // Chennai
    rating: 4.7,
    cuisine: 'BBQ',
    priceRange: '',
    menu: [
      { id: 'item20', name: 'BBQ Chicken', description: 'Grilled chicken with BBQ sauce.', price: 420, image: 'https://res.cloudinary.com/hksqkdlah/image/upload/c_fill,dpr_2.0,f_auto,fl_lossy.progressive.strip_profile,g_faces:auto,h_368,q_auto:low/SFS_Oven-Roasted-BBQ-Chicken_517_qwhqeq' },
      { id: 'item21', name: 'Corn on the Cob', description: 'Grilled corn.', price: 350, image: 'https://www.allrecipes.com/thmb/y2Vdq6vvlyhfeq85knABr4vaUKA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/266396-air-fryer-corn-on-the-cobb-GOLDMAN-R311235-4x3-2314-c4a11e4b9e484245b818c8eab988e717.jpg' }
    ]
  }
]

function randomMinutes(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const mockOrders = [
  {
    id: 'order1',
    restaurant: restaurants[0],
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 15.99, image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/butter-chicken.jpg' },
      { name: 'Garlic Naan', quantity: 2, price: 3.99, image: 'https://www.cookwithmanali.com/wp-content/uploads/2018/05/Garlic-Naan-500x500.jpg' },
      { name: 'Mango Lassi', quantity: 1, price: 4.99, image: 'https://www.cookwithmanali.com/wp-content/uploads/2017/05/Mango-Lassi-500x500.jpg' }
    ],
    status: 'preparing', 
    orderedAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    estimatedDelivery: new Date(Date.now() + (randomMinutes(10, 15) * 60000)), // 10-15 min from now
    deliveryAddress: {
      address: '123 Main St, New York, NY 10001',
      location: { lat: 40.7282, lng: -73.9942 }
    },
    driverName: 'Rahul Kumar',
    driverPhone: '+91 9876543210',
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
      { name: 'Double Cheeseburger', quantity: 2, price: 8.99, image: 'https://www.burgerking.in/Images/Product/cheese-burger.png' },
      { name: 'Fries (Large)', quantity: 1, price: 3.99, image: 'https://www.burgerking.in/Images/Product/fries.png' },
      { name: 'Coke (Large)', quantity: 1, price: 2.50, image: 'https://www.burgerking.in/Images/Product/coke.png' },
      { name: 'Chocolate Milkshake', quantity: 2, price: 4.99, image: 'https://www.burgerking.in/Images/Product/chocolate-milkshake.png' }
    ],
    status: 'on-the-way',
    orderedAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    estimatedDelivery: new Date(Date.now() + (randomMinutes(10, 15) * 60000)), // 10-15 min from now
    deliveryAddress: {
      address: '123 Netaji Subhas Palace, Mumbai, Maharashtra 400080',
      location: { lat: 40.7580, lng: -73.9755 }
    },
    driverName: 'Amit Singh',
    driverPhone: '+91 8765432109',
    driverPhoto: 'https://t4.ftcdn.net/jpg/01/79/99/99/360_F_179999999_1mzWKikF52md2KxaKIh2yPC47A365Jtx.jpg',
    total: 45.95,
    route: generateFakeRoute(
      restaurants[1].location,
      { lat: 40.7580, lng: -73.9755 }
    )
  },
  {
    id: 'order3',
    restaurant: restaurants[2],
    items: [
      { name: 'Fettuccine Alfredo', quantity: 1, price: 16.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Fettuccine-Alfredo-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' },
      { name: 'Caprese Salad', quantity: 1, price: 8.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Caprese-Salad-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' },
      { name: 'Tiramisu', quantity: 1, price: 7.99, image: 'https://www.simplyrecipes.com/thmb/8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw=/2000x1333/filters:fill(auto,1)/Simply-Recipes-Tiramisu-LEAD-1-7b7b7b7b7b7b4b7b8b7b7b7b7b7b7b7b.jpg' }
    ],
    status: 'ordered',
    orderedAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    estimatedDelivery: new Date(Date.now() + (randomMinutes(10, 15) * 60000)), // 10-15 min from now
    deliveryAddress: {
      address: '789 Broadway, New York, NY 10003',
      location: { lat: 40.7352, lng: -73.9911 }
    },
    driverName: 'Vikram Patel',
    driverPhone: '+91 7654321098',
    driverPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    total: 33.97,
    route: generateFakeRoute(
      restaurants[2].location,
      { lat: 40.7352, lng: -73.9911 }
    )
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