import { ShieldCheck, Clock, Heart, Zap } from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Quality Assurance",
      desc: "We use premium materials and maintain rigorous quality checks throughout the project.",
      icon: <ShieldCheck size={32} />
    },
    {
      title: "On-Time Delivery",
      desc: "Our project management ensures your home is ready exactly when we promised.",
      icon: <Clock size={32} />
    },
    {
      title: "Personalized Touch",
      desc: "No two homes are the same. We tailor every design to your personality.",
      icon: <Heart size={32} />
    },
    {
      title: "Seamless Experience",
      desc: "From planning to execution, we handle everything so you don't have to.",
      icon: <Zap size={32} />
    }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div data-aos="fade-right">
            <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6">The Claur Advantage</h2>
            <h3 className="text-4xl md:text-6xl font-black text-text-dark mb-8 leading-tight">Why Choose <br />Claur Studio?</h3>
            <p className="text-text-muted text-lg mb-12 leading-relaxed">
              We don't just design rooms; we create environments that enhance your quality of life. Our commitment to excellence is reflected in every project we undertake.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="w-12 h-12 shrink-0 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-text-dark mb-2">{reason.title}</h4>
                    <p className="text-text-muted text-xs leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-aos="fade-left">
            <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Interior" 
              className="relative rounded-[3rem] shadow-2xl w-full h-[500px] md:h-[600px] object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-accent font-black text-4xl mb-1">100%</div>
              <div className="text-text-dark font-bold text-xs uppercase tracking-widest">Transparency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
