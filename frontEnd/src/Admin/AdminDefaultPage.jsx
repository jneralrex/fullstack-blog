import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles/General.css'


const AdminDefaultPage = () => {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  
  )
}

export default AdminDefaultPage