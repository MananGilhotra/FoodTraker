import HeroSection from '../components/home/HeroSection'
import TrackingPreview from '../components/home/TrackingPreview'
import SellingPoints from '../components/home/SellingPoints'
import RestaurantSection from '../components/home/RestaurantSection'
import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    document.title = 'FoodKhoj - Real-Time Food Delivery Tracking'
  }, [])
  
  return (
    <div>
      <HeroSection />
      <TrackingPreview />
      <SellingPoints />
      <RestaurantSection />
      
      <section className="py-16 bg-gradient-to-b from-white to-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-gradient">Customers</span> Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from satisfied customers who love our tracking service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                "This real-time tracking feature is just amazing, yaar! I can see exactly where my food is and get everything ready on time. No more guessing when dinner will come!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://i.pinimg.com/736x/b0/06/60/b00660de48b31bc199a718632dfc8871.jpg"
                  alt="Customer" 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">Rahul Oberoi</p>
                  <p className="text-sm text-gray-500">Mumbai, India</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
              "As a busy mom, I absolutely love being able to track our family dinner. The ETA is always spot-on, and the kids get so excited watching the delivery guy come on the map. It’s like a little game for them!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://i.pinimg.com/736x/46/95/25/4695257ca5ef1ef31b2a40d20f3047ec.jpg"
                  alt="Customer" 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">Sara Arora</p>
                  <p className="text-sm text-gray-500">Chandigarh, Punjab</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 mb-4">
                "Finally, a delivery app that actually shows where your food is! The estimated times are spot-on, and I love that I can directly contact my driver if I need to. Such a game-changer!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://i.pinimg.com/736x/e5/e3/ce/e5e3ced65b2ebd0486c40498a2af5e3f.jpg"
                  alt="Customer" 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">Aneesh Patil</p>
                  <p className="text-sm text-gray-500">Surat, Gujrat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Download Our App
              </h2>
              <p className="text-lg mb-6 text-white/80">
                Get the full FoodKhoj experience. Track your deliveries, discover new restaurants, and enjoy exclusive app-only offers.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="bg-black hover:bg-gray-900 text-white rounded-lg px-4 py-2 flex items-center">
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.0627 11.7636C17.0346 9.2576 19.0649 7.95937 19.15 7.90353C17.9772 6.21324 16.1248 5.96688 15.4563 5.94831C13.8641 5.77869 12.32 6.8793 11.5112 6.8793C10.684 6.8793 9.42867 5.96688 8.09454 5.9947C6.36083 6.02173 4.73454 7.01173 3.83224 8.55988C1.98224 11.7075 3.34622 16.3445 5.12593 18.8042C6.00167 20.0133 7.02654 21.3845 8.36997 21.329C9.67625 21.2673 10.1591 20.4721 11.7323 20.4721C13.2869 20.4721 13.7419 21.329 15.101 21.2921C16.5045 21.2673 17.3802 20.0565 18.2219 18.8353C19.2375 17.4363 19.6553 16.0682 19.6738 15.9943C19.6368 15.9819 17.0935 15.0565 17.0627 11.7636Z"/>
                    <path d="M14.1476 4.22356C14.8696 3.33063 15.3616 2.11217 15.215 0.875C14.1768 0.922 12.8704 1.59594 12.1238 2.46123C11.4573 3.22986 10.8618 4.48684 11.0269 5.68717C12.1981 5.77649 13.3976 5.09949 14.1476 4.22356Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-xl font-semibold font-sans -mt-1">App Store</div>
                  </div>
                </a>
                <a href="#" className="bg-black hover:bg-gray-900 text-white rounded-lg px-4 py-2 flex items-center">
                  <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.4309 8.31559L9.33681 16.4091L2.85542 9.92747C2.8071 9.87927 2.75398 9.83563 2.69707 9.79832C1.80206 9.19346 1.64648 7.90991 2.36648 7.1899L7.08833 2.46806C7.80834 1.74805 9.09189 1.90362 9.69658 2.79864C9.73388 2.85554 9.77757 2.90866 9.82572 2.95698L16.3071 9.43866L8.21306 17.5326L16.3071 9.43866L16.307 9.43876L17.3062 8.43957L17.4309 8.31559Z"/>
                    <path d="M12.9624 5.78271L11.9633 6.78188L9.67512 9.0701L17.7692 17.1641L20.0574 14.8758C20.1057 14.8276 20.1588 14.784 20.2157 14.7467C21.1107 14.142 21.2666 12.8583 20.5466 12.1383L15.8248 7.41648C15.1048 6.69646 13.8212 6.85231 13.2162 7.74737C13.1791 7.80426 13.1354 7.85738 13.0871 7.9057L12.9624 5.78271Z"/>
                    <path d="M9.82422 2.95398L2.95622 9.82198L2.95612 9.82207C2.9079 9.87028 2.85478 9.91392 2.79797 9.95113C1.90295 10.556 1.74738 11.8396 2.46738 12.5596L7.18923 17.2814C7.90924 18.0014 9.19278 17.8459 9.79748 16.9508C9.83478 16.8939 9.87846 16.8408 9.92662 16.7925L16.7942 9.9245L9.82422 2.95398Z"/>
                    <path d="M21.0435 14.1099C21.0917 14.0617 21.1448 14.0181 21.2017 13.9808C22.0967 13.3761 22.2526 12.0924 21.5326 11.3724L16.8107 6.65058C16.0907 5.93057 14.8072 6.0866 14.2025 6.98161C14.1652 7.03851 14.1215 7.09163 14.0733 7.13994L7.20532 14.0079L14.1753 20.9779L21.0435 14.1099Z"/>
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/4143791/pexels-photo-4143791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="FoodKhoj mobile app" 
                  className="w-64 h-auto rounded-3xl shadow-2xl z-10 relative"
                />
                <div className="absolute -top-4 -right-4 bg-white text-primary-500 rounded-full p-3 shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-8 bg-white p-3 rounded-lg shadow-lg animate-pulse-slow">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm font-medium">4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home