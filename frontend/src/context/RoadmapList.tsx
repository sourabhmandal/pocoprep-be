'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'


interface InterviewPreparation {
  id: number;
  topic: string;
  interviewer: string;
  created_at: string;
}

type InterviewPreparationArray = InterviewPreparation[];

type ApiDataContextType = {
  roadmaps: InterviewPreparationArray
  selectedRoadmap: InterviewPreparation | undefined
  loading: boolean
  error: string | null
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined)

export const RoadmapListDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<InterviewPreparation>();
  const [roadmaps, setRoadmaps] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/roadmap/all");
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setRoadmaps(json)
        if (json.length > 0) setSelectedRoadmap(json[0]);

      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <ApiDataContext.Provider value={{ roadmaps, selectedRoadmap, loading, error }}>
      {children}
    </ApiDataContext.Provider>
  )
}

export const useRoadmapListApiData = () => {
  const context = useContext(ApiDataContext)
  if (!context) throw new Error('useApiData must be used within an RoadmapListDataProvider')
  return context
}
