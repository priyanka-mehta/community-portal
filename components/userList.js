import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Loading from './common/Loading';

const UserList = (props) => {
  const [familyList, setFamilyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (props.familyId) {
      setIsLoading(true)
      fetch(`/api/user/list?familyId=${props.familyId}`)
        .then((res) => res.json())
        .then((data) => {
          setFamilyList(data?.user);
          let hof = data?.user.find(i => i.relation === 'Self').fname;
          props.setHof(hof);
          setIsLoading(false);
        })
    } else {
      Router.push('/')
    }
  }, [])

  const deleteModal = (flag, id) => {
    setUserId(id)
    setModalOpen(flag);
  }

  const deleteUser = async (userId) => {
    setIsLoading(true)
    fetch(`/api/user/delete?userId=${userId}`, { method: 'DELETE' })
      .then(() => {
        setModalOpen(false);
        setIsLoading(false)
        let updatedUsers = familyList.filter(i => i._id !== userId);
        setFamilyList(updatedUsers)
      });
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
          {(familyList || []).map((user, key) => (
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
                    <Link href={{ pathname: `/user/edit/${user._id}`, query: { hof: props.hof } }}><button className='btn btn-primary me-2'> Edit </button></Link>
                    {user.relation === 'Self' ? null : <button className='btn btn-danger' onClick={() => deleteModal(true, user._id)}> Delete </button>}
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
                <Link href={{ pathname: `/user/edit/${user._id}`, query: { hof: props.hof } }}><button className='btn btn-primary me-2'> Edit </button></Link>
                {user.relation === 'Self' ? null : <button className='btn btn-danger' onClick={() => deleteModal(true, user._id)}> Delete </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <Loading /> : null}

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
