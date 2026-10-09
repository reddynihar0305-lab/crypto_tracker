import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import CoinDetails from './pages/Coindetails'


function App() {

  return ( 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coin/:id' element={<CoinDetails/>}/>
    </Routes>
  )
}

export default App
