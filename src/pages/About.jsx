import AboutContent from '../components/AboutContent'
import WhyChooseUs from '../components/WhyChooseUs'
import Process from '../components/Process'
import FeaturedProjects from '../components/FeaturedProjects'
import Testimonials from '../components/Testimonials'
import SEO from '../components/SEO'

const About = () => {

  return (
    <div className="pt-24 md:pt-32">
      <SEO 
        title="About Us | Architectural Precision & Artistic Flair"
        description="Learn about Claur Studio, founded by Karan Dadga and Mounica. Discover our philosophy of luxury, functionality, and architectural excellence in home interiors."
        keywords="Claur Studio Founders, Karan Dadga Interior Designer, Luxury Home Interiors Hyderabad, Modern Interior Designers Hyderabad, Premium Interior Design Studio"
      />
      {/* Premium Header */}
      <section className="bg-secondary py-20 md:py-32 lg:py-48 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] select-none pointer-events-none font-black text-[40vw] md:text-[30vw] leading-none uppercase">
          Studio
        </div>
        <div className="section-container relative z-10 text-center">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-8" data-aos="fade-up">Our Identity</h2>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-12 tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
            Designing <span className="text-accent">Legacies</span>.
          </h1>
          <p className="text-text-muted text-sm leading-relaxed mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Founded by Karan Dadga and Mounica, Claur Studio is a manifestation of architectural precision and artistic flair. We believe that a home is more than just a space—it's a legacy.
          </p>

        </div>
      </section>

      <AboutContent />

      <WhyChooseUs />

      <Process />

      <FeaturedProjects />

      <Testimonials />
    </div>
  )
}

export default About
