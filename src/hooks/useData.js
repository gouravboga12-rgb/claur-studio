import { useState, useEffect } from 'react'
import { projectsData as initialProjects, siteProjectsData as initialSiteProjects } from '../data/projectsData'
import { servicesData as initialServices } from '../data/servicesData'

import { supabase } from '../lib/supabase'

export const useData = () => {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        const { data: sData } = await supabase.from('services').select('*').order('id', { ascending: true })
        const { data: tData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
        const { data: settsData } = await supabase.from('settings').select('*')

        if (pData && pData.length > 0) {
          // Normalize projects to handle cover_image vs coverImage
          const normalizedProjects = pData.map(p => ({
            ...p,
            coverImage: p.cover_image || p.coverImage // Support both database and local file formats
          }))
          setProjects(normalizedProjects)
        } else {
          setProjects([...initialProjects, ...initialSiteProjects])
        }

        if (sData && sData.length > 0) {
          setServices(sData)
        } else {
          setServices(initialServices)
        }

        if (tData) setTestimonials(tData)

        if (settsData) {
          const settingsObj = {}
          settsData.forEach(s => settingsObj[s.key] = s.value)
          setSettings(settingsObj)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setProjects([...initialProjects, ...initialSiteProjects])
        setServices(initialServices)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { projects, services, testimonials, settings, loading }
}
