'use client'

import { apiFetcher } from '@/lib/api/fetcher';
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
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined)

export const RoadmapListDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<InterviewPreparation>();
  const [roadmaps, setRoadmaps] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const json = await apiFetcher<InterviewPreparationArray>("/api/roadmap/all");
      setRoadmaps(json)
      if (json.length > 0) setSelectedRoadmap(json[0]);
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <ApiDataContext.Provider value={{ roadmaps, selectedRoadmap, loading }}>
      {children}
    </ApiDataContext.Provider>
  )
}

export const useRoadmapListApiData = () => {
  const context = useContext(ApiDataContext)
  if (!context) throw new Error('useApiData must be used within an RoadmapListDataProvider')
  return context
}
