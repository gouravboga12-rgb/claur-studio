import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Estimate', path: '/estimate' },
    { name: 'Contact', path: '/contact' },
  ]

  // Mobile menu rendered as portal directly into body — bypasses all z-index stacking contexts
  const mobileMenu = isMobileMenuOpen ? createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <img src={logo} alt="Claur Studio" style={{ height: '64px' }} />
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <X size={32} color="#1A1A1A" />
        </button>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: location.pathname === link.path ? '#C0A080' : '#1A1A1A',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
              transitionDelay: `${index * 60}ms`,
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem', marginTop: '2rem' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#999', marginBottom: '0.5rem' }}>
          Project Inquiry
        </p>
        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem' }}>
          +91 90328 93101
        </p>
        <Link
          to="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: '#C0A080',
            color: '#ffffff',
            borderRadius: '9999px',
            padding: '1rem 2rem',
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            width: '100%',
          }}
        >
          Get A Free Quote
        </Link>
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-2 shadow-luxury'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="section-container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 shrink-0 mr-12">
            <img src={logo} alt="Claur Studio" className="h-14 md:h-20 transition-all duration-500" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent group ${
                  location.pathname === link.path ? 'text-accent' : 'text-text-dark'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                  location.pathname === link.path ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
            ))}

            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-[9px] flex items-center gap-3 transition-all duration-500 shadow-xl border-2 bg-text-dark text-white border-text-dark hover:bg-accent hover:border-accent"
            >
              <span>Get Free Quote | +91 90328 93101</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-text-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Portal */}
      {mobileMenu}
    </>
  )
}

export default Navbar
