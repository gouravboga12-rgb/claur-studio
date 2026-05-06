import { useState, useEffect } from 'react'
import { X, Maximize2, ArrowUpRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ProjectsContent = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Office']

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
      
      if (error) throw error
      
      let projectList = []
      if (data && data.length > 0) {
        projectList = data.map(p => {
          if (p.category === 'Kitchen' || (p.title && p.title.toLowerCase().includes('chef'))) {
            return { ...p, image: '/kitchen-1.png', title: 'Culinary Masterpiece' }
          }
          return p
        })
      } else {
        projectList = [
          { id: 1, title: 'Modern Minimalist Living', category: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', description: 'A seamless blend of comfort and contemporary aesthetics.' },
          { id: 2, title: 'Culinary Masterpiece', category: 'Kitchen', image: '/kitchen-1.png', description: 'Functional luxury designed for the modern chef.' },
          { id: 3, title: 'Imperial Suite', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800', description: 'Restorative elegance with a touch of grandeur.' },
          { id: 4, title: 'Zen Workspace', category: 'Office', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800', description: 'Promoting focus through thoughtful spatial design.' },
          { id: 5, title: 'Sophisticated Lounge', category: 'Living Room', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=800', description: 'Refined social spaces for unforgettable moments.' },
          { id: 6, title: 'Urban Bistro Kitchen', category: 'Kitchen', image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=800', description: 'Maximizing style in a compact, efficient layout.' },
        ]
      }
      setProjects(projectList)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter)

  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-up">Our Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
              Curation of <span className="text-accent">Art</span>.
            </h3>
            <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-delay="200">
              A curated showcase of our most ambitious projects, where architectural precision meets human emotion.
            </p>

            {/* Luxury Filter */}
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 shadow-sm ${
                    filter === cat 
                    ? 'bg-text-dark text-white shadow-2xl scale-110' 
                    : 'bg-secondary text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-gray-100 h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="relative group h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-text-dark/80 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-6 md:p-12 translate-y-8 group-hover:translate-y-0">
                    <span className="text-accent text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-2 md:mb-4">{project.category}</span>
                    <h4 className="text-white text-xl md:text-3xl font-black mb-3 md:mb-6">{project.title}</h4>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[200] bg-text-dark/95 flex items-center justify-center p-6 md:p-16 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <button 
            className="absolute top-12 right-12 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedProject(null)}
          >
            <X size={48} />
          </button>
          
          <div 
            className="max-w-5xl w-full flex flex-col lg:flex-row bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="lg:w-[65%] h-[250px] sm:h-[350px] lg:h-[700px]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-[35%] p-8 md:p-16 flex flex-col justify-center">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{selectedProject.category}</span>
              <h3 className="text-3xl md:text-5xl font-black mb-4 md:mb-8 text-text-dark leading-tight">{selectedProject.title}</h3>
              <p className="text-text-muted text-base md:text-xl leading-relaxed mb-8 md:mb-16">{selectedProject.description}</p>
              <button className="btn-accent py-4 md:py-6 group" onClick={() => { window.location.href = '/estimate' }}>
                <span>Request Quotation</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsContent
