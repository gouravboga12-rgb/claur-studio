import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import { useData } from '../hooks/useData'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'

const ServiceInquiry = () => {
  const { serviceId } = useParams()
  const { services, loading } = useData()
  const service = services.find(s => String(s.id) === String(serviceId))
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({})

  if (loading && !submitted) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Studio Details...</p>
      </div>
    )
  }

  if (!service && !submitted) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-4xl font-black mb-8">Service Not Found</h1>
        <Link to="/services" className="text-accent font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Services
        </Link>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      const currentValues = formData[name] || []
      if (checked) {
        setFormData({ ...formData, [name]: [...currentValues, value] })
      } else {
        setFormData({ ...formData, [name]: currentValues.filter(v => v !== value) })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: `[SERVICE INQUIRY: ${service.title || service.name}]\n` + 
                   Object.entries(formData)
                     .filter(([key]) => !['fullName', 'email', 'phone'].includes(key))
                     .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
                     .join('\n')
        }])
      
      if (error) throw error

      // WhatsApp Alert
      const { data: settingsData } = await supabase.from('settings').select('*')
      const settings = Object.fromEntries(settingsData?.map(s => [s.key, s.value]) || [])
      const adminWhatsApp = settings.whatsapp || '919032893101'
      const waMessage = `🛠️ *New Service Inquiry* 🛠️%0A%0A*Service:* ${service.title || service.name}%0A*Client:* ${formData.fullName}%0A*Phone:* ${formData.phone}%0A%0A👉 _Check Admin Panel for full details._`
      
      window.open(`https://wa.me/${adminWhatsApp}?text=${waMessage}`, '_blank')

      setSubmitted(true)
      window.scrollTo(0, 0)
    } catch (err) {
      console.error('Error submitting inquiry:', err)
      alert('There was an error submitting your inquiry. Please try again.')
    }
  }

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-secondary/30">
      <SEO 
        title={`Inquire about ${service ? service.name : 'Service'}`}
        description={`Submit a design inquiry for ${service ? (service.name + ' interiors') : 'interior services'} with Claur Studio. Custom luxury renovations and space design in Hyderabad.`}
        keywords={`Inquire ${service ? service.name : 'Service'}, Premium Design Consultation, Claur Studio Services, Interior Design Hyderabad`}
      />
      <div className="section-container py-12 md:py-20">
        <Link 
          to="/services" 
          className="flex items-center gap-2 mb-12 text-accent font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Services
        </Link>

        {submitted ? (
          <section className="py-12 md:py-24 flex items-center justify-center">
            <div className="w-full max-w-2xl text-center bg-white p-12 md:p-20 rounded-[3rem] shadow-luxury" data-aos="zoom-in">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-text-dark mb-6">Thank You!</h2>
              <p className="text-xl text-text-muted mb-12 leading-relaxed">
                We've received your inquiry. Our team will review your requirements and <strong>we will get back to you soon</strong>.
              </p>
              <Link to="/services" className="btn-accent px-12 py-4 inline-block">Back to Services</Link>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div data-aos="fade-right">
              <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6">Inquiry Form</h2>
              <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-text-dark leading-tight">
                Tell us about your <span className="text-accent">{service.name}</span> project.
              </h1>
              <p className="text-text-muted text-lg mb-12 leading-relaxed">
                Fill out the details below so we can prepare a personalized design consultation for you.
              </p>

              <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden group">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">{service.package}</span>
                  <h3 className="text-white text-2xl font-black">{service.name}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-luxury border border-gray-100" data-aos="fade-left">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Standard Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      type="text" required name="fullName" onChange={handleInputChange}
                      className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      type="email" required name="email" onChange={handleInputChange}
                      className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                  <input 
                    type="tel" required name="phone" onChange={handleInputChange}
                    className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="w-full h-px bg-gray-100 my-8"></div>

                {/* Dynamic Service Specific Fields */}
                {(service.form_fields || service.formFields || []).map((field) => (
                  <div key={field.name} className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{field.label}</label>
                    
                    {field.type === 'select' && (
                      <select 
                        name={field.name} onChange={handleInputChange}
                        className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all appearance-none cursor-pointer font-bold text-sm"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}

                    {field.type === 'number' && (
                      <input 
                        type="number" name={field.name} onChange={handleInputChange}
                        className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all font-bold text-sm"
                        placeholder={field.placeholder || "Enter number..."}
                      />
                    )}

                    {field.type === 'checkbox' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        {field.options?.map(opt => (
                          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" name={field.name} value={opt} onChange={handleInputChange}
                              className="w-5 h-5 rounded border-none bg-secondary text-accent focus:ring-accent cursor-pointer"
                            />
                            <span className="text-sm text-gray-600 group-hover:text-text-dark transition-colors font-bold">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {field.type === 'text' && (
                      <input 
                        type="text" name={field.name} onChange={handleInputChange}
                        className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all font-bold text-sm"
                        placeholder={field.placeholder || "Enter details..."}
                      />
                    )}
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Additional Message</label>
                  <textarea 
                    name="message" rows="4" onChange={handleInputChange}
                    className="w-full bg-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                    placeholder="Tell us more about your vision..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-accent flex items-center justify-center gap-4 group py-5">
                  <span>Send Inquiry</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
              </div>
            )}
      </div>
    </div>
  )
}

export default ServiceInquiry
