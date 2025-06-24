import { useEffect } from 'react'
import { teamMembers } from '../utils/mockData'

function About() {
  useEffect(() => {
    document.title = 'About Us - FoodTracker'
  }, [])
  
  return (
    <div>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                About <span className="text-gradient">FoodTracker</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                We're revolutionizing food delivery with real-time tracking and transparency.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#team" className="btn-primary">
                  Meet Our Team
                </a>
                <a href="#story" className="btn-outline">
                  Our Story
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Team meeting" 
                    className="rounded-lg shadow-md hover-scale"
                  />
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Office collaboration" 
                    className="rounded-lg shadow-md hover-scale"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src="https://images.pexels.com/photos/7363064/pexels-photo-7363064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Food delivery" 
                    className="rounded-lg shadow-md hover-scale"
                  />
                  <img 
                    src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Team brainstorming" 
                    className="rounded-lg shadow-md hover-scale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="story" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Story</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a small startup to a food delivery revolution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://www.shutterstock.com/image-photo/egypt-businessman-behind-no-face-600nw-2528515917.jpg" 
                alt="Founder" 
                className="rounded-xl shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">How It All Started</h3>
              <p className="text-gray-600 mb-4">
                FoodTraker was born out of frustration. Our founder, Manan Gilhotra, was tired of the uncertainty that came with food delivery – never knowing when his food would arrive or where it was in the delivery process.
              </p>
              <p className="text-gray-600 mb-4">
                As a former Google Maps engineer, Manan knew there had to be a better way. In 2024, he assembled a small team of food enthusiasts and tech innovators to create a platform that would bring transparency to food delivery.
              </p>
              <p className="text-gray-600">
                What started as a small project in a shared office space has grown into the leading food delivery tracking service, partnering with thousands of restaurants across the country to provide real-time delivery information to hungry customers.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Journey</h3>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-100"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-start-2 relative pl-8 pb-8">
                  <div className="absolute left-0 md:left-[-20px] top-0 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center z-10">
                    <span className="font-bold">1</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">2024: Foundation</h4>
                    <p className="text-gray-600">
                      FoodTracker was founded in Mumbai City with a mission to bring transparency to food delivery through real-time tracking technology.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-start-1 md:text-right relative pr-8 pb-8">
                  <div className="absolute right-0 md:right-[-20px] top-0 transform md:translate-x-[50%] w-10 h-10 rounded-full bg-secondary-500 text-white flex items-center justify-center z-10">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">2024 november: First Partnerships</h4>
                    <p className="text-gray-600">
                      We partnered with our first 50 restaurants in Mumbai and launched the beta version of our tracking technology.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-start-2 relative pl-8 pb-8">
                  <div className="absolute left-0 md:left-[-20px] top-0 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-accent-500 text-white flex items-center justify-center z-10">
                    <span className="font-bold">3</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">2024 December: National Expansion</h4>
                    <p className="text-gray-600">
                      FoodTracker expanded to 10 major cities across the India and secured 500Cr in Series A funding.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-start-1 md:text-right relative pr-8 pb-8">
                  <div className="absolute right-0 md:right-[-20px] top-0 transform md:translate-x-[50%] w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center z-10">
                    <span className="font-bold">4</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">2025 February: Mobile App Launch</h4>
                    <p className="text-gray-600">
                      We launched our mobile apps for iOS and Android, reaching 1 million active users by the end of the march.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-start-2 relative pl-8">
                  <div className="absolute left-0 md:left-[-20px] top-0 transform md:translate-x-[-50%] w-10 h-10 rounded-full bg-secondary-500 text-white flex items-center justify-center z-10">
                    <span className="font-bold">5</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-bold mb-2">2025 April: Going Global</h4>
                    <p className="text-gray-600">
                      FoodTracker begins international expansion and introduces new AI-powered delivery time predictions for even greater accuracy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create transparency in food delivery by providing real-time, accurate tracking information that empowers customers and restaurants alike. We believe everyone deserves to know where their food is, every step of the way.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the global standard for food delivery tracking, creating a world where waiting anxiously for your food is a thing of the past. We envision a future where every food delivery is a smooth, transparent, and delightful experience.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Core Values</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Transparency</h4>
                <p className="text-gray-600">
                  We believe in complete honesty with our customers, partners, and team members.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Innovation</h4>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible in delivery technology.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Community</h4>
                <p className="text-gray-600">
                  We support the restaurants, drivers, and customers who make up our growing family.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-2">Reliability</h4>
                <p className="text-gray-600">
                  We deliver on our promises and ensure our technology works when you need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About