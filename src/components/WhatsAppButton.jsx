import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => {
  const phoneNumber = "+919032893101"
  const message = encodeURIComponent("Hi, I am interested in your interior design services.")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[90] group"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Main Button */}
        <div className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
          <MessageCircle size={32} />
        </div>

        {/* Label */}
        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl shadow-luxury opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none whitespace-nowrap">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-1">Online Consultation</p>
          <p className="text-sm font-black text-text-dark">Chat with us on WhatsApp</p>
        </div>
      </div>
    </a>
  )
}

export default WhatsAppButton
