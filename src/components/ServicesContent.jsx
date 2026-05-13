import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { servicesData } from '../data/servicesData'

const ServicesContent = () => {
  const [services, setServices] = useState(servicesData)
  const [loading, setLoading] = useState(false)

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Section Heading */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-up">Our Offerings</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
            Tailored <span className="text-accent">Solutions</span>.
          </h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto mt-6" data-aos="fade-up" data-aos-delay="200">
            From initial sketches to final execution, we offer comprehensive design solutions that harmonize luxury with everyday functionality.
          </p>
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
            {services.map((service, index) => (
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
                      <Link 
                        to={`/services/${service.id}/inquiry`}
                        className="flex items-center gap-3 md:gap-4 text-white font-black tracking-widest uppercase text-xs hover:text-accent transition-all duration-300 w-fit"
                      >
                        <span>Request Details</span>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                          <ArrowUpRight size={18} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesContent
