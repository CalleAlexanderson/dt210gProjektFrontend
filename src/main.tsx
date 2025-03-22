import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoginProvider } from './context/LoginContext.tsx'
import { ReviewsProvider } from './context/ReviewsContext.tsx'
import { BookProvider } from './context/BookContext.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routing.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <BookProvider>
      <ReviewsProvider>
        <RouterProvider router={router} />
        </ReviewsProvider>
      </BookProvider>
    </LoginProvider>
  </StrictMode>,
)
