'use client'

import { apiFetcher } from '@/lib/api/fetcher'
import React, { createContext, useContext, useEffect, useState } from 'react'


interface InterviewPreparationSubTopic {
  id: number
  title: string
}

interface InterviewPreparationTopic {
  id: number
  title: string
  importance_score: number
  subtopics: Array<InterviewPreparationSubTopic>
}

interface InterviewPreparation {
  id: number
  interviewer: string
  topic: string
  llm_response: string
  created_at: string
  topics: Array<InterviewPreparationTopic>
}


type ApiDataContextType = {
  roadmap: InterviewPreparation | null
  selectedSubtopic?: InterviewPreparationSubTopic | null
  loading: boolean
  error: string | null
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined)

export const RoadmapDetailDataProvider = ({ children, id }: { children: React.ReactNode, id: number }) => {
  const [roadmap, setRoadmap] = useState<InterviewPreparation | null>(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState<InterviewPreparationSubTopic | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json: InterviewPreparation = await apiFetcher<InterviewPreparation>(`/api/roadmap/${id}`);
        setRoadmap(json)
        setSelectedSubtopic(json.topics[0]?.subtopics[0] || null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id]) // Added id to dependencies, in case it changes dynamically

  return (
    <ApiDataContext.Provider value={{ roadmap, loading, error }}>
      {children}
    </ApiDataContext.Provider>
  )
}

// ✅ No need to pass id here
export const useRoadmapDetailApiData = () => {
  const context = useContext(ApiDataContext)
  if (!context) throw new Error('useRoadmapDetailApiData must be used within a RoadmapDetailDataProvider')
  return context
}
