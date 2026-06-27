import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Global axios interceptor: catch 401 (expired/invalid JWT) and redirect to login
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      // Only redirect if not already on the login page
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <App />
  </BrowserRouter>,
)
