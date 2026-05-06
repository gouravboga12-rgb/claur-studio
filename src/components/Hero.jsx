import { Link } from 'react-router-dom'
import { ChevronRight, Phone, MessageSquare, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 lg:via-white/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-white/30 lg:bg-transparent"></div>
        </div>
      </div>

      <div className="section-container relative z-10 w-full pt-32 md:pt-40 lg:pt-48 pb-20">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div 
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] mb-6 md:mb-8"
            data-aos="fade-right"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Premium Interior Design Hyderabad
          </div>

          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] font-black mb-6 md:mb-8 leading-[0.9] text-text-dark"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            We Design <br />
            <span className="text-accent">Dream</span> Spaces
          </h1>
          
          <p 
            className="text-sm md:text-base mb-8 md:mb-12 max-w-sm md:max-w-xl text-text-muted leading-relaxed"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            Modern, functional, and elegant interiors tailored to your unique lifestyle. 
            Transforming Hyderabad's finest homes into architectural masterpieces.
          </p>

          <div 
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 md:mb-20"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <Link to="/estimate" className="btn-accent px-7 py-4 md:px-10 md:py-5 group shadow-2xl text-xs">
              <span>Get Free Estimate</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/projects" className="flex items-center gap-3 md:gap-4 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <Play size={18} className="text-text-dark group-hover:text-white ml-1" fill="currentColor" />
              </div>
              <span className="font-bold tracking-widest uppercase text-xs">View Projects</span>
            </Link>
          </div>

          <div 
            className="flex flex-wrap items-center gap-6 md:gap-12"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-text-dark">50+</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Projects Delivered</span>
            </div>
            <div className="w-px h-10 md:h-12 bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-text-dark">10+</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Design Awards</span>
            </div>
            <div className="w-px h-10 md:h-12 bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-text-dark">100%</span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Label - desktop only */}
      <div className="absolute right-10 bottom-32 origin-right -rotate-90 hidden xl:flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-text-muted">Explore Our Portfolio</span>
        <div className="w-20 h-px bg-accent"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 flex items-center gap-4 md:gap-6 text-text-dark/40">
        <div className="relative w-5 h-8 md:w-6 md:h-10 border-2 border-text-dark/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce"></div>
        </div>
        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] hidden sm:block">Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero
