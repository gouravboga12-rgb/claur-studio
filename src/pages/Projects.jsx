import ProjectsContent from '../components/ProjectsContent'
import SEO from '../components/SEO'

const Projects = () => {
  return (
    <div className="pt-24 md:pt-32">
      <SEO 
        title="Our Portfolio | Completed Design Projects"
        description="Browse through the luxury interior design projects completed by Claur Studio. Witness outstanding transformations of homes, villas, and modern kitchens in Hyderabad."
        keywords="Interior Design Portfolio Hyderabad, Completed Home Interiors, Luxury Villa Designs, Modern Apartment Design Portfolio, Claur Studio Projects"
      />
      <section className="bg-secondary py-20 md:py-32 lg:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] select-none pointer-events-none font-black text-[40vw] md:text-[30vw] leading-none uppercase">
          Gallery
        </div>
        <div className="section-container relative z-10">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-8" data-aos="fade-up">Our Portfolio</h2>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-12 tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
            Curation of <span className="text-accent">Art</span>.
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-xl md:max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            A curated showcase of our most ambitious projects, where architectural precision meets human emotion.
          </p>
        </div>
      </section>
      <ProjectsContent />
    </div>
  )
}

export default Projects
