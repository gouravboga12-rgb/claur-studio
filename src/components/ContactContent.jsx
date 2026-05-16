import { useState } from 'react'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useData } from '../hooks/useData'

const ContactContent = () => {
  const { settings } = useData()
  const serviceOptions = ['Full Home Interiors', 'Modular Kitchen', 'Wardrobe Design', 'Living Room', 'Bedroom', 'Office / Commercial', 'Others']
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', serviceType: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const { error } = await supabase.from('enquiries').insert([{
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: `[CONTACT INQUIRY]\nService: ${formData.serviceType}\nMessage: ${formData.message}`
      }])
      if (error) throw error

      // WhatsApp Alert
      const adminWhatsApp = settings.whatsapp || '919032893101'
      const waMessage = `✨ *New Contact Inquiry* ✨%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.serviceType}%0A*Message:* ${formData.message}%0A%0A👉 _Check Admin Panel for full details._`
      
      window.open(`https://wa.me/${adminWhatsApp}?text=${waMessage}`, '_blank')

      setStatus('success')
      setFormData({ name: '', phone: '', email: '', serviceType: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="py-24 md:py-32 bg-white">
        <div className="section-container max-w-2xl text-center">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-luxury" data-aos="zoom-in">
            <Send size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-text-dark mb-6" data-aos="fade-up">Thank You!</h2>
          <p className="text-xl text-text-muted mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Your message has been received. We've sent a notification to our team, and we'll get back to you soon.
          </p>
          <button onClick={() => setStatus('idle')} className="btn-accent px-12 py-4">Back to Form</button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 md:py-20 overflow-hidden bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8 md:space-y-12">
              <div>
                <h2 className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 md:mb-6" data-aos="fade-right">Concierge</h2>
                <h3 className="text-2xl md:text-4xl font-black text-text-dark leading-tight" data-aos="fade-right" data-aos-delay="100">Our Studio <br />Details.</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
                {[
                  { icon: <Phone size={22} />, label: 'Speak to us', value: settings.phone || '+91 90328 93101', link: `tel:${settings.phone}` },
                  { icon: <Mail size={22} />, label: 'Inquiry Email', value: settings.email || 'claurstudio@gmail.com', breakAll: true, link: `mailto:${settings.email}` },
                  { icon: <MapPin size={22} />, label: 'Our Studio', value: settings.address || 'Service Rd, Chandrapuri Colony, L.B. Nagar, Hyderabad - 500074' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 md:gap-6 group" data-aos="fade-right" data-aos-delay={200 + i * 100}>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-xl md:rounded-2xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-1">{item.label}</h4>
                      {item.link ? (
                        <a href={item.link} className={`text-base md:text-xl font-black text-text-dark leading-snug hover:text-accent transition-colors ${item.breakAll ? 'break-all' : ''}`}>{item.value}</a>
                      ) : (
                        <p className={`text-base md:text-xl font-black text-text-dark leading-snug ${item.breakAll ? 'break-all' : ''}`}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-luxury border border-gray-100">
                <h4 className="text-xl md:text-3xl font-black mb-6 md:mb-8 text-text-dark">Get a Free Quote</h4>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="relative group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-3 block group-focus-within:text-accent transition-colors">Your Name</label>
                    <input type="text" required placeholder="Full name"
                      className="w-full bg-transparent border-b-2 border-gray-100 py-2.5 md:py-3 outline-none focus:border-accent transition-all text-base md:text-lg font-bold"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="relative group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-3 block group-focus-within:text-accent transition-colors">Phone Number</label>
                    <input type="tel" required placeholder="Mobile number"
                      className="w-full bg-transparent border-b-2 border-gray-100 py-2.5 md:py-3 outline-none focus:border-accent transition-all text-base md:text-lg font-bold"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="sm:col-span-2 relative group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-3 block group-focus-within:text-accent transition-colors">Email Address</label>
                    <input type="email" required placeholder="Enter your email"
                      className="w-full bg-transparent border-b-2 border-gray-100 py-2.5 md:py-3 outline-none focus:border-accent transition-all text-base md:text-lg font-bold"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="sm:col-span-2 relative group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-3 md:mb-4 block">Type of Service</label>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((svc) => (
                        <button key={svc} type="button" onClick={() => setFormData({...formData, serviceType: svc})}
                          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[9px] md:text-[10px] transition-all duration-300 border-2 ${
                            formData.serviceType === svc
                              ? 'border-accent bg-accent text-white shadow-lg'
                              : 'border-gray-100 bg-secondary text-text-muted hover:border-accent/40'
                          }`}>{svc}</button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2 relative group">
                    <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-3 block group-focus-within:text-accent transition-colors">Project Details</label>
                    <textarea rows="3" placeholder="Briefly describe your vision..."
                      className="w-full bg-transparent border-b-2 border-gray-100 py-2.5 md:py-3 outline-none focus:border-accent transition-all text-base md:text-lg font-bold resize-none"
                      value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === 'loading'}
                      className="btn-accent px-8 md:px-12 py-3.5 md:py-4 text-xs md:text-base group w-full sm:w-auto">
                      {status === 'loading' ? (
                        <span className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <span>Get Free Quote</span>
                          <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                        </>
                      )}
                    </button>
                    {status === 'success' && (
                      <p className="text-green-600 font-bold mt-5 md:mt-8 flex items-center gap-2 text-xs md:text-sm">
                        <span className="w-2 h-2 bg-green-600 rounded-full shrink-0"></span>
                        Our team will contact you within 24 hours.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="section-container">
          <div className="h-[280px] sm:h-[350px] md:h-[400px] w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-luxury border border-gray-100" data-aos="zoom-in">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.386121434316!2d78.55102727493375!3d17.3451462039912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99fc88cd9c0f%3A0x7023e82bd3c03bc0!2sClaur%20Studio!5e0!3m2!1sen!2sin!4v1747147774771!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Claur Studio Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactContent
