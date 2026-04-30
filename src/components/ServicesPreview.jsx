import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const ServicesPreview = () => {
  const services = [
    {
      title: "Residential Interiors",
      desc: "Transforming private residences into personalized sanctuaries of style and comfort.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200",
      category: "Home"
    },
    {
      title: "Commercial Spaces",
      desc: "Strategic design solutions for high-performance offices and retail environments.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      category: "Work"
    },
    {
      title: "Architectural Planning",
      desc: "Precise 2D/3D layouts that serve as the blueprint for your dream environment.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
      category: "Plan"
    }


  ]

  return (
    <section className="section-padding overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Our Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight text-text-dark" data-aos="fade-right" data-aos-delay="100">
              Solutions for Every <br />
              <span className="italic font-light">Dimension</span>.
            </h3>
          </div>
          <Link 
            to="/services" 
            className="group flex items-center gap-4 text-text-dark font-black tracking-widest uppercase text-xs hover:text-accent transition-colors duration-500"
            data-aos="fade-left"
          >
            <span>View All Services</span>
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
              <ArrowUpRight size={20} className="group-hover:text-white" />
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div className="max-w-xl">
                    <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">{service.category}</span>
                    <h4 className="text-white text-4xl md:text-5xl font-black mb-6">{service.title}</h4>
                    <p className="text-white/60 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      {service.desc}
                    </p>

                  </div>
                  <Link 
                    to="/services"
                    className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-500"
                  >
                    <ArrowUpRight size={32} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
