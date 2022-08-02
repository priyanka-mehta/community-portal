import React, { useState } from 'react';
import Select from 'react-select';
import Router, { useRouter } from "next/router";
import Input from '../../components/common/Input';
import { checkValidation, handleSubmitValidation } from '../../components/common/Validation';
import Navbar from '../../components/Navbar';

const GenderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

const RelationOptions = [
  { value: 'self', label: 'Self' },
  { value: 'wife', label: 'Wife' },
  { value: 'son', label: 'Son' },
  { value: 'daughter', label: 'Daughter' },
  { value: 'daughter-in-law', label: 'Daughter-in-law' },
  { value: 'grand-son', label: 'Grand-son' },
  { value: 'grand-daughter', label: 'Grand-daughter' }
]

const AddUser = () => {

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

  const addNewUser = async (e) => {
    e.preventDefault();
    const { fname, mname, lname, email, mobileNumber, dob, relation, gender } = user;

    let validation = handleSubmitValidation(user)
    setError(validation.errors)

    if (validation.formIsValid) {
      const res = await fetch('/api/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          familyId: router.query.familyId,
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
      Router.push(`/user/${router.query.familyId}`);
    }
  };

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  const handleBlur = (name, value) => {
    console.log(name, value);
    let errorObj = checkValidation(name, value);
    setError({ ...error, ...errorObj })
  };

  return (
    <>
    <Navbar />
      <form className='container border border-3 mt-5 p-3'>
        <h3 className='mt-3'>Add Family Member</h3>
        <div class="row mt-3">
          <div class="col">
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
          <div class="col">
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
          <div class="col">
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
        <div class="row mt-3">
          <div class="col">
            <label>Relation</label>
            <Select
              defaultValue={user.relation}
              options={RelationOptions}
              value={user.relation}
              onChange={(e) => handleChange("relation", e)}
            />
            <span className='text-danger'>{error.relation}</span>
          </div>
          <div class="col">
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
              value={user.dob}
              errorMsg={error.dob}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
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
        <div class="row mt-3">
          <button type="submit" className="btn btn-primary mt-2" onClick={addNewUser}>Submit</button>
        </div>
      </form>
    </>
  );
}

export default AddUser;
