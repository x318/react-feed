import React from 'react'
import { ReactComponent as LogoutIcon } from '../svg/logout.svg'
import { useHistory } from 'react-router-dom'

function Logout() {
  const history = useHistory()

  function handleLogout() {
    sessionStorage.clear()
    history.push('/login')
  }

  return (
    <div className="fixed">
      <LogoutIcon
        onClick={() => handleLogout()}
        className="p-2 ml-4 rounded-md h-11 w-11 shadow-md border-2 cursor-pointer bg-white"
      />
    </div>
  )
}

export default Logout
