import { restaurants } from '../../utils/mockData'

function RestaurantSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular <span className="text-gradient">Restaurants</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our wide selection of partner restaurants with real-time delivery tracking.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover-scale">
              <div className="h-48 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{restaurant.name}</h3>
                  <span className="bg-primary-50 text-primary-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {restaurant.cuisine}
                  </span>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{restaurant.rating} (200+)</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">25-35 min</span>
                </div>
                
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#" className="btn-outline">
            View All Restaurants
          </a>
        </div>
      </div>
    </section>
  )
}

export default RestaurantSection