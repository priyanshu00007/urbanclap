"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ArrowRight, ArrowLeft, Facebook, Twitter, Instagram, Linkedin, MapPin } from 'lucide-react'

// Services data
const services = [
    {
      id: 1,
      name: 'House Cleaning',
      icon: '🧹',
      description: 'Professional cleaning services for your home.',
      longDescription: 'Our house cleaning service provides thorough and efficient cleaning for your entire home. We use eco-friendly products and pay attention to every detail to ensure your space is spotless and comfortable.'
    },
    {
      id: 2,
      name: 'Plumbing',
      icon: '🔧',
      description: 'Expert plumbing solutions for all your needs.',
      longDescription: 'Our experienced plumbers can handle any plumbing issue, from minor repairs to major installations. We provide fast, reliable service to keep your plumbing system in top condition.'
    },
    {
      id: 3,
      name: 'Electrical',
      icon: '⚡',
      description: 'Reliable electrical services for your safety.',
      longDescription: 'Our licensed electricians provide a full range of electrical services, ensuring your home\'s electrical systems are safe and up to code. From rewiring to new installations, we\'ve got you covered.'
    },
    {
      id: 4,
      name: 'Painting',
      icon: '🎨',
      description: 'Transform your space with our painting services.',
      longDescription: 'Our professional painters can refresh your home\'s interior or exterior with precision and care. We use high-quality paints and techniques to ensure a beautiful, long-lasting finish.'
    },
    {
      id: 5,
      name: 'Carpentry',
      icon: '🔨',
      description: 'Custom carpentry work for your home.',
      longDescription: 'Our skilled carpenters can create custom furniture, install cabinets, or tackle any woodworking project. We combine craftsmanship with your vision to enhance your living spaces.'
    },
    {
      id: 6,
      name: 'Appliance Repair',
      icon: '🔌',
      description: 'Quick and efficient appliance repair services.',
      longDescription: 'When your appliances break down, our technicians are here to help. We repair a wide range of household appliances, restoring functionality and extending their lifespan.'
    },
    {
      id: 7,
      name: 'Pest Control',
      icon: '🐜',
      description: 'Effective pest control solutions for your home.',
      longDescription: 'Our experienced professionals use eco-friendly methods to eliminate pests, ensuring your home remains safe and healthy.'
    },
    {
      id: 8,
      name: 'AC Repair',
      icon: '❄️',
      description: 'Expert AC repair services for all brands.',
      longDescription: 'Our skilled technicians diagnose and repair AC issues promptly, ensuring your home stays cool and comfortable.'
    },
    {
      id: 9,
      name: 'Furniture Assembly',
      icon: '🛋️',
      description: 'Expert furniture assembly services.',
      longDescription: 'Our professionals assemble furniture quickly and efficiently, saving you time and hassle.'
    },
    {
      id: 10,
      name: 'Home Shifting',
      icon: '🏠',
      description: 'Stress-free home shifting services.',
      longDescription: 'Our experienced team packs, moves, and unpacks your belongings with care, ensuring a seamless relocation experience.'
    },
    {
      id: 11,
      name: 'Interior Designing',
      icon: '🏡',
      description: 'Transform your space with our interior designing services.',
      longDescription: 'Our expert designers create personalized, functional, and beautiful spaces that reflect your style.'
    },
    {
      id: 12,
      name: 'Yoga and Wellness',
      icon: '🧘‍♀️',
      description: 'Expert yoga and wellness services for a healthy life.',
      longDescription: 'Our certified yoga instructors and wellness experts provide personalized sessions for physical and mental well-being.'
    },
    {
      id: 13,
      name: 'Massage Therapy',
      icon: '💆‍♀️',
      description: 'Relax and rejuvenate with our massage therapy services.',
      longDescription: 'Our licensed therapists provide various massage techniques to ease stress, improve circulation, and promote relaxation.'
    },
    {
      id: 14,
      name: 'Home Sanitization',
      icon: '🧹',
      description: 'Comprehensive home sanitization services.',
      longDescription: 'Our experts use advanced equipment and eco-friendly products to sanitize your home, ensuring a healthy environment.'
    },
    {
      id: 15,
      name: 'Disinfection Services',
      icon: '💪',
      description: 'Effective disinfection services for your home and office.',
      longDescription: 'Our professionals use specialized equipment and certified disinfectants to eliminate harmful pathogens from your space.'
    },
    {
      id: 16,
      name: 'Water Purifier Installation',
      icon: '💧',
      description: 'Expert installation of water purifiers.',
      longDescription: 'Our professionals ensure safe and clean drinking water with efficient installation services.'
    },
    {
      id: 17,
      name: 'Geyser Installation',
      icon: '♨️',
      description: 'Reliable geyser installation services.',
      longDescription: 'Our experts install geysers efficiently, ensuring a consistent hot water supply for your home.'
    },
    {
      id: 18,
      name: 'Chimney Cleaning',
      icon: '🧹',
      description: 'Comprehensive chimney cleaning services.',
      longDescription: 'Our professionals clean chimneys thoroughly, ensuring safety and proper ventilation in your home.'
    },
    {
      id: 19,
      name: 'Sofa Cleaning',
      icon: '🛋️',
      description: 'Deep cleaning services for sofas.',
      longDescription: 'Our experts use eco-friendly methods to clean and restore your sofa to its original condition.'
    },
    {
      id: 20,
      name: 'Refrigerator Repair',
      icon: '🥶',
      description: 'Expert refrigerator repair services.',
      longDescription: 'Our technicians diagnose and repair refrigerator issues promptly, ensuring your food stays fresh.'
    },
    {
    id: 21,
    name: 'Zepto - Grocery Delivery',
    icon: '🛒',
    description: 'Fast and reliable grocery delivery service.',
    longDescription: 'Zepto delivers fresh groceries to your doorstep in minutes, ensuring you always have the essentials without the wait.'
  },
  {
    id: 22,
    name: 'Zomato - Food Delivery',
    icon: '🍕',
    description: 'Order food from your favorite restaurants.',
    longDescription: 'Zomato connects you with a wide variety of local and international restaurants, offering quick food delivery straight to your home.'
  },
  {
    id: 23,
    name: 'Spa Services',
    icon: '💆‍♂️',
    description: 'Luxury spa services for relaxation and rejuvenation.',
    longDescription: 'Our spa services include a range of treatments like facials, body scrubs, and massages to help you unwind and refresh.'
  },
  {
    id: 24,
    name: 'Beauty Treatments',
    icon: '💅',
    description: 'Pamper yourself with professional beauty treatments.',
    longDescription: 'Our beauty services include manicures, pedicures, hair styling, and skin care treatments for a complete beauty experience.'
  },
  {
    id: 25,
    name: 'Makeup Artist',
    icon: '💄',
    description: 'Professional makeup services for special occasions.',
    longDescription: 'Our expert makeup artists provide personalized makeup services for weddings, parties, and photoshoots, ensuring you look your best.'
  },
  {
    id: 26,
    name: 'Hair Styling',
    icon: '✂️',
    description: 'Expert hair styling services.',
    longDescription: 'From haircuts to styling, our professional hair stylists offer the latest trends and techniques to give you the perfect look.'
  },
  {
    id: 27,
    name: 'Bridal Packages',
    icon: '👰',
    description: 'Exclusive bridal packages for your special day.',
    longDescription: 'Our bridal packages include makeup, hair styling, and spa treatments to ensure you look stunning on your wedding day.'
  },
  {
    id: 28,
    name: 'Facial Treatments',
    icon: '🧴',
    description: 'Rejuvenating facial treatments for glowing skin.',
    longDescription: 'Our facial services use high-quality products and techniques to cleanse, exfoliate, and hydrate your skin for a radiant look.'
  },
  {
    id: 29,
    name: 'Nail Art and Manicure',
    icon: '💅',
    description: 'Stylish nail art and manicure services.',
    longDescription: 'Our nail experts offer a range of creative designs and treatments to keep your nails looking flawless and stylish.'
  },
  {
    id: 30,
    name: 'Body Scrubs and Wraps',
    icon: '🧼',
    description: 'Exfoliating body scrubs and wraps for smooth skin.',
    longDescription: 'Our body scrubs and wraps use natural ingredients to exfoliate and nourish your skin, leaving it soft and rejuvenated.'
  }

  ];
  

function LoaderSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450" width="100" height="100" preserveAspectRatio="xMidYMid meet">
      <g transform="matrix(1,0,0,1,228.3509979248047,220.08700561523438)" opacity="1" style={{display: "block"}}>
        <g opacity="1" transform="matrix(0.9998499751091003,0,0,1,0,0)">
          <path fill="rgb(255,255,255)" fillOpacity="1" d="M79.96237182617188,-117.83985137939453C66.02592468261719,-120.32850646972656 41.002933502197266,-114.85751342773438 25.075559616088867,-98.93014526367188C8.642492294311523,-82.49707794189453 25.793079376220703,-67.19869232177734 14.34603500366211,-54.105865478515625C-26.996849060058594,-6.791156768798828 -62.80270004272461,22.418203353881836 -113.57391357421875,76.89515686035156C-133.44290161132812,98.17544555664062 -96.42236328125,134.99465942382812 -74.68756866455078,113.7945327758789C-27.350452423095703,67.53026580810547 14.90074634552002,22.30047607421875 52.048301696777344,-13.536113739013672C65.54750061035156,-26.2939395904541 80.18937683105469,-5.046267986297607 105.76451873779297,-27.939905166625977C119.2829818725586,-40.043617248535156 130.0203857421875,-88.927978515625 114.0740966796875,-80.34213256835938C107.60359954833984,-76.85801696777344 105.09107971191406,-57.71356964111328 86.20320892333984,-57.71356964111328C72.26675415039062,-57.71356964111328 54.871463775634766,-67.01041412353516 58.305686950683594,-89.96131134033203C60.03672409057617,-101.60707092285156 91.52066802978516,-115.77626037597656 79.96237182617188,-117.83985137939453z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(0,0,0)" strokeOpacity="1" strokeWidth="6" d="M79.96237182617188,-117.83985137939453C66.02592468261719,-120.32850646972656 41.002933502197266,-114.85751342773438 25.075559616088867,-98.93014526367188C8.642492294311523,-82.49707794189453 25.793079376220703,-67.19869232177734 14.34603500366211,-54.105865478515625C-26.996849060058594,-6.791156768798828 -62.80270004272461,22.418203353881836 -113.57391357421875,76.89515686035156C-133.44290161132812,98.17544555664062 -96.42236328125,134.99465942382812 -74.68756866455078,113.7945327758789C-27.350452423095703,67.53026580810547 14.90074634552002,22.30047607421875 52.048301696777344,-13.536113739013672C65.54750061035156,-26.2939395904541 80.18937683105469,-5.046267986297607 105.76451873779297,-27.939905166625977C119.2829818725586,-40.043617248535156 130.0203857421875,-88.927978515625 114.0740966796875,-80.34213256835938C107.60359954833984,-76.85801696777344 105.09107971191406,-57.71356964111328 86.20320892333984,-57.71356964111328C72.26675415039062,-57.71356964111328 54.871463775634766,-67.01041412353516 58.305686950683594,-89.96131134033203C60.03672409057617,-101.60707092285156 91.52066802978516,-115.77626037597656 79.96237182617188,-117.83985137939453z"></path>
        </g>
      </g>
    </svg>
  )
}

