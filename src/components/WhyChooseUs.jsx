import { Users, Award, Clock, ShieldCheck, Sparkles } from 'lucide-react'

const WhyChooseUs = () => {
  const points = [
    {
      title: "Experienced Design Team",
      desc: "Creative minds with over a decade of expertise in high-end luxury interiors.",
      icon: <Users size={28} />
    },
    {
      title: "Customized Solutions",
      desc: "Bespoke designs tailored meticulously to your unique personality and lifestyle.",
      icon: <Sparkles size={28} />
    },
    {
      title: "End-to-End Services",
      desc: "Comprehensive management from the initial concept to the final white-glove delivery.",
      icon: <Award size={28} />
    },
    {
      title: "Timely Delivery",
      desc: "Disciplined project management ensuring every milestone is met with precision.",
      icon: <Clock size={28} />
    },
    {
      title: "Superior Quality",
      desc: "Premium materials sourced from top-tier global suppliers for lasting elegance.",
      icon: <ShieldCheck size={28} />
    }
  ]

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative Text Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-black text-black/[0.02] whitespace-nowrap select-none pointer-events-none uppercase">
        Excellence
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-24">
          <div className="max-w-2xl">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6" data-aos="fade-up">Our Distinction</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight text-text-dark" data-aos="fade-up" data-aos-delay="100">
              Crafting Spaces That <br />
              <span className="text-accent">Redefine</span> Living.
            </h3>
          </div>
          <p className="text-text-muted text-sm max-w-sm mb-2" data-aos="fade-up" data-aos-delay="200">
            We blend artistic vision with functional precision to create interiors that are as practical as they are breathtaking.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[2rem] shadow-luxury hover:shadow-luxury-hover transition-all duration-700 flex flex-col group border border-transparent hover:border-accent/10"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-8 w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                {point.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 text-text-dark">{point.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{point.desc}</p>
              
              <div className="mt-auto pt-8 flex justify-end">
                <span className="text-4xl font-black text-black/[0.03] group-hover:text-accent/10 transition-colors duration-500">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
