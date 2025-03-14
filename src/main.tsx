import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoginProvider } from './context/LoginContext.tsx'
import { ReviewsProvider } from './context/ReviewsContext.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routing.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <ReviewsProvider>
        <RouterProvider router={router} />
      </ReviewsProvider>
    </LoginProvider>
  </StrictMode>,
)
