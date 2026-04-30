import ContactContent from '../components/ContactContent'

const Contact = () => {
  return (
    <div className="pt-24 md:pt-32">
      <section className="bg-text-dark text-white py-20 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] select-none pointer-events-none font-black text-[30vw] md:text-[20vw] leading-none uppercase text-right">
          Inquiry
        </div>
        <div className="section-container relative z-10 text-center">
          <h2 className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 md:mb-6" data-aos="fade-up">Free Consultation</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-5 md:mb-8 tracking-tight" data-aos="fade-up" data-aos-delay="100">
            Get a <br />
            <span className="text-accent italic font-light">Free Quote</span>.
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl md:max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Tell us about your dream space. We'll get back to you within 24 hours with a personalized quote — no hidden charges.
          </p>
        </div>
      </section>
      <ContactContent />
    </div>
  )
}

export default Contact
