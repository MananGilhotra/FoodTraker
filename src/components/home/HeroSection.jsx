import { Link } from 'react-router-dom'
import { useOrder } from '../../Context/OrderContext'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const { orders } = useOrder();
  const navigate = useNavigate();
  const latestOrder = orders && orders.length > 0 ? orders[0] : null;
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-gradient">Satisfy Your Cravings, Fast! 🍕</span>
            </h1>
            <p className="text-xl md:text-2xl text-accent-600 font-semibold mb-2">
              From Your Favorite Restaurants to Your Doorstep
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Order your favorite meals quickly and get them delivered hot and fresh to your doorstep. Fast, easy, and delicious!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn-outline">
                Our Services
              </Link>
              {latestOrder && (
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/track/${latestOrder.id}`)}
                >
                  Track Order
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">2k+</p>
                <p className="text-sm text-gray-600">Restaurants</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">1k+</p>
                <p className="text-sm text-gray-600">Daily Orders</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">98%</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover-scale">
              <img 
                src="https://thumbs.dreamstime.com/b/food-delivery-app-shown-green-background-variety-items-317477721.jpg" 
                alt="Food delivery tracking app" 
                className="w-full h-auto"
              />
              
              
            </div>
            
            <div className="absolute -top-5 -right-5 bg-white rounded-lg shadow-md p-3 animate-bounce-slow">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-md p-3 rotate-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Real-time ETA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection