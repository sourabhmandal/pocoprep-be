import { create } from 'zustand'

interface RoadmapMetaData {
  id: number
  topic: string
  interviewer: string
  created_at: string
}
export interface RoadmapTopicItem {
  title: string
  importance_score: number
  subtopics: Array<{
    id: number
    title: string
  }>
}

export interface ChatHistory {
  count: number
  next: any
  previous: any
  results: Array<{
    id: number
    subtopic: number
    user_message: string
    llm_response: string
    timestamp: string
  }>
}


export interface RoadmapDetails extends RoadmapMetaData {
  topics: Array<RoadmapTopicItem>
}


interface RoadmapStore {
  roadmaps: Array<RoadmapMetaData>
  selectedRoadmap: RoadmapMetaData | null
  roadmapDetails: RoadmapDetails | null
  chatHistory: ChatHistory | null
  setRoadmapDetail: (data: RoadmapDetails) => void
  setRoadmapList: (data: Array<RoadmapMetaData>) => void
  setSelectedRoadmap: (data: RoadmapMetaData) => void
  setChatHistory: (data: ChatHistory) => void
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  roadmapDetails: null,
  selectedRoadmap: null,
  roadmaps: [],
  chatHistory: null,
  // Actions to update the store
  setRoadmapDetail: (data) => set({ roadmapDetails: data }),
  setRoadmapList: (data) => set({ roadmaps: data }),
  setSelectedRoadmap: (data) => set({ selectedRoadmap: data }),
  setChatHistory: (data) => set({ chatHistory: data})
}))
