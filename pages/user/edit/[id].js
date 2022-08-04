import React, { useState, useEffect } from 'react';
import connectMongo from '../../../utils/connectMongo';
import User from '../../../models/userModel';
import Select from 'react-select';
import Router, { useRouter } from "next/router";
import Input from '../../../components/common/Input';
import { checkValidation, handleSubmitValidation } from '../../../components/common/Validation';
import Navbar from '../../../components/Navbar';
import { fullDate, RelationOptions, GenderOptions } from '../../../utils/helper';

export const getServerSideProps = async (req, res) => {
  try {
    await connectMongo();
    const user = await User.find({ _id: req.query.id });
    return {
      props: {
        getUserDetail: (JSON.parse(JSON.stringify(user)))[0]
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

const EditUser = ({ getUserDetail }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    fname: '',
    mname: '',
    lname: '',
    relation: '',
    gender: '',
    mobileNumber: '',
    dob: ''
  });
  const [error, setError] = useState({
    fname: '',
    mname: '',
    lname: '',
    relation: '',
    gender: '',
    mobileNumber: '',
    dob: ''
  });

  useEffect(() => {
    setUser({
      ...getUserDetail,
      gender: { label: getUserDetail.gender, value: getUserDetail.gender },
      relation: { label: getUserDetail.relation, value: getUserDetail.relation }
    })
  }, []);

  const editUser = async (e) => {
    e.preventDefault();
    const { fname, mname, lname, mobileNumber, dob, relation, gender, familyId, _id } = user;

    let validation = handleSubmitValidation(user)
    setError(validation.errors)

    if (validation.formIsValid) {
      const res = await fetch('/api/user/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          familyId,
          fname,
          mname,
          lname,
          relation: relation.value,
          gender: gender.value,
          mobileNumber,
          dob
        }),
      });
      const data = await res.json();
      Router.push(`/user/${getUserDetail.familyId}`);
    }
  };

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  const handleBlur = (name, value) => {
    let errorObj = checkValidation(name, value);
    setError({ ...error, ...errorObj })
  };
  return (
    <>
      <Navbar isLogout />
      <form className='container border border-3 mt-5 p-3'>
        <h3 className='mt-3'>Edit Family Member</h3>
        <div className="row mt-3">
          <div className="col">
            <Input
              label="First Name"
              type="text"
              name="fname"
              value={user.fname}
              errorMsg={error.fname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
          <div className="col">
            <Input
              label="Middle Name"
              type="text"
              name="mname"
              value={user.mname}
              errorMsg={error.mname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
          <div className="col">
            <Input
              label="Last Name"
              type="text"
              name="lname"
              value={user.lname}
              errorMsg={error.lname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label>Relation</label>
            <Select
              defaultValue={user.relation}
              options={RelationOptions}
              value={user.relation}
              onChange={(e) => handleChange("relation", e)}
            />
            <span className='text-danger'>{error.relation}</span>
          </div>
          <div className="col">
            <label>Gender</label>
            <Select
              defaultValue={user.gender}
              options={GenderOptions}
              value={user.gender}
              onChange={(e) => handleChange("gender", e)}
            />
            <span className='text-danger'>{error.gender}</span>
          </div>
          <div className='col'>
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              max={fullDate}
              value={user.dob}
              errorMsg={error.dob}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Input
              label="Mobile Number"
              type="text"
              name="mobileNumber"
              value={user.mobileNumber}
              errorMsg={error.mobileNumber}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <button type="submit" className="btn btn-primary mt-2" onClick={editUser}>Submit</button>
        </div>
      </form>
    </>
  );
}

export default EditUser;
