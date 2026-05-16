import { Quote, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useData } from '../hooks/useData'

const Testimonials = () => {
  const { testimonials: dynamicReviews } = useData()
  
  const initialReviews = [
    {
      name: "Bala koti",
      role: "Homeowner",
      review: "The best part about working with Claur Studio was the attention to detail. From laminates to lighting suggestions, everything was thoughtfully planned. The final outcome looked premium.",
      rating: 5,
      projectId: "project-1"
    },
    {
      name: "Subhash",
      role: "3BHK Owner",
      review: "Claur Studio completely transformed our 3BHK into a modern and functional space. The designs were elegant, practical, and exactly what we wanted. Execution was smooth and the team was very responsive throughout the project.",
      rating: 5,
      projectId: "project-2"
    },
    {
      name: "Srinivas",
      role: "Homeowner",
      review: "Minimal, classy, and practical designs. Claur Studio gave our home a completely fresh feel while keeping everything functional for daily use.",
      rating: 5,
      projectId: "project-3"
    },
    {
      name: "Surya",
      role: "Homeowner",
      review: "Very happy with the 3D designs and space planning. Every corner was utilized beautifully without making the house feel crowded. Highly recommend Claur Studio for contemporary interiors.",
      rating: 5,
      projectId: "project-4"
    },
    {
      name: "Raghu",
      role: "Homeowner",
      review: "Professional service and excellent communication. The 3D visualization helped us clearly understand the final look before execution started. Overall a very good experience.",
      rating: 5,
      projectId: "project-5"
    }
  ]

  const reviews = dynamicReviews && dynamicReviews.length > 0 ? dynamicReviews : initialReviews

  return (
    <section className="py-20 bg-text-dark text-white overflow-hidden border-y border-white/5">
      <div className="section-container mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-black">What Our Client Says</h3>
          </div>
          <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[200px]">
            Hover to pause and read reviews
          </p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-8 py-4">
          {[...reviews, ...reviews].map((review, index) => (
            <Link 
              key={index}
              to={`/projects/${review.project_id || review.projectId}`}
              className="inline-block w-[350px] md:w-[450px] p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-700 relative group whitespace-normal"
            >
              <Quote className="absolute top-8 right-8 text-accent/20 group-hover:text-accent/40 transition-colors" size={40} />
              <div className="flex gap-1 mb-6 text-accent">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-400 text-sm md:text-base italic mb-8 leading-relaxed">
                "{review.review}"
              </p>
              <div>
                <h4 className="font-black text-lg mb-1">{review.name}</h4>
                <div className="flex justify-between items-end">
                  <p className="text-accent text-[10px] font-bold uppercase tracking-widest">{review.role}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors flex items-center gap-2">
                    View Project <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
