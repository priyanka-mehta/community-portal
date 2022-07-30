import React, { useState } from 'react';
import Select from 'react-select';
import Router, { useRouter } from "next/router";
import Input from '../../components/common/Input';
import { checkValidation, handleSubmitValidation } from '../../components/common/Validation';

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
    <form>
      <Input
        label="First Name"
        type="text"
        name="fname"
        value={user.fname}
        errorMsg={error.fname}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
      />
      <Input
        label="Middle Name"
        type="text"
        name="mname"
        value={user.mname}
        errorMsg={error.mname}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
      />
      <Input
        label="Last Name"
        type="text"
        name="lname"
        value={user.lname}
        errorMsg={error.lname}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
      />
      <div>
        <label>Relation</label>
        <Select
          defaultValue={user.relation}
          options={RelationOptions}
          value={user.relation}
          onChange={(e) => handleChange("relation", e)}
        />
        {error.relation}
      </div>
      <div>
        <label>Gender</label>
        <Select
          defaultValue={user.gender}
          options={GenderOptions}
          value={user.gender}
          onChange={(e) => handleChange("gender", e)}
        />
        {error.gender}
      </div>
      <Input
        label="Mobile"
        type="text"
        name="mobileNumber"
        value={user.mobileNumber}
        errorMsg={error.mobileNumber}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dob"
        value={user.dob}
        errorMsg={error.dob}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.name, e.target.value)}
      />
      <button type="submit" className="btn btn-primary" onClick={addNewUser}>Add user</button>
    </form>
  );
}

export default AddUser;
