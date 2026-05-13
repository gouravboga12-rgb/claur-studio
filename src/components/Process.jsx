import { Coffee, PencilRuler, Construction, Key } from 'lucide-react'

const Process = () => {
  const steps = [
    {
      title: "Consultation",
      desc: "We begin with a deep dive into your lifestyle, needs, and vision for the space.",
      icon: <Coffee size={32} />
    },
    {
      title: "Design & Planning",
      desc: "Creating detailed 3D renders and technical layouts to visualize the dream.",
      icon: <PencilRuler size={32} />
    },
    {
      title: "Execution",
      desc: "Bringing designs to life with precision engineering and master craftsmanship.",
      icon: <Construction size={32} />
    },
    {
      title: "Handover",
      desc: "Final walkthrough and handing over the keys to your new masterpiece.",
      icon: <Key size={32} />
    }
  ]

  return (
    <section className="section-padding bg-secondary/50">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-up">Our Process</h2>
          <h3 className="text-4xl md:text-6xl font-black text-text-dark" data-aos="fade-up" data-aos-delay="100">How We Work</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] shadow-luxury hover:shadow-luxury-hover transition-all duration-700 group"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center font-black text-xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                0{index + 1}
              </div>
              <div className="w-16 h-16 bg-accent/5 text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                {step.icon}
              </div>
              <h4 className="text-2xl font-black mb-4 text-text-dark">{step.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
