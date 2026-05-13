import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layout, Briefcase, LogOut, Image as ImageIcon, Save, X, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [modalType, setModalType] = useState('project')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load data from Supabase
  const fetchData = async () => {
    const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    const { data: servicesData } = await supabase.from('services').select('*').order('id', { ascending: true })
    
    if (projectsData) setProjects(projectsData)
    if (servicesData) setServices(servicesData)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    // User provided credentials
    if (email === 'aurstudio@gmail.com' && password === 'Claur@54321') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const table = type === 'project' ? 'projects' : 'services'
      const { error } = await supabase.from(table).delete().eq('id', id)
      
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
    
    const table = modalType === 'project' ? 'projects' : 'services'
    
    let error
    if (editingItem) {
      const { error: err } = await supabase.from(table).update(rawData).eq('id', editingItem.id)
      error = err
    } else {
      const { error: err } = await supabase.from(table).insert([rawData])
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
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 flex flex-col p-8 hidden lg:flex">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-text-dark">Claur <span className="text-accent">Studio</span></h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Control Center</p>
        </div>

        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'projects' ? 'bg-accent text-white shadow-lg' : 'text-gray-500 hover:bg-secondary'}`}
          >
            <Layout size={20} />
            <span>Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'services' ? 'bg-accent text-white shadow-lg' : 'text-gray-500 hover:bg-secondary'}`}
          >
            <Briefcase size={20} />
            <span>Services</span>
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-text-dark capitalize">{activeTab} Management</h1>
            <p className="text-gray-500 font-bold text-sm mt-2">Create, edit, and manage your studio {activeTab}.</p>
          </div>
          <button 
            onClick={() => {
              setModalType(activeTab === 'projects' ? 'project' : 'service')
              setEditingItem(null)
              setIsModalOpen(true)
            }}
            className="flex items-center gap-3 bg-text-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-500 shadow-xl"
          >
            <Plus size={20} />
            <span>Add New</span>
          </button>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {(activeTab === 'projects' ? projects : services).map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-luxury border border-gray-50 group">
              <div className="h-56 relative overflow-hidden">
                <img src={item.coverImage || item.image} alt={item.title || item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => {
                      setEditingItem(item)
                      setModalType(activeTab === 'projects' ? 'project' : 'service')
                      setIsModalOpen(true)
                    }}
                    className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-text-dark hover:bg-accent hover:text-white transition-all shadow-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, activeTab === 'projects' ? 'project' : 'service')}
                    className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">{item.category || item.space_type}</span>
                <h4 className="text-xl font-black text-text-dark mb-4">{item.title || item.name}</h4>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
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
            
            <form onSubmit={handleSave} className="p-8 md:p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{modalType === 'project' ? 'Project Title' : 'Service Name'}</label>
                  <input name={modalType === 'project' ? 'title' : 'name'} defaultValue={editingItem?.title || editingItem?.name} required className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Category / Type</label>
                  <input name={modalType === 'project' ? 'category' : 'space_type'} defaultValue={editingItem?.category || editingItem?.space_type} required className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Image URL</label>
                <div className="relative">
                  <input name={modalType === 'project' ? 'coverImage' : 'image'} defaultValue={editingItem?.coverImage || editingItem?.image} required className="w-full bg-secondary/50 border border-gray-100 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent font-bold text-sm" />
                  <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Description</label>
                <textarea name="description" defaultValue={editingItem?.description} rows="4" required className="w-full bg-secondary/50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-accent font-bold text-sm resize-none"></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow bg-text-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all duration-500 flex items-center justify-center gap-3">
                  <Save size={18} />
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
