import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {App as AntdApp} from 'antd'
import { AppContextProvider } from './components/context/app.context.tsx'
import LoginPage from './pages/login/login'
import ProtectedRoute from './components/protected-route.tsx'
import RegisterPage from './pages/register/register.tsx'
import UploadPage from './pages/upload/upload.tsx'
import Appx from './components/layout/layout.tsx'
import VideoPlayerPage from './pages/video-player/video-player.tsx'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <ProtectedRoute><Appx/></ProtectedRoute>,
  },
  {
    path: '/',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  }
  ,
  {
    path: '/upload',
    element: <ProtectedRoute><UploadPage/></ProtectedRoute>,
  },
  {
    path: '/watch/:id',
    element: <ProtectedRoute><VideoPlayerPage/></ProtectedRoute>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntdApp>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </AntdApp>
  </StrictMode>,
)
