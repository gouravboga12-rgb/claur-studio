import Hero from '../components/Hero'
import AboutContent from '../components/AboutContent'
import WhyChooseUs from '../components/WhyChooseUs'
import Process from '../components/Process'
import FeaturedProjects from '../components/FeaturedProjects'
import Testimonials from '../components/Testimonials'
import ServicesContent from '../components/ServicesContent'
import EstimateContent from '../components/EstimateContent'
import ContactContent from '../components/ContactContent'

const Home = () => {
  return (
    <div>
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
