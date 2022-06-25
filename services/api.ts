import axios, { AxiosError } from 'axios'

import { AuthTokenError } from './errors/AuthTokenError'
import { destroyCookie, parseCookies } from 'nookies'

const url = 'http://localhost:5000/api/'

export function setupAPIClient (ctx: any = undefined) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: url,
    headers: {
      Authorization: cookies['gameTracking.token'] && `Bearer ${cookies['gameTracking.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (process.browser) {
        destroyCookie(undefined, 'gameTracking.token')
      } else {
        return Promise.reject(new AuthTokenError())
      }
    } else {
      return Promise.reject(error)
    }
  })

  return api
}
