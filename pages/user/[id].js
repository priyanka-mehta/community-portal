import React from 'react';
import Link from "next/link";
import UserList from '../../components/userList';
import Navbar from '../../components/Navbar';

const Id = () => {

  const familyId = localStorage.getItem('familyId');

  return (
    <>
      <div className='user-list-nav'><Navbar isLogout/></div>
      <div className='container mt-5'>
        <Link href={{ pathname: '/user/add', query: { familyId } }}>
          <button className='btn btn-primary'>
            Add Family Member
          </button>
        </Link>
        <UserList familyId={familyId} />
      </div>
    </>
  );
}

export default Id;
