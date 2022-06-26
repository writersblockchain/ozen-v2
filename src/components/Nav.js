import React from 'react'
import {
  Link
} from "react-router-dom";


const Nav = () => {
  return (
       <div className='navBar'>
        <div className='logo'></div>
        <ul>
          <Link to='/'>
          <li className='active'>
            Home
          </li>
          </Link>

          <Link to='/search'>
          <li>Search</li>
          </Link>

          <Link to='/your-library'>
          <li>Your Library</li>
          </Link>
        </ul>

        
        <div className='cookies'>
          <span>Coded by</span>
          <span>Chainshot devs</span>
        </div>

        </div>
     
  )
}

export default Nav