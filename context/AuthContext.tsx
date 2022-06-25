import React, { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { api } from '../services/apiClient'
import AlertComponent from '../components/AlertComponent'

type SignInCredentials = {
    email: string;
    password: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type UserInfo = {
    id: number;
    nome: string;
    email: string;
    tipo: number;
  }

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    userInfo: UserInfo | undefined;
    isAuthenticated: boolean;
    getUserInfo: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo|undefined>()
  const isAuthenticated = !!userInfo

  const [showAlert, setShowAlert] = useState(false)
  const [alertSettings, setAlertSettings] = useState<{
    message: string,
    type: 'success'|'error'|'warning'|'info'
  }>({
    message: '',
    type: 'success'
  })

  useEffect(() => console.log('auth: ', isAuthenticated), [isAuthenticated])

  useEffect(() => {
    const { 'gameTracking.token': token } = parseCookies()
    if (token) { getUserInfo() }
  }, [])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  useEffect(() => {
    console.log('userInfo: ', userInfo)
  }, [userInfo])

  async function getUserInfo () {
    await api.get('usuario/me')
      .then(res => setUserInfo(res.data))
      .catch(() => signOut)
  }

  async function signIn ({ email, password, setLoading }: SignInCredentials) {
    if (setLoading) {
      setLoading(true)
    }
    api.post('usuario/login', {
      email: email,
      senha: password
    })
      .then(async res => {
        const token: string = res.data.token
        setCookie(undefined, 'gameTracking.token', token, {
          maxAge: 60 * 60 * 24 * 5, // 5 days
          path: '/'
        })

        api.defaults.headers.common.Authorization = `Bearer ${token}`

        getUserInfo()

        setAlertSettings({
          message: res?.data?.mensagem,
          type: 'success'
        })

        Router.push('/')
      })
      .catch(err => setAlertSettings({
        message: err?.response?.data?.mensagem || 'Falha na autenticação!',
        type: 'error'
      }))
      .finally(() => {
        if (setLoading) {
          setLoading(false)
        }
      })
  }

  async function signOut () {
    destroyCookie(undefined, 'gameTracking.token')
    setUserInfo(undefined)
  }

  return (
    <AuthContext.Provider value={{ signIn, userInfo, isAuthenticated, getUserInfo, signOut }}>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
      {children}
    </AuthContext.Provider>
  )
}
