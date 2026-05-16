import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useData } from '../hooks/useData'

const ProjectsPreview = () => {
  const { projects: allProjects } = useData()
  const projects = allProjects.filter(p => p.category !== 'Site Execution').slice(0, 5)

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Curated Works</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight text-text-dark" data-aos="fade-right" data-aos-delay="100">
              Selected <br />
              <span className="text-accent">Portfolios</span>.
            </h3>
          </div>
          <Link 
            to="/projects" 
            className="group flex items-center gap-4 text-text-dark font-black tracking-widest uppercase text-xs hover:text-accent transition-colors duration-500"
            data-aos="fade-left"
          >
            <span>View Gallery</span>
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
              <Plus size={20} className="group-hover:text-white" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {projects.map((project, index) => {
            const size = project.size || (index % 3 === 0 ? 'large' : 'small')
            const spanClass = 
              size === 'large' ? 'lg:col-span-8' : 
              size === 'medium' ? 'lg:col-span-12' : 
              'lg:col-span-4';
            
            return (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-[2.5rem] group h-[500px] cursor-pointer ${spanClass}`}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img 
                  src={project.coverImage || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                  <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block drop-shadow-sm">{project.category}</span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-white text-3xl font-black drop-shadow-md">{project.title}</h4>
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPreview
