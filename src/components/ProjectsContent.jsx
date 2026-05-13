import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projectsData, siteProjectsData } from '../data/projectsData'

const ProjectsContent = () => {
  return (
    <div className="bg-white">
      {/* Our Portfolio Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="mb-16 md:mb-24">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Our Portfolio</h2>
            <h3 className="text-3xl md:text-6xl font-black text-text-dark" data-aos="fade-right" data-aos-delay="100">Featured Projects</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projectsData.map((project, index) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block relative h-[400px] md:h-[550px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-2">{project.category}</span>
                  <h4 className="text-white text-2xl md:text-4xl font-black mb-4">{project.title}</h4>
                  <div className="flex items-center gap-3 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span>View Gallery</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Site Execution Section */}
      <section className="section-padding bg-secondary/50">
        <div className="section-container">
          <div className="mb-16 md:mb-24">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Process & Execution</h2>
            <h3 className="text-3xl md:text-6xl font-black text-text-dark" data-aos="fade-right" data-aos-delay="100">Site Execution</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {siteProjectsData.map((project, index) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block relative h-[350px] md:h-[500px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-2">{project.category}</span>
                  <h4 className="text-white text-3xl md:text-4xl font-black mb-4">{project.title}</h4>
                  <div className="flex items-center gap-3 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span>View Progress Images</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsContent
