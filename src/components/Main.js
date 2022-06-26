import React from 'react'
import Categories from './Categories'
// import PlaylistPage from './pages/PlaylistPage'
import { Route, Routes } from 'react-router-dom'


const Main = () => {
  return (
    <div className="main">
      <div className="upperNav">
      <img className='ozen-logo' src="/ozen_white.png" alt=''></img>
      </div>
      <div className='mainContent'>
         
        <Routes>
        <Route path="/" element={<Categories
        
        />}></Route>

        <Route path="/search">
            Search 
            </Route>
 
        <Route path="/your-library">
            Your library</Route>

            {/* <Route path="/your-playlist/:id" element={<PlaylistPage/>}></Route> */}

        </Routes>


    
      </div>
    </div> 
  )
}

export default Main