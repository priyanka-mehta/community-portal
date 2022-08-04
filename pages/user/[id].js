import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Router from "next/router";
import UserList from '../../components/userList';
import Navbar from '../../components/Navbar';
import Loading from '../../components/common/Loading';

const Id = () => {
  const [familyId, setFamilyId] = useState('')
  const [familyList, setFamilyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let familyId = localStorage.getItem('familyId');
    setFamilyId(familyId);
    if (familyId) {
      setIsLoading(true)
      fetch(`/api/user/list?familyId=${familyId}`)
        .then((res) => res.json())
        .then((data) => {
          setFamilyList(data)
          setIsLoading(false)
        })
    } else {
      Router.push('/')
    }
  }, [])

  return (
    <>
      <div className='user-list-nav'><Navbar /></div>
      <div className='container mt-5'>
        <Link href={{ pathname: '/user/add', query: { familyId } }}>
          <button className='btn btn-primary'>
            Add Family Member
          </button>
        </Link>
        <UserList users={familyList?.user} />
        {isLoading ? <Loading /> : null}
      </div>
    </>
  );
}

export default Id;
