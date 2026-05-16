import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Send, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useData } from '../hooks/useData'

const EstimateForm = () => {
  const { settings } = useData()
  const [searchParams] = useSearchParams()
  const serviceFromParam = searchParams.get('service') || 'Full Interiors'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '2BHK',
    serviceType: serviceFromParam,
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const projectTypes = ['1BHK', '2BHK', '3BHK', 'Villa', 'Office', 'Other']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: `[ESTIMATE REQUEST]\nService: ${formData.serviceType}\nProject: ${formData.projectType}\nNotes: ${formData.message}`
        }])
      if (error) throw error
      
      // WhatsApp Alert
      const adminWhatsApp = settings.whatsapp || '919032893101'
      const waMessage = `📋 *New Estimate Request* 📋%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.serviceType}%0A*Project:* ${formData.projectType}%0A%0A👉 _Check Admin Panel for full details._`
      
      window.open(`https://wa.me/${adminWhatsApp}?text=${waMessage}`, '_blank')

      setStatus('success')
      setFormData({ name: '', phone: '', email: '', projectType: '2BHK', serviceType: serviceFromParam, message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="section-container max-w-2xl text-center bg-white p-12 md:p-20 rounded-[3rem] shadow-luxury" data-aos="zoom-in">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-text-dark mb-6">Thank You!</h2>
          <p className="text-xl text-text-muted mb-12 leading-relaxed">
            We've received your estimate request for <strong>{serviceLabel}</strong>. Our team will prepare a personalized quote and get back to you soon.
          </p>
          <Link to="/estimate" className="btn-accent px-12 py-4 inline-block">Calculate Another</Link>
        </div>
      </div>
    )
  }

  const serviceLabel = {
    'Full Interiors': 'Full Home Interiors',
    'Modular Kitchen': 'Kitchen Interiors',
    'Wardrobe Only': 'Wardrobe Design',
  }[serviceFromParam] || serviceFromParam

  return (
    <div className="pt-20 min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <section className="bg-text-dark text-white py-20 relative overflow-hidden">
        <div className="section-container relative z-10">
          <Link to="/estimate" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity">
            <ArrowLeft size={14} /> Back to Selection
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {serviceLabel}
          </h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Fill in your details below and our design team will reach out with a personalized quote within 24 hours. No hidden charges, ever.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24">
        <div className="section-container max-w-3xl">
          <div className="bg-white rounded-[3rem] shadow-luxury p-8 md:p-16 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Karan Dadga"
                    className="w-full bg-secondary/50 rounded-2xl p-5 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 border-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    className="w-full bg-secondary/50 rounded-2xl p-5 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 border-none"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-secondary/50 rounded-2xl p-5 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 border-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Project Type */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 block">Select Project Type</label>
                <div className="flex flex-wrap gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, projectType: type})}
                      className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                        formData.projectType === type
                          ? 'bg-accent text-white shadow-lg'
                          : 'bg-secondary text-text-muted hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Additional Notes</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your dream space..."
                  className="w-full bg-secondary/50 rounded-2xl p-5 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 resize-none border-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-accent py-6 text-lg group shadow-2xl"
              >
                {status === 'loading' ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Get Free Estimate</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-center gap-4 text-green-700">
                  <CheckCircle2 />
                  <p className="font-bold">Request received! Our team will contact you within 24 hours.</p>
                </div>
              )}
            </form>
          </div>

          {/* Quick Contact */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919032893101"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-text-dark font-bold text-xs uppercase tracking-widest hover:bg-text-dark hover:text-white transition-all duration-500"
            >
              📞 Call Us Now
            </a>
            <a
              href="https://wa.me/919032893101?text=Hi%2C%20I%20would%20like%20to%20get%20an%20estimate%20for%20my%20interiors."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-green-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-green-600 transition-all duration-500"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EstimateForm
