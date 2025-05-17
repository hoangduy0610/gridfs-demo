import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Appx from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {App} from 'antd'
import { AppContextProvider } from './components/context/app.context.tsx'
import LoginPage from './pages/login/login'
import ProtectedRoute from './components/protected-route.tsx'
import RegisterPage from './pages/register/register.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/home',
    element: <ProtectedRoute><Appx/></ProtectedRoute>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </App>
  </StrictMode>,
)
