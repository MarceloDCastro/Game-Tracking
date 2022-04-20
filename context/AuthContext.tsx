import React, { createContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { api } from '../services/api'
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
}

type AuthProviderProps = {
    children: React.ReactNode;
}

export async function signOut () {
  destroyCookie(undefined, 'gameTracking.token')
  Router.push('/')
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

  useEffect(() => {
    const { 'gameTracking.token': token } = parseCookies()
    if (token) { getUserInfo() }
  }, [])

  useEffect(() => {
    if (alertSettings.message !== '') { setShowAlert(true) }
  }, [alertSettings])

  async function getUserInfo () {
    await api.get('usuario/me')
      .then(res => setUserInfo(res.data))
      .catch(() => signOut)
  }

  async function signIn ({ email, password, setLoading }: SignInCredentials) {
    api.post('usuario/login', {
      email: email,
      senha: password
    })
      .then(async res => {
        const token: string = res.data.token
        setCookie(undefined, 'officeSafe.token', token, {
          maxAge: 60 * 60 * 24 * 5, // 5 days
          path: '/'
        })

        api.defaults.headers.common.Authorization = `Bearer ${token}`

        // setUserInfo(res.data.usuario)
        setAlertSettings({
          message: res.data.mensagem,
          type: 'success'
        })
      })
      .catch(err => setAlertSettings({
        message: err.response.data.mensagem,
        type: 'error'
      }))
      .finally(() => {
        if (setLoading) {
          setLoading(false)
        }
      })
  }

  return (
    <AuthContext.Provider value={{ signIn, userInfo, isAuthenticated, getUserInfo }}>
    <AlertComponent message={alertSettings.message} type={alertSettings.type} showAlert={showAlert} setShowAlert={setShowAlert} />
      {children}
    </AuthContext.Provider>
  )
}
