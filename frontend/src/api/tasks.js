import api from './axiosInstance'

export const getTasks    = (params) => api.get('/tasks/', { params })
export const createTask  = (data)   => api.post('/tasks/', data)
export const updateTask  = (id, data) => api.patch(`/tasks/${id}/`, data)
export const deleteTask  = (id)     => api.delete(`/tasks/${id}/`)