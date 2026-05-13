import { CheckCircle2, Target, Eye, Gem } from 'lucide-react'

const AboutContent = () => {
  const values = [
    { title: "Creativity", icon: <Gem size={28} />, desc: "Breaking boundaries with innovative design concepts." },
    { title: "Quality", icon: <CheckCircle2 size={28} />, desc: "Uncompromising standards in every material and finish." },
    { title: "Transparency", icon: <Eye size={28} />, desc: "Clear communication and honest project management." },
    { title: "Precision", icon: <Target size={28} />, desc: "Attention to detail that ensures perfect execution." },
  ]

  return (
    <>
      {/* Founder Section */}
      <section className="py-16 md:py-24 lg:py-32 overflow-hidden bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center">
            <div className="relative group" data-aos="fade-right">
              <div className="absolute -inset-3 md:-inset-4 bg-accent/10 rounded-[2rem] md:rounded-[3rem] -rotate-2 md:-rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio interior" 
                className="relative rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-10 w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-48 md:h-48 bg-accent rounded-full flex items-center justify-center text-white p-4 md:p-8 text-center font-bold text-xs md:text-sm z-20 shadow-2xl animate-float">
                Est. 2024 Hyderabad
              </div>
            </div>
            
            <div className="space-y-6 md:space-y-10" data-aos="fade-left">
              <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold">The Visionaries</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-text-dark">Karan Dadga & Mounica</h3>
              <div className="w-16 md:w-20 h-1 bg-accent"></div>
              <p className="text-text-muted text-sm md:text-base leading-relaxed">
                Claur Studio brings world-class interior design to Hyderabad, crafting sophisticated, soul-filled spaces through flawless execution and a deeply personal approach that reflects each client's unique aspirations.
              </p>
              <div className="grid grid-cols-2 gap-8 md:gap-12 pt-6 md:pt-10 border-t border-gray-100">
                <div>
                  <h4 className="text-text-dark text-3xl md:text-4xl font-black mb-1">50+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Spaces Designed</p>
                </div>
                <div>
                  <h4 className="text-text-dark text-3xl md:text-4xl font-black mb-1">3+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision/Mission Cards */}
      <section className="py-16 md:py-24 bg-text-dark text-white relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
            <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-700 group" data-aos="fade-up">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-12 group-hover:scale-110 transition-transform duration-500">
                <Eye size={28} className="md:hidden" />
                <Eye size={40} className="hidden md:block" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-8">Our Vision</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                To redefine the standards of luxury living in Hyderabad, creating spaces that are not just beautiful, but are timeless expressions of art and functionality.
              </p>
            </div>
            <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-700 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-12 group-hover:scale-110 transition-transform duration-500">
                <Target size={28} className="md:hidden" />
                <Target size={40} className="hidden md:block" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-8">Our Mission</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                To provide a seamless, white-glove design experience that empowers our clients to live their best lives in environments tailored meticulously to their needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="section-container text-center">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-8" data-aos="fade-up">The Foundation</h2>
          <h3 className="text-3xl md:text-5xl font-black mb-12 md:mb-24 text-text-dark" data-aos="fade-up" data-aos-delay="100">Core Values</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="p-4 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-secondary hover:bg-accent group transition-all duration-700 cursor-default"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-8 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  {value.icon}
                </div>
                <h4 className="font-black text-lg md:text-2xl mb-2 md:mb-4 text-text-dark group-hover:text-white transition-colors">{value.title}</h4>
                <p className="text-text-muted text-xs md:text-sm group-hover:text-white/80 transition-colors leading-relaxed hidden sm:block">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutContent
