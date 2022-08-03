import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const UserList = ({ users }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const deleteModal = (flag, id) => {
    setUserId(id)
    setModalOpen(flag);
  }

  const deleteUser = async (userId) => {
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
    setModalOpen(false);
    Router.push(`/user/${router.query.id}`);
  }

  return (
    <>
      <table className="table table-hover">
        <thead className="d-none d-md-table-header-group">
          <tr>
            <th className="d-sm-none d-md-table-cell">First Name</th>
            <th className="d-sm-none d-md-table-cell">Middle Name</th>
            <th className="d-sm-none d-md-table-cell">Last Name</th>
            <th className="d-sm-none d-md-table-cell">Relation</th>
            <th className="d-sm-none d-md-table-cell">Gender</th>
            <th className="d-sm-none d-md-table-cell">Mobile Number</th>
            <th className="d-sm-none d-md-table-cell">Date of Birth</th>
            <th className="d-sm-none d-md-table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user, key) => (
            <tr key={key}>
              <td className="d-md-none d-table-cell">
                <div className="card">
                  <div className="card-body">
                    <strong className="card-title">{user.fname} {user.mname} {user.lname}</strong>
                    <p className="card-text">
                      <b>Relation:</b> {user.relation}<br />
                      <b>Gender:</b> {user.gender}<br />
                      <b>Date of Birth:</b> {user.dob}<br />
                      <b>Mobile Number: </b> {user.mobileNumber}<br />
                    </p>
                    <Link href={{ pathname: `/user/edit/${user._id}` }}><button className='btn btn-primary me-2'> Edit </button></Link>
                    <button className='btn btn-danger' onClick={() => deleteModal(true, user._id)}> Delete </button>
                  </div>
                </div>
              </td>
              <td className="d-none d-md-table-cell">{user.fname}</td>
              <td className="d-none d-md-table-cell">{user.mname}</td>
              <td className="d-none d-md-table-cell">{user.lname}</td>
              <td className="d-none d-md-table-cell">{user.relation}</td>
              <td className="d-none d-md-table-cell">{user.gender}</td>
              <td className="d-none d-md-table-cell">{user.mobileNumber}</td>
              <td className="d-none d-md-table-cell">{user.dob}</td>
              <td className="d-none d-md-table-cell">
                <Link href={{ pathname: `/user/edit/${user._id}` }}><button className='btn btn-primary me-2'> Edit </button></Link>
                <button className='btn btn-danger' onClick={() => deleteModal(true, user._id)}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
