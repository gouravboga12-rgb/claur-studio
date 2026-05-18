import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { useData } from '../hooks/useData'
import SEO from '../components/SEO'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects: allProjects } = useData()
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Find current project
  const projectIndex = allProjects.findIndex(p => p.id === id || p.title === id)
  const project = allProjects[projectIndex]

  // Calculate prev/next
  const prevProject = allProjects[projectIndex === 0 ? allProjects.length - 1 : projectIndex - 1]
  const nextProject = allProjects[projectIndex === allProjects.length - 1 ? 0 : projectIndex + 1]

  const handleOpenLightbox = (img, index) => {
    setSelectedImage(img)
    setSelectedImageIndex(index)
  }

  const handlePrevImage = (e) => {
    e.stopPropagation()
    if (!project) return
    const newIndex = selectedImageIndex === 0 ? project.images.length - 1 : selectedImageIndex - 1
    setSelectedImage(project.images[newIndex])
    setSelectedImageIndex(newIndex)
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    if (!project) return
    const newIndex = selectedImageIndex === project.images.length - 1 ? 0 : selectedImageIndex + 1
    setSelectedImage(project.images[newIndex])
    setSelectedImageIndex(newIndex)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage || !project) return
      if (e.key === 'ArrowLeft') {
        const newIndex = selectedImageIndex === 0 ? project.images.length - 1 : selectedImageIndex - 1
        setSelectedImage(project.images[newIndex])
        setSelectedImageIndex(newIndex)
      } else if (e.key === 'ArrowRight') {
        const newIndex = selectedImageIndex === project.images.length - 1 ? 0 : selectedImageIndex + 1
        setSelectedImage(project.images[newIndex])
        setSelectedImageIndex(newIndex)
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, selectedImageIndex, project])

  if (!project) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-black mb-8">Project Not Found</h1>
        <Link 
          to="/projects"
          className="flex items-center gap-2 mx-auto text-accent font-bold uppercase tracking-widest text-xs w-fit"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-32 bg-white">
      <SEO 
        title={`${project.title} | Portfolio Showcase`}
        description={project.description ? (project.description.length > 155 ? project.description.slice(0, 152) + '...' : project.description) : `Detail view of the completed Claur Studio project: ${project.title}.`}
        keywords={`${project.title}, ${project.category} Design Hyderabad, Claur Studio Project, Premium Home Interiors, Modern Interior Designers`}
        ogImage={project.cover_image || project.coverImage}
      />
      {/* Header */}
      <section className="bg-secondary py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] select-none pointer-events-none font-black text-[30vw] leading-none uppercase">
          {project.title.split(' ')[0]}
        </div>
        <div className="section-container relative z-10">
          <Link 
            to="/projects"
            className="flex items-center gap-2 mb-12 text-accent font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all w-fit mx-auto md:mx-0"
            data-aos="fade-right"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <h2 className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4" data-aos="fade-up">{project.category}</h2>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
            {project.title}
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            {project.description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {project.images.map((img, index) => (
              <div 
                key={index}
                className="relative group h-[300px] md:h-[450px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
                onClick={() => handleOpenLightbox(img, index)}
              >
                <img 
                  src={img.url} 
                  alt={img.room} 
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-text-dark/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 md:p-12 translate-y-8 group-hover:translate-y-0">
                  <span className="text-accent text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-2">{project.category}</span>
                  <h4 className="text-white text-xl md:text-3xl font-black">{img.room}</h4>
                  <div className="mt-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-secondary py-20">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <Link 
              to={`/projects/${prevProject.id}`}
              className="group flex flex-col items-start gap-4"
              data-aos="fade-right"
            >
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Previous Project</span>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 group-hover:text-white">
                  <ArrowLeft size={20} />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-text-dark group-hover:text-accent transition-colors">
                  {prevProject.title}
                </h3>
              </div>
            </Link>

            <Link 
              to={`/projects/${nextProject.id}`}
              className="group flex flex-col items-end gap-4 text-right"
              data-aos="fade-left"
            >
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">Next Project</span>
              <div className="flex items-center gap-4">
                <h3 className="text-2xl md:text-4xl font-black text-text-dark group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h3>
                <div className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500 group-hover:text-white">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-text-dark/95 flex items-center justify-center p-6 md:p-16 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          {/* Controls Container */}
          <div className="absolute top-8 right-8 flex items-center gap-6 z-[210]">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10">
              <button 
                onClick={handlePrevImage}
                className="p-3 text-white hover:text-accent transition-colors"
                title="Previous Image"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="w-px h-4 bg-white/20"></div>
              <button 
                onClick={handleNextImage}
                className="p-3 text-white hover:text-accent transition-colors"
                title="Next Image"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            
            <button 
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent transition-all border border-white/10" 
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
          </div>

          <div 
            className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
             <img 
              src={selectedImage.url} 
              alt={selectedImage.room} 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" 
            />
            <div className="mt-8 text-center">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">{project.title}</span>
              <h3 className="text-2xl md:text-4xl font-black text-white">{selectedImage.room}</h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-4">
                Image {selectedImageIndex + 1} of {project.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
