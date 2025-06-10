import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faqData } from '../utils/mockData'

function Services() {
  const [activeTab, setActiveTab] = useState('restaurants')
  const [activeAccordion, setActiveAccordion] = useState(null)
  
  useEffect(() => {
    document.title = 'Services - FoodKhoj'
  }, [])
  
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }
  
  const services = [
    {
      id: 'restaurants',
      title: 'For Restaurants',
      description: 'Partner with us to provide your customers with real-time delivery tracking.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      features: [
        'Seamless integration with your existing POS system',
        'Custom-branded tracking experience for your customers',
        'Detailed analytics on delivery performance',
        'Reduced customer service calls about order status',
        'Higher customer satisfaction and retention'
      ],
      cta: 'Partner With Us'
    },
    {
      id: 'drivers',
      title: 'For Drivers',
      description: 'Join our network of delivery professionals and enjoy a better driving experience.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
        </svg>
      ),
      features: [
        'User-friendly driver app with optimized routes',
        'Fewer customer calls and messages about order status',
        'Clear delivery instructions and customer preferences',
        'Transparent earnings and instant payment options',
        'Flexible scheduling to work on your own terms'
      ],
      cta: 'Drive With Us'
    },
    {
      id: 'customers',
      title: 'For Customers',
      description: 'Download our app and never wonder where your food is again.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      features: [
        'Real-time GPS tracking of your order on an interactive map',
        'Accurate delivery time estimates based on current conditions',
        'Direct communication with your delivery driver',
        'Detailed order history and easy reordering',
        'Special offers and rewards for frequent users'
      ],
      cta: 'Download Now'
    }
  ]
  
  return (
    <div>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              We provide state-of-the-art delivery tracking services for restaurants, drivers, and hungry customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#services" className="btn-primary">
                Explore Services
              </a>
              <a href="#faq" className="btn-outline">
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section id="services" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Delivery Tracking <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer tailored solutions for all participants in the food delivery ecosystem
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-5 py-3 rounded-lg font-medium mx-2 mb-2 transition-all duration-200 ${
                  activeTab === service.id 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="flex items-center">
                  {service.icon}
                  <span className="ml-2">{service.title}</span>
                </span>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`transition-opacity duration-300 ${
                    activeTab === service.id ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#" className="btn-primary">
                    {service.cta}
                  </a>
                </div>
              ))}
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              {activeTab === 'restaurants' && (
                <img 
                  src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Restaurant service" 
                  className="w-full h-auto"
                />
              )}
              {activeTab === 'drivers' && (
                <img 
                  src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Driver service" 
                  className="w-full h-auto"
                />
              )}
              {activeTab === 'customers' && (
                <img 
                  src="https://images.pexels.com/photos/4255489/pexels-photo-4255489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Customer service" 
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our seamless tracking technology is easy to use for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="mb-4 mt-2">
                <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Place an Order</h3>
              <p className="text-gray-600">
                Order from your favorite restaurant through the FoodKhoj app or website. Browse menus, customize items, and check out securely.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-secondary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="mb-4 mt-2">
                <svg className="w-16 h-16 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Track Preparation & Pickup</h3>
              <p className="text-gray-600">
                Watch as your order is received, prepared by the restaurant, and picked up by your delivery driver. Get notified at each stage.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="mb-4 mt-2">
                <svg className="w-16 h-16 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Follow Delivery in Real-Time</h3>
              <p className="text-gray-600">
                Monitor your delivery driver's journey on an interactive map. See their exact location and get accurate arrival time estimates.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/track/order2" className="btn-primary">
              Try a Demo
            </Link>
          </div>
        </div>
      </section>
      
      <section id="faq" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our food delivery tracking services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    activeAccordion === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="#" className="btn-outline">
              Contact Support
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Food Delivery Experience?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Join thousands of satisfied customers, restaurants, and drivers benefiting from real-time tracking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="btn bg-white text-primary-500 hover:bg-gray-100">
                Sign Up Now
              </a>
              <a href="#" className="btn border-2 border-white text-white hover:bg-white/10">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services