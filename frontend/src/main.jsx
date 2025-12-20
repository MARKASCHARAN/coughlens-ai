import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'
import { VoiceProvider } from './context/VoiceContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="coughlens-ui-theme">
      <UserProvider>
        <VoiceProvider>
             <RouterProvider router={router} />
        </VoiceProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
