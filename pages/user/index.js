import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Loading from '../../components/common/Loading';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let familyId = localStorage.getItem('familyId');
    if (familyId === 'Admin') {
      setIsLoading(true)
      fetch(`/api/user/list`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false)
          const familyIdList = [];
          data?.user.forEach(i => familyIdList.push(i.familyId))
          const groupsUserObj = data?.user.reduce((groups, item) => ({
            ...groups,
            [item.familyId]: [...(groups[item.familyId] || []), item]
          }), {});
          setAllUsers(groupsUserObj)
        })
    } else {
      Router.push('/')
    }
  }, [])
  return (
    <div className='container'>
      <table className="table table-hover">
        <thead className="d-none d-md-table-header-group">
          <tr>
            <th className="d-sm-none d-md-table-cell">Family ID</th>
            <th className="d-sm-none d-md-table-cell">First Name</th>
            <th className="d-sm-none d-md-table-cell">Middle Name</th>
            <th className="d-sm-none d-md-table-cell">Last Name</th>
            <th className="d-sm-none d-md-table-cell">Relation</th>
            <th className="d-sm-none d-md-table-cell">Gender</th>
            <th className="d-sm-none d-md-table-cell">Mobile Number</th>
            <th className="d-sm-none d-md-table-cell">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(allUsers).map((id) => {
            return <>
              <tr>
                <td className="d-none d-md-table-cell text-center" colspan="8">=============================================================================================================================================</td>
              </tr>
              {allUsers[id].map((user, unique) => {
                return <>
                  <tr key={unique}>
                    <td className="d-none d-md-table-cell">{user.familyId}</td>
                    <td className="d-none d-md-table-cell">{user.fname}</td>
                    <td className="d-none d-md-table-cell">{user.mname}</td>
                    <td className="d-none d-md-table-cell">{user.lname}</td>
                    <td className="d-none d-md-table-cell">{user.relation}</td>
                    <td className="d-none d-md-table-cell">{user.gender}</td>
                    <td className="d-none d-md-table-cell">{user.mobileNumber}</td>
                    <td className="d-none d-md-table-cell">{user.dob}</td>
                  </tr>
                </>
              })}
            </>
          })}
        </tbody>
      </table>
      {isLoading ? <Loading /> : null}
    </div>
  );
}

export default UserList;
