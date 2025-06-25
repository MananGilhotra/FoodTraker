import { useEffect } from 'react'

function About() {
  useEffect(() => {
    document.title = 'About Us - FoodTracker'
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-accent-50 to-white relative overflow-hidden">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gradient">Who We Are</h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">Revolutionizing Food Delivery, One Order at a Time</p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">FoodTracker brings you real-time delivery tracking, transparency, and peace of mind—so you always know where your meal is, from kitchen to doorstep.</p>
          <div className="flex justify-center">
            <img src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&fit=crop&w=600&q=80" alt="Food delivery team" className="rounded-2xl shadow-xl w-full max-w-xl border-4 border-primary-100" />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-12">
            {/* Timeline */}
            <div className="flex-1">
              <ol className="relative border-l-4 border-primary-100 md:border-l-0 md:border-t-4 md:flex md:gap-12">
                <li className="mb-10 md:mb-0 md:flex-1 md:pb-0 pb-10">
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold text-xl shadow-lg">1</span>
                    <span className="ml-4 md:ml-0 md:mt-4 text-lg font-bold">2024: Foundation</span>
                  </div>
                  <p className="text-gray-600">Founded in Mumbai to bring real-time tracking to food delivery.</p>
                </li>
                <li className="mb-10 md:mb-0 md:flex-1 md:pb-0 pb-10">
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-500 text-white font-bold text-xl shadow-lg">2</span>
                    <span className="ml-4 md:ml-0 md:mt-4 text-lg font-bold">2024: First Partnerships</span>
                  </div>
                  <p className="text-gray-600">Launched with 50+ restaurants and our beta tracking platform.</p>
                </li>
                <li className="mb-10 md:mb-0 md:flex-1 md:pb-0 pb-10">
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-500 text-white font-bold text-xl shadow-lg">3</span>
                    <span className="ml-4 md:ml-0 md:mt-4 text-lg font-bold">2025: National Expansion</span>
                  </div>
                  <p className="text-gray-600">Expanded to 10 cities and secured major funding for growth.</p>
                </li>
                <li className="md:flex-1">
                  <div className="flex items-center mb-2 md:mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold text-xl shadow-lg">4</span>
                    <span className="ml-4 md:ml-0 md:mt-4 text-lg font-bold">2025: Mobile App Launch</span>
                  </div>
                  <p className="text-gray-600">Launched iOS & Android apps, reaching 1M+ users in months.</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600">To make food delivery transparent, reliable, and joyful for everyone.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-600">To set the global standard for real-time food delivery tracking.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-accent-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Why Choose Us?</h3>
              <p className="text-gray-600">Lightning-fast updates, trusted by thousands, and a passion for great food experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Stats & Testimonial */}
      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-primary-500">1M+</p>
                <p className="text-lg text-gray-600">Orders Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-accent-500">10</p>
                <p className="text-lg text-gray-600">Cities Served</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-secondary-500">2K+</p>
                <p className="text-lg text-gray-600">Partner Restaurants</p>
              </div>
            </div>
            <blockquote className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-xl shadow-md max-w-md">
              <p className="text-lg text-gray-700 italic mb-2">“I love seeing my food on the map! FoodTracker makes delivery fun and stress-free.”</p>
              <div className="flex items-center mt-2">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-10 h-10 rounded-full mr-3 object-cover" />
                <div>
                  <p className="font-medium">Priya S.</p>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
              </div>
            </blockquote>
          </div>
          <div className="flex justify-center">
            <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&fit=crop&w=500&q=80" alt="Delivery scooter" className="rounded-2xl shadow-xl w-full max-w-xs border-4 border-accent-100" />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to track your next meal?</h2>
        <p className="text-lg mb-8">Join thousands of happy customers and experience food delivery the modern way.</p>
        <a href="/" className="btn-secondary text-lg font-semibold px-8 py-4 rounded-full shadow-xl">Get Started</a>
      </section>
    </div>
  )
}

export default About