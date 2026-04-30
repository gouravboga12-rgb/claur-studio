import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const EstimateContent = () => {
  const navigate = useNavigate()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="section-container relative z-10 text-center">
        <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4" data-aos="fade-up">Get an Estimate</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-text-dark mb-4 md:mb-6" data-aos="fade-up" data-aos-delay="50">
          Plan your <span className="text-accent italic font-light">dream home</span>
        </h3>
        <p className="text-text-muted text-sm md:text-base mb-12 md:mb-20" data-aos="fade-up" data-aos-delay="100">
          Calculate the approximate cost of doing up your interiors
        </p>

        {/* Visual Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
          {[
            { id: 'Full Interiors', title: 'Full Home', desc: 'Get an approximate costing for your full home interiors.', icon: '🏠', popular: true },
            { id: 'Modular Kitchen', title: 'Kitchen', desc: 'Get an approximate costing for your kitchen interior.', icon: '🍱', popular: false },
            { id: 'Wardrobe Only', title: 'Wardrobe', desc: 'Get an approximate costing for your wardrobe.', icon: '🚪', popular: false },
          ].map((card, i) => (
            <div 
              key={card.id}
              onClick={() => navigate(`/estimate-form?service=${encodeURIComponent(card.id)}`)}
              className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group cursor-pointer hover:shadow-luxury transition-all duration-500 relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={200 + (i * 100)}
            >
              {card.popular && (
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-accent/20">
                  Popular
                </div>
              )}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-full flex items-center justify-center text-3xl md:text-4xl mb-5 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-text-dark mb-2 md:mb-4">{card.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed mb-6 md:mb-10 max-w-[180px] md:max-w-[200px]">{card.desc}</p>
              <button className="w-full bg-[#FF5A5F] text-white font-black text-[10px] uppercase tracking-widest py-3 md:py-4 px-6 md:px-8 rounded-full flex items-center justify-center gap-2 group-hover:bg-text-dark transition-colors">
                <span>Calculate</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EstimateContent
