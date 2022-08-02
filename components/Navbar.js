import React from 'react';

const Navbar = () => {
  return (
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <div className='d-flex align-items-center'>
          <img src="/logo.png" alt="" width="50" height="50" class="d-inline-block align-text-center" />
          <div className='ms-2 text-white'>Shree Visa Shreemadi Oswal Kutchi Gurjar Jain Samaj</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
