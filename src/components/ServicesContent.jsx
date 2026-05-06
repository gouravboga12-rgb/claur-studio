import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ServicesContent = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ space: 'All', package: 'All', style: 'All' })

  const filterOptions = {
    space: ['All', '1BHK', '2BHK', '3BHK', 'Villa', 'Office'],
    package: ['All', 'Basic', 'Standard', 'Premium'],
    style: ['All', 'Modern', 'Minimal', 'Luxury', 'Contemporary']
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
      
      if (error) throw error
      
      if (data && data.length > 0) {
        setServices(data)
      } else {
        setServices([
          { id: 1, name: 'Residential Interiors', description: 'Complete bespoke home design solutions.', space_type: '2BHK', package: 'Standard', style: 'Modern', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' },
          { id: 2, name: 'Luxury Villa Suite', description: 'Premium interior architecture for grand villas.', space_type: 'Villa', package: 'Premium', style: 'Luxury', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
          { id: 3, name: 'Executive Office', description: 'Inspiring and functional corporate environments.', space_type: 'Office', package: 'Standard', style: 'Minimal', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
          { id: 4, name: 'Gourmet Kitchen', description: 'State-of-the-art modular kitchen systems.', space_type: 'All', package: 'Basic', style: 'Modern', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' },
        ])
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = services.filter(service => {
    return (filters.space === 'All' || service.space_type === filters.space || service.space_type === 'All') &&
           (filters.package === 'All' || service.package === filters.package) &&
           (filters.style === 'All' || service.style === filters.style)
  })

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-up">Our Offerings</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
            Tailored <span className="text-accent">Solutions</span>.
          </h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto mt-6" data-aos="fade-up" data-aos-delay="200">
            From initial sketches to final execution, we offer comprehensive design solutions that harmonize luxury with everyday functionality.
          </p>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-luxury mb-12 md:mb-24 border border-gray-100" data-aos="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12">
            {Object.keys(filterOptions).map((type) => (
              <div key={type} className="space-y-3 md:space-y-6">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 block">{type} Category</label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions[type].map((option) => (
                    <button key={option} onClick={() => setFilters({...filters, [type]: option})}
                      className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        filters[type] === option 
                        ? 'bg-accent text-white shadow-lg' 
                        : 'bg-secondary text-gray-600 hover:bg-gray-200'
                      }`}>{option}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div key={service.id} 
                  className="group relative h-[380px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-text-dark"
                  data-aos="fade-up" data-aos-delay={index * 100}>
                  <img src={service.image} alt={service.name} 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110 group-hover:opacity-40"
                    loading="lazy" />
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 bg-accent px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white shadow-xl">
                    {service.package}
                  </div>
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="max-w-md">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 text-accent text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">
                        <span>{service.space_type}</span>
                        <span className="w-1 h-1 bg-accent rounded-full"></span>
                        <span>{service.style}</span>
                      </div>
                      <h4 className="text-white text-2xl md:text-4xl font-black mb-4 md:mb-8 group-hover:text-accent transition-colors">{service.name}</h4>
                      <p className="text-white/60 text-base md:text-lg mb-8 md:mb-12 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        {service.description}
                      </p>
                      <button className="flex items-center gap-3 md:gap-4 text-white font-black tracking-widest uppercase text-xs hover:text-accent transition-all duration-300">
                        <span>Request Details</span>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                          <ArrowUpRight size={18} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 md:py-32 text-center bg-secondary rounded-[2rem] md:rounded-[3rem]">
                <h3 className="text-xl md:text-2xl font-black text-gray-400 mb-6 md:mb-8 uppercase tracking-[0.2em]">No results found.</h3>
                <button onClick={() => setFilters({ space: 'All', package: 'All', style: 'All' })} className="btn-accent mx-auto">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesContent
