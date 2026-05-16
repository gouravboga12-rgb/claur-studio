import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layout, Briefcase, LogOut, Image as ImageIcon, Save, X, Lock, Inbox, User, Phone, Mail, Calendar, Settings, Star, Database, ArrowRight, ExternalLink, MessageCircle, AlertCircle, RefreshCw, Menu, CheckCircle2 } from 'lucide-react'
import { projectsData, siteProjectsData } from '../data/projectsData'
import { servicesData } from '../data/servicesData'
import { supabase } from '../lib/supabase'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAdminAuthenticated') === 'true')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [estimates, setEstimates] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [modalType, setModalType] = useState('project')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [projectGallery, setProjectGallery] = useState([]) // Array of {url, room}
  const [serviceFormFields, setServiceFormFields] = useState([]) // Array of {name, label, type, placeholder}
  const [isSettingsEditable, setIsSettingsEditable] = useState(false)
  const [tempSettings, setTempSettings] = useState({})
  const [isSyncEnabled, setIsSyncEnabled] = useState(false)

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: 'local',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#E9A6A1',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#E9A6A1',
            action: '#E9A6A1',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setUploadedImageUrl(result.info.secure_url)
        }
      }
    )
  }

  const openGalleryUploadWidget = (index) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: 'local'
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          updateGalleryItem(index, 'url', result.info.secure_url)
        }
      }
    )
  }

  // Load data from Supabase
  const fetchData = async () => {
    try {
      const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      const { data: sData } = await supabase.from('services').select('*').order('id', { ascending: true })
      const { data: eData } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
      const { data: tData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      const { data: settsData } = await supabase.from('settings').select('*')
      
      if (pData) {
        setProjects(pData.map(p => ({
          ...p,
          coverImage: p.cover_image || p.coverImage
        })))
      }
      if (sData) setServices(sData)
      if (tData) setTestimonials(tData)
      
      if (eData) {
        // Separate inquiries and estimates
        setInquiries(eData.filter(e => !e.message?.includes('[ESTIMATE REQUEST]')))
        setEstimates(eData.filter(e => e.message?.includes('[ESTIMATE REQUEST]')))
      }

      if (settsData) {
        const settingsObj = {}
        settsData.forEach(s => settingsObj[s.key] = s.value)
        setSettings(settingsObj)
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    }
  }

  const seedInitialData = async () => {
    if (!window.confirm('This will upload all local projects, services, and testimonials to Supabase. Continue?')) return
    
    setIsSubmitting(true)
    try {
      console.log('--- Sync Debug ---')
      
      // 1. Seed Projects
      const combinedProjects = [...projectsData, ...siteProjectsData]
      console.log('Found Projects:', combinedProjects.length)
      
      const allLocalProjects = combinedProjects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        cover_image: p.coverImage || p.cover_image,
        description: p.description,
        images: p.images || []
      }))
      
      const { error: pErr } = await supabase.from('projects').upsert(allLocalProjects)
      if (pErr) throw new Error('Projects Sync Error: ' + pErr.message)
      
      // 2. Seed Services
      console.log('Found Services:', servicesData.length)
      const localServices = servicesData.map(s => ({
        id: s.id,
        title: s.name,
        description: s.description,
        image: s.image,
        space_type: s.space_type,
        form_fields: s.formFields || []
      }))
      const { error: sErr } = await supabase.from('services').upsert(localServices)
      if (sErr) throw new Error('Services Sync Error: ' + sErr.message)

      // 3. Seed Testimonials
      const initialTestimonials = [
        { id: 'test-1', name: "Bala koti", role: "Homeowner", review: "The best part about working with Claur Studio was the attention to detail. From laminates to lighting suggestions, everything was thoughtfully planned. The final outcome looked premium.", rating: 5, project_id: "project-1" },
        { id: 'test-2', name: "Subhash", role: "3BHK Owner", review: "Claur Studio completely transformed our 3BHK into a modern and functional space. The designs were elegant, practical, and exactly what we wanted. Execution was smooth and the team was very responsive throughout the project.", rating: 5, project_id: "project-2" },
        { id: 'test-3', name: "Srinivas", role: "Homeowner", review: "Minimal, classy, and practical designs. Claur Studio gave our home a completely fresh feel while keeping everything functional for daily use.", rating: 5, project_id: "project-3" },
        { id: 'test-4', name: "Surya", role: "Homeowner", review: "Very happy with the 3D designs and space planning. Every corner was utilized beautifully without making the house feel crowded. Highly recommend Claur Studio for contemporary interiors.", rating: 5, project_id: "project-4" },
        { id: 'test-5', name: "Raghu", role: "Homeowner", review: "Professional service and excellent communication. The 3D visualization helped us clearly understand the final look before execution started. Overall a very good experience.", rating: 5, project_id: "project-5" }
      ]
      console.log('Found Testimonials:', initialTestimonials.length)
      const { error: tErr } = await supabase.from('testimonials').upsert(initialTestimonials)
      if (tErr) throw new Error('Testimonials Sync Error: ' + tErr.message)
      
      alert(`Sync Complete!\n- Projects: ${allLocalProjects.length}\n- Services: ${localServices.length}\n- Testimonials: ${initialTestimonials.length}`)
      fetchData()
    } catch (error) {
      console.error('Seeding failed:', error)
      alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'claurstudio@gmail.com' && password === 'Claur@54321') {
      setIsAuthenticated(true)
      localStorage.setItem('isAdminAuthenticated', 'true')
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAdminAuthenticated')
    setEmail('')
    setPassword('')
  }

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const tableMap = {
        project: 'projects',
        service: 'services',
        inquiry: 'enquiries',
        estimate: 'enquiries',
        testimonial: 'testimonials'
      }
      const { error } = await supabase.from(tableMap[type]).delete().eq('id', id)
      
      if (error) {
        alert('Error deleting item: ' + error.message)
      } else {
        fetchData()
      }
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.target)
    const rawData = Object.fromEntries(formData.entries())
    
    // Ensure image is included from the state
    if (uploadedImageUrl) {
      if (modalType === 'project') rawData.cover_image = uploadedImageUrl
      else rawData.image = uploadedImageUrl
    }

    if (modalType === 'project') {
      rawData.images = projectGallery
    } else if (modalType === 'service') {
      rawData.form_fields = serviceFormFields
    } else if (modalType === 'testimonial') {
      rawData.review = rawData.description // Map description textarea to review column
      delete rawData.description
    }
    
    const tableMap = {
      project: 'projects',
      service: 'services',
      testimonial: 'testimonials'
    }
    
    let error
    if (modalType === 'form_config') {
      const configKey = `form_config_${editingItem.type}`
      const { error: err } = await supabase.from('settings').upsert({ key: configKey, value: { fields: serviceFormFields } })
      error = err
    } else if (editingItem) {
      const { error: err } = await supabase.from(tableMap[modalType]).update(rawData).eq('id', editingItem.id)
      error = err
    } else {
      const { error: err } = await supabase.from(tableMap[modalType]).insert([rawData])
      error = err
    }

    setIsSubmitting(false)
    if (error) {
      alert('Error saving data: ' + error.message)
    } else {
      setIsModalOpen(false)
      setEditingItem(null)
      fetchData()
    }
  }

  const handleUpdateSetting = async (key, value) => {
    const { error } = await supabase.from('settings').upsert({ key, value })
    if (error) alert('Error updating setting: ' + error.message)
    else fetchData()
  }

  const handleSaveAllSettings = async () => {
    setIsSubmitting(true)
    try {
      const updates = Object.entries(tempSettings).map(([key, value]) => ({ key, value }))
      const { error } = await supabase.from('settings').upsert(updates)
      if (error) throw error
      
      setIsSettingsEditable(false)
      fetchData()
    } catch (error) {
      alert('Error saving settings: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addGalleryItem = () => {
    setProjectGallery([...projectGallery, { url: '', room: '' }])
  }

  const updateGalleryItem = (index, field, value) => {
    const newGallery = [...projectGallery]
    newGallery[index][field] = value
    setProjectGallery(newGallery)
  }

  const removeGalleryItem = (index) => {
    setProjectGallery(projectGallery.filter((_, i) => i !== index))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-luxury border border-gray-100" data-aos="zoom-in">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h2 className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Secure Access</h2>
            <h3 className="text-3xl font-black text-text-dark">Admin Login</h3>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all font-bold"
                placeholder="aurstudio@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-6 py-4 outline-none focus:border-accent transition-all font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-text-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-500">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row relative overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-white border-b border-gray-100 p-6 flex justify-between items-center z-50 sticky top-0">
        <h2 className="text-xl font-black text-text-dark">Claur <span className="text-accent">Studio</span></h2>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-accent"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-all"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-100 flex flex-col p-8 z-50 transition-transform duration-500 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-12 hidden lg:block">
          <h2 className="text-2xl font-black text-text-dark">Claur <span className="text-accent">Studio</span></h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Control Center</p>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'dashboard', icon: <Layout size={20} />, label: 'Dashboard' },
            { id: 'projects', icon: <Briefcase size={20} />, label: 'Projects' },
            { id: 'services', icon: <Database size={20} />, label: 'Services' },
            { id: 'estimates', icon: <MessageCircle size={20} />, label: 'Estimates' },
            { id: 'inquiries', icon: <Inbox size={20} />, label: 'Inquiries' },
            { id: 'testimonials', icon: <Star size={20} />, label: 'Testimonials' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
            { id: 'estimate-forms', icon: <Database size={20} />, label: 'Estimate Forms' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20 translate-x-2' 
                  : 'text-gray-400 hover:bg-secondary hover:text-text-dark'
              }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-dark capitalize">
              {activeTab === 'dashboard' ? 'Overview' : activeTab === 'estimates' ? 'Estimate Requests' : activeTab === 'estimate-forms' ? 'Form Configuration' : `${activeTab} Management`}
            </h1>
            <p className="text-gray-500 font-bold text-sm mt-2">
              {activeTab === 'dashboard' ? 'Quick summary of your studio operations.' : 
               activeTab === 'estimates' ? 'Manage detailed quote requests from your potential clients.' :
               activeTab === 'inquiries' ? 'General contact and inquiry messages.' :
               activeTab === 'settings' ? 'Update global site information and contact details.' :
               activeTab === 'estimate-forms' ? 'Configure fields and questions for estimate forms.' :
               `Create, edit, and manage your studio ${activeTab}.`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                fetchData()
                const btn = document.getElementById('global-refresh')
                btn.classList.add('animate-spin')
                setTimeout(() => btn.classList.remove('animate-spin'), 1000)
              }}
              className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-500"
              title="Refresh Data"
            >
              <RefreshCw id="global-refresh" size={20} />
            </button>
            {(activeTab === 'projects' || activeTab === 'services' || activeTab === 'testimonials') && (
              <button 
                onClick={() => {
                  setModalType(activeTab === 'projects' ? 'project' : activeTab === 'services' ? 'service' : 'testimonial')
                  setEditingItem(null)
                  setUploadedImageUrl('')
                  setProjectGallery([])
                  setIsModalOpen(true)
                }}
                className="flex items-center gap-3 bg-text-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-500 shadow-xl"
              >
                <Plus size={20} />
                <span className="hidden md:inline">Add New</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: projects.length, icon: <Briefcase size={24} />, color: 'bg-blue-500' },
                { label: 'Active Services', value: services.length, icon: <Database size={24} />, color: 'bg-purple-500' },
                { label: 'Pending Estimates', value: estimates.length, icon: <MessageCircle size={24} />, color: 'bg-orange-500' },
                { label: 'New Inquiries', value: inquiries.length, icon: <Inbox size={24} />, color: 'bg-green-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-luxury transition-all duration-500">
                  <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                  <h4 className="text-3xl font-black text-text-dark">{stat.value}</h4>
                </div>
              ))}
            </div>

            {/* Sync Card */}
            <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-black text-text-dark">Database Synchronization</h3>
                    <button 
                      onClick={() => setIsSyncEnabled(!isSyncEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-[9px] uppercase tracking-widest transition-all ${
                        isSyncEnabled 
                          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                          : 'bg-accent/10 text-accent hover:bg-accent/20'
                      }`}
                    >
                      {isSyncEnabled ? <Lock size={12} /> : <Edit2 size={12} />}
                      <span>{isSyncEnabled ? 'Disable Sync' : 'Enable Sync'}</span>
                    </button>
                  </div>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed">
                    If your dashboard is empty, use this button to sync your local data files with Supabase. This will populate your Projects, Services, and Testimonials.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={seedInitialData} 
                    disabled={isSubmitting || !isSyncEnabled}
                    className="px-10 py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-text-dark transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Syncing...' : 'Sync Initial Data'}
                  </button>
                  <button 
                    onClick={fetchData} 
                    className="px-10 py-5 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary transition-all"
                  >
                    Refresh Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inquiries & Estimates Tab */}
        {(activeTab === 'inquiries' || activeTab === 'estimates') && (
          <div className="space-y-6">
            {(activeTab === 'inquiries' ? inquiries : estimates).map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] p-8 shadow-luxury border border-gray-50 flex flex-col md:flex-row gap-8 relative group">
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                      <User size={14} className="text-accent" />
                      <span className="text-xs font-black text-text-dark">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                      <Phone size={14} className="text-accent" />
                      <span className="text-xs font-bold text-gray-500">{item.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                      <Mail size={14} className="text-accent" />
                      <span className="text-xs font-bold text-gray-500">{item.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
                      <Calendar size={14} className="text-accent" />
                      <span className="text-xs font-bold text-gray-400">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="bg-secondary/30 rounded-2xl p-6">
                    <pre className="text-sm text-text-dark font-medium whitespace-pre-wrap leading-relaxed font-sans">{item.message}</pre>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end gap-3">
                  <a href={`tel:${item.phone}`} className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                    <Phone size={20} />
                  </a>
                  <button 
                    onClick={() => handleDelete(item.id, activeTab === 'inquiries' ? 'inquiry' : 'estimate')}
                    className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {(activeTab === 'inquiries' ? inquiries : estimates).length === 0 && (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <Inbox size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">No {activeTab} yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Data Grid (Projects, Services, Testimonials) */}
        {(activeTab === 'projects' || activeTab === 'services' || activeTab === 'testimonials') && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {(activeTab === 'projects' ? projects : activeTab === 'services' ? services : testimonials).map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-luxury border border-gray-50 group flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <img src={item.cover_image || item.image || item.image_url} alt={item.title || item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingItem(item)
                        setModalType(activeTab === 'projects' ? 'project' : activeTab === 'services' ? 'service' : 'testimonial')
                        setUploadedImageUrl(item.cover_image || item.coverImage || item.image || item.image_url || '')
                        if (activeTab === 'projects') setProjectGallery(item.images || [])
                        else if (activeTab === 'services') setServiceFormFields(item.form_fields || [])
                        else {
                          setProjectGallery([])
                          setServiceFormFields([])
                        }
                        setIsModalOpen(true)
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-text-dark hover:bg-accent hover:text-white transition-all shadow-lg"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, activeTab === 'projects' ? 'project' : activeTab === 'services' ? 'service' : 'testimonial')}
                      className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{item.category || item.space_type || item.role || 'Client'}</span>
                  <h4 className="text-xl font-black text-text-dark mb-4">{item.title || item.name}</h4>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed italic">
                    {activeTab === 'testimonials' ? `"${item.review}"` : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-luxury border border-gray-50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-text-dark flex items-center gap-4">
                  <Settings className="text-accent" />
                  Global Site Info
                </h3>
                <button 
                  onClick={() => {
                    if (!isSettingsEditable) {
                      setTempSettings({...settings})
                    }
                    setIsSettingsEditable(!isSettingsEditable)
                  }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                    isSettingsEditable 
                      ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                      : 'bg-accent/10 text-accent hover:bg-accent/20'
                  }`}
                >
                  {isSettingsEditable ? <X size={16} /> : <Edit2 size={16} />}
                  <span>{isSettingsEditable ? 'Cancel' : 'Unlock to Edit'}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { key: 'phone', label: 'Contact Phone', icon: <Phone /> },
                  { key: 'email', label: 'Contact Email', icon: <Mail /> },
                  { key: 'whatsapp', label: 'WhatsApp Number (With Country Code)', icon: <MessageCircle /> },
                  { key: 'instagram', label: 'Instagram URL', icon: <ExternalLink /> },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{field.label}</label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <input 
                          disabled={!isSettingsEditable}
                          value={isSettingsEditable ? (tempSettings[field.key] || '') : (settings[field.key] || '')}
                          onChange={(e) => setTempSettings({...tempSettings, [field.key]: e.target.value})}
                          className={`w-full border rounded-xl pl-12 pr-4 py-3 outline-none transition-all font-bold text-sm ${
                            isSettingsEditable 
                              ? 'bg-white border-accent/20 focus:border-accent' 
                              : 'bg-secondary/50 border-gray-100 cursor-not-allowed text-gray-400'
                          }`} 
                        />
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSettingsEditable ? 'text-accent' : 'text-gray-300'}`}>
                          {field.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Office Address</label>
                <textarea 
                  disabled={!isSettingsEditable}
                  value={isSettingsEditable ? (tempSettings.address || '') : (settings.address || '')}
                  onChange={(e) => setTempSettings({...tempSettings, address: e.target.value})}
                  rows="3"
                  className={`w-full border rounded-2xl px-6 py-4 outline-none transition-all font-bold text-sm resize-none ${
                    isSettingsEditable 
                      ? 'bg-white border-accent/20 focus:border-accent' 
                      : 'bg-secondary/50 border-gray-100 cursor-not-allowed text-gray-400'
                  }`}
                ></textarea>
              </div>

              {isSettingsEditable && (
                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={handleSaveAllSettings}
                    disabled={isSubmitting}
                    className="flex items-center gap-3 bg-accent text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-text-dark transition-all duration-500 shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <Save size={18} />
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Estimate Forms Configuration Tab */}
        {activeTab === 'estimate-forms' && (
          <div className="max-w-5xl space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-luxury border border-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-black text-text-dark flex items-center gap-4">
                    <Database className="text-accent" />
                    Estimate Form Builder
                  </h3>
                  <p className="text-gray-400 font-bold text-xs mt-1">Configure fields for different estimate types.</p>
                </div>
                <div className="flex gap-3">
                  {['Full Interiors', 'Modular Kitchen', 'Wardrobe Only'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        const configKey = `form_config_${type}`
                        const rawConfig = settings[configKey]
                        const currentConfig = (typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig) || {
                          fields: [
                            { label: 'Full Name', name: 'name', type: 'text', required: true, placeholder: 'E.g. Karan Dadga' },
                            { label: 'Phone Number', name: 'phone', type: 'tel', required: true, placeholder: '+91 00000 00000' },
                            { label: 'Email (Optional)', name: 'email', type: 'email', required: false, placeholder: 'your@email.com' },
                            { label: 'Select Project Type', name: 'projectType', type: 'buttons', options: ['1BHK', '2BHK', '3BHK', 'Villa', 'Office', 'Other'], required: true },
                            { label: 'Additional Notes', name: 'message', type: 'textarea', required: false, placeholder: 'Tell us about your dream space...' }
                          ]
                        }
                        setEditingItem({ type, config: currentConfig })
                        setServiceFormFields(currentConfig.fields || [])
                        setIsModalOpen(true)
                        setModalType('form_config')
                      }}
                      className="px-6 py-3 bg-secondary hover:bg-accent hover:text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm"
                    >
                      Configure {type.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['Full Interiors', 'Modular Kitchen', 'Wardrobe Only'].map((type) => {
                  const configKey = `form_config_${type}`
                  const rawConfig = settings[configKey]
                  const config = (typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig) || null
                  return (
                    <div key={type} className="bg-secondary/20 p-8 rounded-[2.5rem] border border-gray-100 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-accent font-black uppercase tracking-[0.2em] text-[10px]">Form Template</span>
                        {config ? (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle2 size={12} />
                            <span className="text-[10px] font-bold">Configured</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400">
                            <AlertCircle size={12} />
                            <span className="text-[10px] font-bold">Default</span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-xl font-black text-text-dark mb-4">{type}</h4>
                      <p className="text-gray-500 text-xs font-bold leading-relaxed mb-8 flex-grow">
                        {config ? `${config.fields.length} dynamic fields configured.` : 'Using default system fields: Name, Phone, Email, Project Type, and Notes.'}
                      </p>
                      <button 
                        onClick={() => {
                          const configKey = `form_config_${type}`
                          const rawConfig = settings[configKey]
                          const currentConfig = (typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig) || {
                            fields: [
                              { label: 'Full Name', name: 'name', type: 'text', required: true, placeholder: 'E.g. Karan Dadga' },
                              { label: 'Phone Number', name: 'phone', type: 'tel', required: true, placeholder: '+91 00000 00000' },
                              { label: 'Email (Optional)', name: 'email', type: 'email', required: false, placeholder: 'your@email.com' },
                              { label: 'Select Project Type', name: 'projectType', type: 'buttons', options: ['1BHK', '2BHK', '3BHK', 'Villa', 'Office', 'Other'], required: true },
                              { label: 'Additional Notes', name: 'message', type: 'textarea', required: false, placeholder: 'Tell us about your dream space...' }
                            ]
                          }
                          setEditingItem({ type, config: currentConfig })
                          setServiceFormFields(currentConfig.fields || [])
                          setIsModalOpen(true)
                          setModalType('form_config')
                        }}
                        className="w-full py-4 bg-white border border-gray-100 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-sm"
                      >
                        Edit Configuration
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-up" data-aos="zoom-in">
            <div className="p-8 md:p-10 border-b border-gray-100 flex justify-between items-center bg-secondary/30">
              <div>
                <h2 className="text-2xl font-black text-text-dark">{editingItem ? 'Edit' : 'Add New'} {modalType}</h2>
                <p className="text-gray-500 font-bold text-xs mt-1">Fill in the details below.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 md:p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    {modalType === 'project' ? 'Project Title' : modalType === 'service' ? 'Service Name' : 'Client Name'}
                  </label>
                  <input 
                    name={modalType === 'project' ? 'title' : modalType === 'service' ? 'title' : 'name'} 
                    defaultValue={editingItem?.title || editingItem?.name} 
                    placeholder={modalType === 'project' ? 'Project Title' : modalType === 'service' ? 'Service Name' : 'Client Name'} 
                    className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  {modalType === 'project' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Project Type</label>
                      <select 
                        name="category" 
                        defaultValue={editingItem?.category || 'Residential'} 
                        className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm"
                      >
                        <option value="Residential">Featured Project</option>
                        <option value="Site Execution">Site Execution (Process)</option>
                      </select>
                    </div>
                  ) : modalType === 'service' ? (
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Space Type</label>
                        <input name="space_type" defaultValue={editingItem?.space_type} placeholder="e.g. 2BHK" className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Package</label>
                        <input name="package" defaultValue={editingItem?.package} placeholder="e.g. Premium" className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Client Role</label>
                      <input name="role" defaultValue={editingItem?.role} placeholder="e.g. Home Owner" className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                    </div>
                  )}
                </div>
              </div>

              {modalType === 'testimonial' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Rating (1-5)</label>
                  <input type="number" name="rating" min="1" max="5" defaultValue={editingItem?.rating || 5} className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                </div>
              )}
              
              {modalType === 'testimonial' ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Link to Project</label>
                  <select 
                    name="project_id" 
                    defaultValue={editingItem?.project_id} 
                    className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm"
                  >
                    <option value="">Select a Project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Main Image</label>
                  
                  {/* Image Preview Box */}
                  <div className="relative group w-full h-56 bg-secondary/30 rounded-[2rem] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center transition-all hover:border-accent/50">
                    {uploadedImageUrl ? (
                      <>
                        <img src={uploadedImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            type="button" 
                            onClick={() => setUploadedImageUrl('')}
                            className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-200 mx-auto mb-4 shadow-sm">
                          <ImageIcon size={32} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">No Image Selected</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <div className="relative flex-grow">
                      <input 
                        name={modalType === 'project' ? 'cover_image' : 'image'} 
                        value={uploadedImageUrl}
                        onChange={(e) => setUploadedImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full bg-secondary/50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-accent font-bold text-sm shadow-sm" 
                      />
                      <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button 
                      type="button"
                      onClick={openUploadWidget}
                      className="px-8 bg-text-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center gap-2 shadow-lg"
                    >
                      <Plus size={18} />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Gallery Management for Projects */}
              {modalType === 'project' && (
                <div className="space-y-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Project Gallery (Detail Page Images)</label>
                    <button type="button" onClick={addGalleryItem} className="text-accent flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer">
                      <Plus size={14} /> Add Image
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {projectGallery.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center bg-secondary/20 p-4 rounded-2xl border border-gray-50 group">
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm relative group/thumb border border-gray-100">
                          {item.url ? (
                            <img src={item.url} alt="Room" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200 bg-gray-50">
                              <ImageIcon size={24} />
                            </div>
                          )}
                          <button 
                            type="button"
                            onClick={() => openGalleryUploadWidget(index)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                        <div className="flex-grow space-y-3">
                          <div className="flex gap-2">
                            <button 
                              type="button"
                              onClick={() => openGalleryUploadWidget(index)}
                              className="flex-grow py-2 bg-white border border-gray-100 rounded-lg font-bold text-[9px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-sm"
                            >
                              {item.url ? 'Change Image' : 'Upload Image'}
                            </button>
                            <button 
                              type="button" 
                              onClick={() => removeGalleryItem(index)}
                              className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <input 
                            placeholder="Room/Space Name (e.g. Master Bedroom)"
                            value={item.room}
                            onChange={(e) => updateGalleryItem(index, 'room', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-lg px-4 py-2 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                          />
                          {/* Hidden input for URL to ensure it stays in the data */}
                          <input type="hidden" value={item.url} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields Management for Services */}
              {modalType === 'service' && (
                <div className="space-y-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Form Questions</label>
                    <button 
                      type="button" 
                      onClick={() => setServiceFormFields([...serviceFormFields, { name: '', label: '', type: 'text', placeholder: '' }])} 
                      className="text-accent flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <Plus size={14} /> Add Question
                    </button>
                  </div>

                  {/* Standard Fields Preview */}
                  <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={12} className="text-gray-400" />
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Standard Contact Fields (Always Included)</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['Full Name', 'Email Address', 'Phone Number', 'Additional Message'].map(f => (
                        <span key={f} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-500 shadow-sm">{f}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {serviceFormFields.map((field, index) => (
                      <div key={index} className="bg-secondary/20 p-6 rounded-[2rem] border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-accent">Question #{index + 1}</span>
                          <button 
                            type="button" 
                            onClick={() => setServiceFormFields(serviceFormFields.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Question Label</label>
                            <input 
                              value={field.label}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].label = e.target.value
                                newFields[index].name = e.target.value.toLowerCase().replace(/\s+/g, '_')
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. Property Type"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Field Type</label>
                            <select 
                              value={field.type}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].type = e.target.value
                                if (e.target.value === 'select' && !newFields[index].options) {
                                  newFields[index].options = []
                                }
                                setServiceFormFields(newFields)
                              }}
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm"
                            >
                              <option value="text">Short Text</option>
                              <option value="select">Dropdown (Options)</option>
                              <option value="number">Number</option>
                              <option value="checkbox">Multi-Checkboxes</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Placeholder / Tip</label>
                            <input 
                              value={field.placeholder}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].placeholder = e.target.value
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. Select your BHK"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                          </div>
                        </div>

                        {/* Options Editor for Dropdowns/Checkboxes */}
                        {(field.type === 'select' || field.type === 'checkbox') && (
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[9px] font-bold text-gray-400 uppercase block">Options (Comma separated)</label>
                            <input 
                              value={field.options?.join(', ') || ''}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].options = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. 1BHK, 2BHK, 3BHK"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                            <p className="text-[9px] text-gray-400 italic">Separate each option with a comma.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Configuration Management */}
              {modalType === 'form_config' && (
                <div className="space-y-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Form Questions for {editingItem.type}</label>
                      <p className="text-[9px] text-gray-400 mt-1">Configure the sequence and types of fields.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setServiceFormFields([...serviceFormFields, { name: '', label: '', type: 'text', placeholder: '' }])} 
                      className="text-accent flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <Plus size={14} /> Add Field
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {serviceFormFields.map((field, index) => (
                      <div key={index} className="bg-secondary/20 p-6 rounded-[2rem] border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-accent">Field #{index + 1}</span>
                          <div className="flex gap-2">
                            <button 
                              type="button" 
                              onClick={() => {
                                if (index > 0) {
                                  const newFields = [...serviceFormFields]
                                  const temp = newFields[index]
                                  newFields[index] = newFields[index - 1]
                                  newFields[index - 1] = temp
                                  setServiceFormFields(newFields)
                                }
                              }}
                              className="text-gray-400 hover:text-text-dark"
                              title="Move Up"
                            >
                              <ArrowRight size={16} className="-rotate-90" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setServiceFormFields(serviceFormFields.filter((_, i) => i !== index))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Field Label</label>
                            <input 
                              value={field.label}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].label = e.target.value
                                newFields[index].name = e.target.value.toLowerCase().replace(/\s+/g, '_')
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. Full Name"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Input Name (ID)</label>
                            <input 
                              value={field.name}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].name = e.target.value
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. name"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Field Type</label>
                            <select 
                              value={field.type}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].type = e.target.value
                                if ((e.target.value === 'select' || e.target.value === 'buttons') && !newFields[index].options) {
                                  newFields[index].options = []
                                }
                                setServiceFormFields(newFields)
                              }}
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm"
                            >
                              <option value="text">Short Text</option>
                              <option value="tel">Phone/Tel</option>
                              <option value="email">Email</option>
                              <option value="select">Dropdown (Options)</option>
                              <option value="buttons">BHK Style Buttons</option>
                              <option value="number">Number</option>
                              <option value="textarea">Large Text Area</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Placeholder</label>
                            <input 
                              value={field.placeholder}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].placeholder = e.target.value
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. Enter your name"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                          </div>
                        </div>

                        {/* Options Editor for Dropdowns/Buttons */}
                        {(field.type === 'select' || field.type === 'buttons') && (
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[9px] font-bold text-gray-400 uppercase block">Options (Comma separated)</label>
                            <input 
                              value={field.options?.join(', ') || ''}
                              onChange={(e) => {
                                const newFields = [...serviceFormFields]
                                newFields[index].options = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                                setServiceFormFields(newFields)
                              }}
                              placeholder="e.g. 1BHK, 2BHK, 3BHK"
                              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-xs shadow-sm" 
                            />
                            <p className="text-[9px] text-gray-400 italic">Separate each option with a comma.</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalType !== 'form_config' && (
                <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {modalType === 'testimonial' ? 'Review / Testimonial' : 'Description'}
                </label>
                <textarea 
                  name={modalType === 'testimonial' ? 'review' : 'description'} 
                  defaultValue={editingItem?.description || editingItem?.review} 
                  rows="4" 
                  className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm resize-none"
                ></textarea>
                </div>
              )}

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white py-4 border-t border-gray-100">
                <button type="submit" disabled={isSubmitting} className="flex-grow bg-text-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3 shadow-xl disabled:opacity-50">
                  {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={18} />}
                  <span>Save {modalType}</span>
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 border border-gray-100 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
