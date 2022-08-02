import React, { useState } from 'react';

import Router, { useRouter } from "next/router";

const UserList = ({ users }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const deleteModal = (flag, id) => {
    setUserId(id)
    setModalOpen(flag);
  }

  const deleteUser = async (userId) => {
    console.log(userId);
    const res = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId
      }),
    });
    const data = await res.json();
    Router.push(`/user/${router.query.id}`);
  }

  return (
    <>
      <div className="mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Relation</th>
            <th>Gender</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
            <th>Action</th>
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
                <td>
                  <button className='btn btn-primary me-2'> Edit </button>
                  <button className='btn btn-danger' onClick={() => deleteModal(true, user._id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Delete Modal */}
      {modalOpen &&
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the user?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteUser(userId)}>Delete</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}

export default UserList;
