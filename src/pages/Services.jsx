import { useState } from 'react'

const tabs = [
  {
    label: 'For Customers',
      icon: (
      <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      ),
    content: (
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-2">Order, Track, Enjoy</h3>
        <p className="text-gray-600 mb-2">Browse your favorite restaurants, place orders in seconds, and track your food in real time—right to your door.</p>
        <ul className="list-disc list-inside text-gray-500 text-left inline-block">
          <li>Live delivery map & ETA</li>
          <li>Easy reordering</li>
          <li>Secure payments</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'For Restaurants',
      icon: (
      <svg className="w-7 h-7 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path></svg>
    ),
    content: (
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-2">Grow Your Business</h3>
        <p className="text-gray-600 mb-2">Partner with us to reach more customers, streamline orders, and offer real-time delivery tracking.</p>
        <ul className="list-disc list-inside text-gray-500 text-left inline-block">
          <li>Dashboard for order management</li>
          <li>Marketing & promotions</li>
          <li>Dedicated support</li>
        </ul>
      </div>
    ),
    },
    {
    label: 'For Drivers',
      icon: (
      <svg className="w-7 h-7 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1"></path></svg>
    ),
    content: (
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold mb-2">Deliver & Earn</h3>
        <p className="text-gray-600 mb-2">Flexible hours, instant payouts, and a simple app to help you deliver with confidence.</p>
        <ul className="list-disc list-inside text-gray-500 text-left inline-block">
          <li>Live route optimization</li>
          <li>Transparent earnings</li>
          <li>24/7 driver support</li>
        </ul>
      </div>
      ),
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'Choose & Order',
    desc: 'Pick your favorite meal and place your order in seconds.'
  },
  {
    step: 2,
    title: 'Track in Real Time',
    desc: 'Watch your food move on the map, from kitchen to doorstep.'
  },
  {
    step: 3,
    title: 'Enjoy!',
    desc: 'Receive your meal hot, fresh, and right on time.'
  },
]

const faqs = [
  {
    q: 'How does real-time tracking work?',
    a: 'We use GPS and smart routing to show your delivery on a live map, so you always know where your food is.'
  },
  {
    q: 'Can I pay with UPI or cash?',
    a: 'Yes! We support UPI, credit/debit cards, and cash on delivery for your convenience.'
  },
  {
    q: 'How do I become a delivery partner?',
    a: 'Just sign up on our app, upload your documents, and start delivering after a quick onboarding.'
  },
]

function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-accent-50 via-primary-50 to-white text-center">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gradient">Our Services</h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">Everything You Need for a Seamless Food Delivery Experience</p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">Whether you're a customer, restaurant, or driver, FoodTracker has you covered with powerful features and real-time technology.</p>
        </div>
      </section>
      
      {/* Tabbed Services */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex justify-center mb-8 gap-4 flex-wrap">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 border-2 ${activeTab === idx ? 'bg-primary-100 border-primary-500 text-primary-700 shadow-lg' : 'bg-white border-gray-200 text-gray-500 hover:bg-primary-50'}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative min-h-[160px] md:min-h-[120px] flex justify-center items-center">
            <div className="w-full transition-all duration-500 animate-fade-in">
              {tabs[activeTab].content}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Stepper */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {howItWorks.map((step, idx) => (
              <div key={step.step} className="flex flex-col items-center md:w-1/3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-2xl font-bold shadow-lg ${idx === 0 ? 'bg-primary-500 text-white' : idx === 1 ? 'bg-secondary-500 text-white' : 'bg-accent-500 text-white'}`}>{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Accordion */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="border rounded-xl shadow-sm">
                <button 
                  className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className={`ml-4 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-gray-600 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience the future of food delivery?</h2>
        <p className="text-lg mb-8">Sign up now and join the FoodTracker revolution!</p>
        <a href="/" className="btn-secondary text-lg font-semibold px-8 py-4 rounded-full shadow-xl">Get Started</a>
      </section>
    </div>
  )
}

export default Services