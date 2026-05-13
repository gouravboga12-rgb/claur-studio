import { useState, useEffect } from 'react'
import { projectsData as initialProjects, siteProjectsData as initialSiteProjects } from '../data/projectsData'
import { servicesData as initialServices } from '../data/servicesData'

import { supabase } from '../lib/supabase'

export const useData = () => {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        const { data: sData } = await supabase.from('services').select('*').order('id', { ascending: true })

        if (pData && pData.length > 0) {
          setProjects(pData)
        } else {
          setProjects([...initialProjects, ...initialSiteProjects])
        }

        if (sData && sData.length > 0) {
          setServices(sData)
        } else {
          setServices(initialServices)
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

  return { projects, services, loading }
}
