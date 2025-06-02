import { create } from 'zustand'

interface RoadmapData {
  id: number
  topic: string
  interviewer: string
  created_at: string
}

interface RoadmapStore {
  roadmaps: Array<RoadmapData>
  selectedRoadmap: RoadmapData | null
  roadmapDetails: RoadmapData | null
  setRoadmapDetail: (data: RoadmapData) => void
  setRoadmapList: (data: Array<RoadmapData>) => void
  setSelectedRoadmap: (data: RoadmapData) => void
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  roadmapDetails: null,
  selectedRoadmap: null,
  roadmaps: [],
  setRoadmapDetail: (data) => set({ roadmapDetails: data }),
  setRoadmapList: (data) => set({ roadmaps: data }),
  setSelectedRoadmap: (data) => set({ selectedRoadmap: data }),
}))
