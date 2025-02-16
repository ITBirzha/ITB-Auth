import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 300
})

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  try {
    const response = await api.post<T>(url, data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const message =
        error.response.data?.message ||
        `Ошибка ${error.response.status}: ${error.response.statusText}`
      throw new Error(message)
    } else {
      throw new Error('Произошла ошибка сети. Проверьте подключение.')
    }
  }
}
