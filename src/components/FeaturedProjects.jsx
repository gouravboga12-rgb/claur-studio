import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projectsData } from '../data/projectsData'

const FeaturedProjects = () => {
  const projects = projectsData.slice(0, 3)

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <div>
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Curated Work</h2>
            <h3 className="text-4xl md:text-6xl font-black text-text-dark" data-aos="fade-right" data-aos-delay="100">Featured Projects</h3>
          </div>
          <Link 
            to="/projects" 
            className="group flex items-center gap-4 text-text-dark font-black tracking-widest uppercase text-xs hover:text-accent transition-colors duration-500"
            data-aos="fade-left"
          >
            <span>Explore All</span>
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
              <ArrowUpRight size={20} className="group-hover:text-white" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              to={`/projects/${project.id}`}
              className="group block relative h-[400px] md:h-[550px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-2">{project.category}</span>
                <h4 className="text-white text-3xl font-black">{project.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
