import axios from 'axios'

export const controller = new AbortController()

export const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  signal: controller.signal,
  timeout: 5000,
})
