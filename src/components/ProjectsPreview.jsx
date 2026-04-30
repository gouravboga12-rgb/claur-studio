import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'




const ProjectsPreview = () => {
  const projects = [
    {
      title: "The Minimalist Loft",
      category: "Living Room",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
      size: "large"
    },
    {
      title: "Culinary Masterpiece",
      category: "Kitchen",
      image: "/kitchen-1.png",
      size: "small"
    },
    {
      title: "Velvet Suite",
      category: "Bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200",
      size: "small"
    },
    {
      title: "The Royal Ensuite",
      category: "Bath",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200",
      size: "large"
    },
    {
      title: "Corporate Zen",
      category: "Office",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
      size: "medium"
    }
  ]

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">Curated Works</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight text-text-dark" data-aos="fade-right" data-aos-delay="100">
              Selected <br />
              <span className="text-accent italic font-light">Portfolios</span>.
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
            const spanClass = 
              project.size === 'large' ? 'lg:col-span-8' : 
              project.size === 'medium' ? 'lg:col-span-12' : 
              'lg:col-span-4';
            
            return (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-[2.5rem] group h-[500px] cursor-pointer ${spanClass}`}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/90 via-text-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                  <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">{project.category}</span>
                  <div className="flex justify-between items-center">
                    <h4 className="text-white text-3xl font-black">{project.title}</h4>
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
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
