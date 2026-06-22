import api from './client'

export const authApi = {
  login: (email, password) => {
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    return api.post('/auth/login', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },
  me: () => api.get('/auth/me'),
}

export const playersApi = {
  list: (params) => api.get('/players/', { params }),
  create: (data) => api.post('/players/', data),
  me: () => api.get('/players/me'),
  get: (id) => api.get(`/players/${id}`),
  update: (id, data) => api.put(`/players/${id}`, data),
  delete: (id) => api.delete(`/players/${id}`),
}

export const exercisesApi = {
  list: () => api.get('/exercises/'),
  create: (data) => api.post('/exercises/', data),
  update: (id, data) => api.put(`/exercises/${id}`, data),
  delete: (id) => api.delete(`/exercises/${id}`),
  assign: (data) => api.post('/exercises/assign', data),
  assigned: (playerId) => api.get(`/exercises/assigned/${playerId}`),
}

export const progressApi = {
  complete: (assignmentId, data = {}) =>
    api.put(`/progress/${assignmentId}/complete`, data),
  player: (playerId) => api.get(`/progress/player/${playerId}`),
}

export const metricsApi = {
  create: (data) => api.post('/metrics/', data),
  player: (id) => api.get(`/metrics/player/${id}`),
  latest: (id) => api.get(`/metrics/player/${id}/latest`),
}

export const feesApi = {
  list: (params) => api.get('/fees/', { params }),
  create: (data) => api.post('/fees/', data),
  update: (id, data) => api.put(`/fees/${id}`, data),
  player: (id) => api.get(`/fees/player/${id}`),
  summary: () => api.get('/fees/summary/stats'),
}

export const coachesApi = {
  list: () => api.get('/coaches/'),
  create: (data) => api.post('/coaches/', data),
  update: (id, data) => api.put(`/coaches/${id}`, data),
  delete: (id) => api.delete(`/coaches/${id}`),
}

export const achievementsApi = {
  list: () => api.get('/achievements'),
  create: (data) => api.post('/achievements', data),
  update: (id, data) => api.put(`/achievements/${id}`, data),
}

export const enquiriesApi = {
  create: (data) => api.post('/enquiries/', data),
  list: (params) => api.get('/enquiries/', { params }),
  updateStatus: (id, status) => api.put(`/enquiries/${id}`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
}

