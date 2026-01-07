// import { useState } from 'react'
import Home from '@/pages/Home/Home'

import './App.css'
import { SharedLayout } from '@/shared/components/layout/SharedLayout'
import { Route, Routes } from 'react-router-dom'
import ExercisesLib from '@/pages/exercises-lib/ExercisesLib'
import { ErrorBoundary } from '@/shared/ui/error/Error'

function App() {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = false

  return (

    <ErrorBoundary fallback={<div style={{color: 'red', padding: '50px'}}>CRITICAL APP CRASH: Check dependencies or imports.</div>}>
  
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          
          <Route index element={<Home isLoggedIn={isLoggedIn} />} />

          <Route path="/exercises" element={<ExercisesLib />} />
          
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>

    // </ErrorBoundary>


  )
}

export default App
