import { useEffect } from 'react'
import { teamMembers } from '../utils/mockData'

function About() {
  useEffect(() => {
    document.title = 'About Us - FoodTraker'
  }, [])
  
  return (
    <div>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                About <span className="text-gradient">FoodTraker</span>
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
                src="https://i.pinimg.com/736x/53/e7/b5/53e7b5f96529d78c598725b630920424.jpg" 
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
                      FoodTraker was founded in Mumbai City with a mission to bring transparency to food delivery through real-time tracking technology.
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
                      FoodKhoj expanded to 10 major cities across the India and secured 500Cr in Series A funding.
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
                      FoodKhoj begins international expansion and introduces new AI-powered delivery time predictions for even greater accuracy.
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
      
      <section id="team" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate people behind FoodKhoj working to revolutionize food delivery tracking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover-scale">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  
                  <div className="mt-4 flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-accent-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              We're always looking for talented individuals to help us revolutionize food delivery tracking. If you're passionate about food, technology, and creating amazing customer experiences, we want to hear from you!
            </p>
            <a href="#" className="btn-primary">
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About