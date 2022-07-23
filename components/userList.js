import React from 'react';

const UserList = ({ users }) => {
  return (
    <>
      <a href="/add-user">Add User</a>
      <div className="">
        <table className="table table-striped table-hover">
          <thead>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Relation</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
          </thead>
          <tbody>
            {(users || []).map((user, key) => (
              <tr key={key}>
                <td>{user.fname}</td>
                <td>{user.mname}</td>
                <td>{user.lname}</td>
                <td>{user.relation}</td>
                <td>{user.gender}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
