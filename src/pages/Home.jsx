import Hero from '../components/Hero'
import AboutContent from '../components/AboutContent'
import WhyChooseUs from '../components/WhyChooseUs'
import Process from '../components/Process'
import FeaturedProjects from '../components/FeaturedProjects'
import Testimonials from '../components/Testimonials'
import ServicesContent from '../components/ServicesContent'
import EstimateContent from '../components/EstimateContent'
import ContactContent from '../components/ContactContent'
import SEO from '../components/SEO'
import LocalBusinessSchema from '../components/LocalBusinessSchema'

const Home = () => {
  return (
    <div>
      <SEO 
        title="Modern & Luxury Interior Designers in Hyderabad"
        description="Claur Studio is a premium interior design firm in Hyderabad, specializing in modern, elegant, and space-efficient home interiors, luxury modular kitchens, and villa renovations."
        keywords="Interior Designers in Hyderabad, Luxury Home Interiors Hyderabad, 2BHK Interior Design Hyderabad, Modern Interior Designers Hyderabad, Best Home Decorators Hyderabad, Premium Villa Interiors Hyderabad, Claur Studio"
      />
      <LocalBusinessSchema />
      <Hero />
      <Testimonials />
      
      <div id="about">
        <AboutContent />
      </div>

      <WhyChooseUs />

      <div id="services">
        <ServicesContent />
      </div>

      <Process />

      <FeaturedProjects />



      <div id="estimate">
        <div className="bg-[#FAF7F2]">
          <EstimateContent />
        </div>
      </div>

      <div id="contact">
        <ContactContent />
      </div>
    </div>
  )
}

export default Home