function Navbar({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Book Now', page: 'booking' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-blue-600">HomeHelp</button>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`text-blue-900 hover:text-blue-600 transition duration-300 ${currentPage === item.page ? 'font-bold' : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page)
                  setIsOpen(false)
                }}
                className={`text-blue-900 hover:text-blue-600 transition duration-300 ${currentPage === item.page ? 'font-bold' : ''}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

function HomePage({ setCurrentPage }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredServices, setFilteredServices] = useState(services)

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = services.filter(service => 
      service.name.toLowerCase().includes(term) || 
      service.description.toLowerCase().includes(term)
    )
    setFilteredServices(filtered)
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white">
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-blue-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Home, Our Expertise
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-blue-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Find trusted professionals for all your home service needs
        </motion.p>
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search for a service" 
              className="w-full py-3 px-4 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
          </div>
          <button onClick={() => setCurrentPage('services')} className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
            Explore Services
            <ArrowRight className="ml-2" />
          </button>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Popular Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-4xl mb-2 block">{service.icon}</span>
              <h3 className="font-semibold text-blue-800">{service.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ServicesPage({ setCurrentPage, setSelectedService }) {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-blue-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-blue-800">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button 
                onClick={() => {
                  setSelectedService(service)
                  setCurrentPage('serviceDetail')
                }}
                className="inline-block bg-blue-600 text-white py-2  px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServiceDetailPage({ service, setCurrentPage }) {
  if (!service) {
    return <div className="container mx-auto px-4 py-20 text-center">Service not found</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <button onClick={() => setCurrentPage('services')} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2" />
          Back to Services
        </button>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{service.name}</h1>
          <div className="text-6xl mb-6">{service.icon}</div>
          <p className="text-xl mb-8 text-gray-700">{service.longDescription}</p>
          <button
            onClick={() => setCurrentPage('booking')}
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Book This Service
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    location: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Booking Confirmed!</h2>
            <p className="text-xl mb-6 text-gray-700">Thank you for choosing HomeHelp. We'll be in touch shortly to confirm your appointment.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Book Another Service
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-blue-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Book a Service
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block text-gray-700 font-bold mb-2">Service</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
                required
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderSVG />
                <span className="ml-2">Booking...</span>
              </>
            ) : (
              'Book Now'
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-blue-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          About HomeHelp
        </motion.h1>
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="container mx-auto my-12">
  <p className="text-lg mb-4">
    HomeHelp is your trusted partner for all home services. We connect you with skilled professionals to take care of your home maintenance and improvement needs.
  </p>
  <p className="text-lg mb-4">
    Our mission is to make home services accessible, reliable, and hassle-free for everyone. Whether you need a quick repair or a major renovation, we've got you covered.
  </p>
  <p className="text-lg mb-4">
    With a wide range of services and a network of vetted professionals, HomeHelp ensures that your home is always in good hands.
  </p>
  <p className="text-lg mb-4">
    Our platform is designed with user-friendliness in mind, making it easy for you to find and book the services you need in just a few clicks. Simply browse through our extensive list of services, select your desired option, and schedule a time that works for you.
  </p>
  <p className="text-lg mb-4">
    We prioritize quality and customer satisfaction. Each service provider in our network is thoroughly vetted and trained to ensure you receive the best possible service. Our team is dedicated to maintaining high standards across all services, providing you with peace of mind.
  </p>
  <p className="text-lg mb-4">
    At HomeHelp, we understand that communication is key. That’s why we offer robust customer support to assist you at every stage of your experience. Whether you have questions, need assistance with bookings, or want to share feedback, our friendly support team is always here to help.
  </p>
  <p className="text-lg mb-4">
    We value our customers and believe in building long-term relationships. Our loyalty program rewards you for your continued trust in our services, offering discounts and exclusive offers tailored just for you.
  </p>
  <p className="text-lg mb-4">
    Don't just take our word for it—read our customer testimonials to see how we’ve transformed home maintenance experiences for countless satisfied clients. We take pride in our excellent reviews and are committed to maintaining our reputation as a leading home service provider.
  </p>
  <p className="text-lg">
    Join the HomeHelp community today and experience the convenience of reliable home services at your fingertips. Let us take care of your home so you can focus on what matters most.
  </p>
  <img
    src="path/to/your/image.jpg"
    alt="HomeHelp Services"
    className="w-full h-auto mb-8 rounded-lg shadow-lg"
  />
</div>

        </motion.div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">HomeHelp</h3>
            <p className="mb-4">Your trusted partner for all home services.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition duration-300"><Facebook /></a>
              <a href="#" className="hover:text-blue-300 transition duration-300"><Twitter /></a>
              <a href="#" className="hover:text-blue-300 transition duration-300"><Instagram /></a>
              <a href="#" className="hover:text-blue-300 transition duration-300"><Linkedin /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300 transition duration-300">Services</a></li>
              <li><a href="#" className="hover:text-blue-300 transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition duration-300">Book a Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 4).map(service => (
                <li key={service.id}><a href="#" className="hover:text-blue-300 transition duration-300">{service.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>123 Service Street</p>
            <p>Cityville, State 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@homehelp.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; 2024 HomeHelp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-blue-600 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <LoaderSVG />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
          {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} setSelectedService={setSelectedService} />}
          {currentPage === 'serviceDetail' && <ServiceDetailPage service={selectedService} setCurrentPage={setCurrentPage} />}
          {currentPage === 'booking' && <BookingPage />}
          {currentPage === 'about' && <AboutPage />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}