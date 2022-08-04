import React from 'react';
import Router from 'next/router';

const Navbar = ({ isLogout }) => {

  const handleLogout = () => {
    localStorage.removeItem('familyId');
    Router.push('/')
  }

  return (
    <nav className="navigation navbar-dark bg-primary">
      <img src="/logo.png" alt="" width="50" height="50" className="d-inline-block align-text-center" />
      <p className='ms-2 text-white w-75'>
        Shree Visa Shreemadi Oswal Kutchi Gurjar Jain Samaj
      </p>
      {isLogout ? <button className='btn btn-danger' onClick={handleLogout}>Logout</button> : null}
    </nav>
  );
}

export default Navbar;
