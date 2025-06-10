import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../utils/mockData'

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  
  useEffect(() => {
    document.title = 'Blog - FoodTracker'
  }, [])
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(blogPosts)
    } else {
      setFilteredPosts(
        blogPosts.filter(post => 
          post.categories.includes(selectedCategory)
        )
      )
    }
  }, [selectedCategory])
  
  const categories = ['all', ...new Set(blogPosts.flatMap(post => post.categories))]
  
  return (
    <div>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              FoodTraker <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Insights, tips, and stories from the world of food delivery and tracking technology
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 my-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="bg-primary-100 text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {blogPosts[2].categories[0]}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{blogPosts[2].date}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{blogPosts[2].title}</h2>
                <p className="text-gray-600 mb-6">{blogPosts[2].excerpt}</p>
                
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt={blogPosts[2].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{blogPosts[2].author}</p>
                    <p className="text-xs text-gray-500">{blogPosts[2].readTime}</p>
                  </div>
                </div>
                
                <a href="#" className="btn-primary self-start">Read Article</a>
              </div>
              
              <div className="md:h-auto">
                <img 
                  src={blogPosts[2].image} 
                  alt={blogPosts[2].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover-scale">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category, i) => (
                      <span key={i} className="bg-primary-50 text-primary-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2">
                        <img 
                          src="https://i.pinimg.com/736x/fb/26/a1/fb26a1bb894559b45aec322fe9b46e5f.jpg" 
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{post.author}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <a href="#" className="text-primary-500 hover:text-primary-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5V15m-6 4h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-gray-600">No posts matching the selected category.</p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 btn-primary"
              >
                View All Posts
              </button>
            </div>
          )}
          
          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="btn-outline">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles, industry insights, and food delivery tips delivered to your inbox.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-r-lg transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog