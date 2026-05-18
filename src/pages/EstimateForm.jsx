import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useData } from '../hooks/useData'
import SEO from '../components/SEO'

const EstimateForm = () => {
  const { settings, loading } = useData()
  const [searchParams] = useSearchParams()
  const serviceFromParam = searchParams.get('service') || 'Full Interiors'
  
  // Load dynamic config from settings
  const configKey = `form_config_${serviceFromParam}`
  const rawConfig = settings[configKey]
  
  const formConfig = (typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig) || {
    fields: [
      { label: 'Full Name', name: 'name', type: 'text', required: true, placeholder: 'E.g. Karan Dadga' },
      { label: 'Phone Number', name: 'phone', type: 'tel', required: true, placeholder: '+91 00000 00000' },
      { label: 'Email (Optional)', name: 'email', type: 'email', required: false, placeholder: 'your@email.com' },
      { label: 'Select Project Type', name: 'projectType', type: 'buttons', options: ['1BHK', '2BHK', '3BHK', 'Villa', 'Office', 'Other'], required: true },
      { label: 'Additional Notes', name: 'message', type: 'textarea', required: false, placeholder: 'Tell us about your dream space...' }
    ]
  }

  const fields = formConfig.fields || []

  // Initialize form data based on fields
  const initialData = { serviceType: serviceFromParam }
  fields.forEach(field => {
    initialData[field.name] = field.type === 'buttons' ? (field.options?.[1] || field.options?.[0] || '') : ''
  })

  const [formData, setFormData] = useState(initialData)
  const [status, setStatus] = useState('idle')

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-screen bg-secondary/30">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Form...</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Collect message data from all fields except standard ones
      const standardFields = ['name', 'phone', 'email']
      const customData = Object.entries(formData)
        .filter(([key]) => !standardFields.includes(key) && key !== 'serviceType')
        .map(([key, val]) => {
          const field = formConfig.fields.find(f => f.name === key)
          return `${field?.label || key}: ${val}`
        })
        .join('\n')

      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: formData.name || 'Anonymous',
          phone: formData.phone || 'N/A',
          email: formData.email || null,
          message: `[ESTIMATE REQUEST]\nService: ${formData.serviceType}\n${customData}`
        }])
      if (error) throw error
      
      // WhatsApp Alert
      const adminWhatsApp = settings.whatsapp || '919032893101'
      const waMessage = `📋 *New Estimate Request* 📋%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.serviceType}%0A%0A👉 _Check Admin Panel for full details._`
      
      window.open(`https://wa.me/${adminWhatsApp}?text=${waMessage}`, '_blank')

      setStatus('success')
      setFormData(initialData)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const serviceLabel = {
    'Full Interiors': 'Full Home Interiors',
    'Modular Kitchen': 'Kitchen Interiors',
    'Wardrobe Only': 'Wardrobe Design',
  }[serviceFromParam] || serviceFromParam

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


  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-[#FAF7F2]">
      <SEO 
        title={`Get Estimate for ${serviceLabel}`}
        description={`Calculate cost estimate for ${serviceLabel} by Claur Studio. Custom options for living rooms, kitchens, bedrooms, and full villa design estimations.`}
        keywords={`Interior Cost Calculation, Modular Kitchen Estimation Hyderabad, Wardrobe Cost Estimate, Claur Studio Calculator`}
      />
      {/* Header */}
      <section className="bg-text-dark text-white py-12 md:py-16 relative overflow-hidden">
        <div className="section-container relative z-10">
          <Link to="/estimate" className="inline-flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity">
            <ArrowLeft size={12} /> Back to Selection
          </Link>
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            {serviceLabel}
          </h1>
          <p className="text-gray-400 text-[11px] md:text-xs max-w-xl leading-relaxed">
            Fill in your details below and our design team will reach out with a personalized quote within 24 hours. No hidden charges, ever.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="section-container max-w-3xl">
          <div className="bg-white rounded-[2.5rem] shadow-luxury p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              
              {fields.map((field, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    {field.label} {field.required && '*'}
                  </label>
                  
                  {field.type === 'buttons' ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {field.options?.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({...formData, [field.name]: opt})}
                          className={`px-5 py-3 rounded-xl font-bold text-[11px] md:text-xs transition-all duration-300 ${
                            formData[field.name] === opt
                              ? 'bg-accent text-white shadow-lg'
                              : 'bg-secondary text-text-muted hover:bg-gray-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : field.type === 'select' ? (
                    <select
                      required={field.required}
                      className="w-full bg-secondary/50 rounded-xl p-4 outline-none focus:ring-2 ring-accent/30 transition-all font-bold appearance-none cursor-pointer text-xs"
                      value={formData[field.name]}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    >
                      <option value="">Select Option</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      rows="3"
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full bg-secondary/50 rounded-xl p-4 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 resize-none border-none text-xs"
                      value={formData[field.name]}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full bg-secondary/50 rounded-xl p-4 outline-none focus:ring-2 ring-accent/30 transition-all font-bold placeholder:text-gray-300 border-none text-xs"
                      value={formData[field.name]}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-accent py-5 text-base group shadow-xl mt-4"
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
              href={`tel:${settings.phone || '+919032893101'}`}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-text-dark font-bold text-xs uppercase tracking-widest hover:bg-text-dark hover:text-white transition-all duration-500"
            >
              📞 Call Us Now
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp || '919032893101'}?text=Hi%2C%20I%20would%20like%20to%20get%20an%20estimate%20for%20my%20interiors.`}
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
