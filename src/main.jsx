import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'/create-trip',
      element:<CreateTrip/>
    },
    {
      path:'/view-trip/:tripId',
      element:<Viewtrip/>
    },
    {
      path:'my-trips',
      element:<MyTrips/>
    }

  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router = {router}/>
  </GoogleOAuthProvider>
</React.StrictMode>
)
