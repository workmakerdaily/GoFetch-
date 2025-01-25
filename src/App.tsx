import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';

const App =() => {

  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <NavigationBar />

    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    </div>
  )
}

export default App;
