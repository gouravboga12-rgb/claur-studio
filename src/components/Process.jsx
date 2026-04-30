const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      label: "Discovery",
      desc: "We begin by understanding your vision, lifestyle, and project requirements."
    },
    {
      number: "02",
      title: "Design Concept",
      label: "Visualization",
      desc: "Creating detailed 2D/3D layouts and mood boards for your approval."
    },
    {
      number: "03",
      title: "Material Selection",
      label: "Curation",
      desc: "Carefully picking textures, colors, and finishes to define the aesthetic."
    },
    {
      number: "04",
      title: "Expert Execution",
      label: "Craftsmanship",
      desc: "Our skilled team brings the design to life with meticulous attention to detail."
    },
    {
      number: "05",
      title: "Project Delivery",
      label: "Unveiling",
      desc: "Handing over your dream space, ready for you to experience and enjoy."
    }
  ]

  return (
    <section className="section-padding bg-text-dark text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-right">The Journey</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight" data-aos="fade-right" data-aos-delay="100">
              How We Create <br />
              Your <span className="text-accent italic font-light">Legacy</span>.
            </h3>
          </div>
          <div className="text-gray-400 max-w-sm text-sm" data-aos="fade-left">
            A seamless, transparent process designed to provide a stress-free experience from the first sketch to the final unveiling.
          </div>

        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-px bg-white/10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative pt-12 group"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Connector Dot */}
                <div className="hidden lg:block absolute -top-1.5 left-0 w-3 h-3 bg-white/20 rounded-full group-hover:bg-accent transition-colors duration-500"></div>
                
                <div className="flex flex-col">
                  <span className="text-accent font-black text-6xl mb-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">
                    {step.label}
                  </span>
                  <h4 className="text-2xl font-black mb-6 text-white group-hover:text-accent transition-colors duration-500">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
