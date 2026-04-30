import Hero from '../components/Hero'
import AboutContent from '../components/AboutContent'
import ServicesContent from '../components/ServicesContent'
import ProjectsContent from '../components/ProjectsContent'
import EstimateContent from '../components/EstimateContent'
import ContactContent from '../components/ContactContent'

const Home = () => {
  return (
    <div>
      <Hero />
      
      <div id="about">
        <AboutContent />
      </div>

      <div id="services">
        <ServicesContent />
      </div>

      <div id="projects">
        <ProjectsContent />
      </div>

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
