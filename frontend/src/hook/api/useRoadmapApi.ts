'use client'
// hooks/useFetchAllRoadmaps.ts
import { useQuery } from '@tanstack/react-query'
import { useRoadmapStore } from '@/hook/store/useRoadmapStore'

const fetchRoadmapDetails = async (id: number) => {
  const res = await fetch(`/api/roadmap/${id}`)
  if (!res.ok) throw new Error('Failed to fetch roadmap')
  return res.json()
}

const fetchRoadmapList = async () => {
  const res = await fetch(`api/roadmap/all`)
  if (!res.ok) throw new Error('Failed to fetch roadmap')
  return res.json()
}

export const useFetchRoadmapList = () => {
  const setRoadmapList = useRoadmapStore((state) => state.setRoadmapList)
    const setSelectedRoadmap = useRoadmapStore((state) => state.setSelectedRoadmap)


  const response = useQuery({
    queryKey: ['roadmap'],
    queryFn: () => fetchRoadmapList(),
  })
  if (response.isSuccess && response.data) {
    setRoadmapList(response.data)
    setSelectedRoadmap(response.data[0] || null)
  }
  return response
}

export const useFetchRoadmapDetail = (id: number) => {
  const setRoadmapDetail = useRoadmapStore((state) => state.setRoadmapDetail)

  const response = useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => fetchRoadmapDetails(id),
  })
  if (response.isSuccess && response.data) {
    setRoadmapDetail(response.data)
  }
  return response
}

