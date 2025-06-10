import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Track Your <span className="text-gradient">Food Delivery</span> in Real-Time
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Know exactly where your food is and when it will arrive with our state-of-the-art tracking technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/track/order2" className="btn-primary">
                Track Your Order
              </Link>
              <Link to="/services" className="btn-outline">
                Our Services
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">500+</p>
                <p className="text-sm text-gray-600">Restaurants</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-500">10k+</p>
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
                src="https://images.pexels.com/photos/6963695/pexels-photo-6963695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Food delivery tracking app" 
                className="w-full h-auto"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="mr-3 relative">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-primary-500 rounded-full animate-pulse-slow opacity-60"></div>
                  </div>
                  <div>
                    <p className="text-xs text-primary-500 font-semibold">Arriving in 10 minutes</p>
                    <p className="text-sm font-medium">Your order is on its way!</p>
                  </div>
                </div>
              </div>
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