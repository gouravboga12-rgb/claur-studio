import ServicesContent from '../components/ServicesContent'

const Services = () => {
  return (
    <div className="pt-24 md:pt-32">
      <section className="bg-text-dark text-white py-20 md:py-32 lg:py-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] select-none pointer-events-none font-black text-[40vw] md:text-[30vw] leading-none uppercase text-right">
          Expertise
        </div>
        <div className="section-container relative z-10 text-center">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-8" data-aos="fade-up">Our Offerings</h2>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-12 tracking-tight" data-aos="fade-up" data-aos-delay="100">
            Tailored <span className="text-accent italic font-light">Solutions</span>.
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl md:max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            From initial sketches to final execution, we offer comprehensive design solutions that harmonize luxury with everyday functionality.
          </p>
        </div>
      </section>
      <ServicesContent />
    </div>
  )
}

export default Services
