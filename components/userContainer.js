import React from 'react';
// import AddUser from './addUserComponent';
import UserList from './userList';

const UserContainer = ({ users }) => {
  return (
    <div>
      {/* <AddUser /> */}
      <UserList users={users} />
    </div>
  );
}

export default UserContainer;
