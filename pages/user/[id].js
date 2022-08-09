import React, { useState } from 'react';
import Link from "next/link";
import UserList from '../../components/userList';
import Navbar from '../../components/Navbar';

const Id = () => {

  const familyId = localStorage.getItem('familyId');
  const [hof, setHof] = useState('');

  const handleHof = (data) => {
    setHof(data)
  }

  return (
    <>
      <div className='user-list-nav'><Navbar isLogout /></div>
      <div className='container mt-5'>
        <Link href={{ pathname: '/user/add', query: { familyId, hof } }}>
          <button className='btn btn-primary'>
            Add Family Member
          </button>
        </Link>
        <UserList familyId={familyId} setHof={handleHof} hof={hof} />
      </div>
    </>
  );
}

export default Id;
