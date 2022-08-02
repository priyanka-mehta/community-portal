import React from 'react';
import Link from "next/link";
import connectMongo from '../../utils/connectMongo';
import User from '../../models/userModel';
import UserList from '../../components/userList';
import Navbar from '../../components/Navbar';

export const getServerSideProps = async (req, res) => {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    console.log(req.query.id)
    console.log('FETCHING DOCUMENTS');
    const users = await User.find({ familyId: req.query.id });
    console.log('FETCHED DOCUMENTS');

    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
        familyId: req.query.id
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

const Id = ({ users, familyId }) => {
  return (
    <>
      <div className='user-list-nav'><Navbar /></div>
      <div className='container mt-5'>
        <Link href={{ pathname: '/user/add', query: { familyId } }}>
          <button className='btn btn-primary'>
            Add Family Member
          </button>
        </Link>
        <UserList users={users} />
      </div>
    </>
  );
}

export default Id;
