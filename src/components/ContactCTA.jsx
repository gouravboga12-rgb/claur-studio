import { useState } from 'react'
import { ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ContactCTA = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([formData])

      if (error) throw error
      
      setStatus('success')
      setFormData({ name: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="section-container">
        <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-luxury relative overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
            <div>
              <h2 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-8" data-aos="fade-right">Contact Us</h2>
              <h3 className="text-5xl md:text-7xl font-black leading-tight text-text-dark mb-12" data-aos="fade-right" data-aos-delay="100">
                Let's Start Your <br />
                <span className="text-accent">Journey</span>.
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-16 max-w-md" data-aos="fade-right" data-aos-delay="200">
                Experience the art of living. Schedule a private consultation with our principal designers today.
              </p>


              <div className="space-y-10">
                <div className="flex items-center gap-8 group" data-aos="fade-up" data-aos-delay="300">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-1">Call Us Directly</p>
                    <p className="text-2xl font-black text-text-dark">+91 90328 93101</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 group" data-aos="fade-up" data-aos-delay="400">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-1">Email Inquiry</p>
                    <p className="text-2xl font-black text-text-dark">claurstudio@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="bg-secondary/30 p-10 md:p-16 rounded-[3rem] border border-white"
              data-aos="fade-left"
            >
              <h4 className="text-3xl font-black mb-12 text-text-dark">Send an Inquiry</h4>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 block group-focus-within:text-accent transition-colors">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="E.g. Karan Dadga"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 outline-none focus:border-accent transition-all text-xl font-bold placeholder:text-gray-200"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 block group-focus-within:text-accent transition-colors">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 outline-none focus:border-accent transition-all text-xl font-bold placeholder:text-gray-200"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="relative group">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4 block group-focus-within:text-accent transition-colors">How can we help?</label>
                  <textarea 
                    rows="4"
                    placeholder="Briefly describe your project..."
                    className="w-full bg-transparent border-b-2 border-gray-200 py-4 outline-none focus:border-accent transition-all text-xl font-bold placeholder:text-gray-200 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full btn-accent py-6 text-lg group"
                >
                  {status === 'loading' ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Inquire Now</span>
                      <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 text-center font-bold mt-8 animate-bounce">
                    Inquiry received. We'll reach out shortly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
