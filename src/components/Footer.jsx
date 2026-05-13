import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'



import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-text-dark text-white pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 mb-16 md:mb-32">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            <Link to="/" className="group inline-block">
              <img src={logo} alt="Claur Studio" className="h-16 md:h-32 object-contain" />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              We design modern, elegant, and space-efficient interiors that reflect the unique lifestyle of Hyderabad's elite.
            </p>


            <div className="flex gap-4">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest">Follow us on Social Media</span>
            </div>




          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-6 md:mb-12">Navigation</h3>
            <ul className="space-y-6">
              {['Home', 'About', 'Services', 'Projects', 'Estimate', 'Contact'].map((link) => (
                <li key={link}>

                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="text-base font-bold text-white hover:text-accent transition-all duration-300 group flex items-center gap-3">
                    <span>{link}</span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>

                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-6 md:mb-12">Inquiries</h3>
            <div className="space-y-8 md:space-y-12">
              <div className="group">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-2">Speak to us</p>
                <p className="text-lg font-black group-hover:text-accent transition-colors">+91 90328 93101</p>
              </div>
              <div className="group">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-2">Email Address</p>
                <p className="text-lg font-black group-hover:text-accent transition-colors">claurstudio@gmail.com</p>
              </div>
              <div className="group">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-2">Location</p>
                <p className="text-sm font-bold leading-relaxed max-w-[250px]">
                  Chandrapuri Colony, L.B. Nagar, Hyderabad - 500074
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
          <p>© {new Date().getFullYear()} Claur Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
