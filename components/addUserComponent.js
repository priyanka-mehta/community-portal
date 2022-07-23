import React, { useState } from 'react';
import Select from 'react-select';
import Router from "next/router";
import Input from './common_components/Input';

const options = [
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

const AddUserComponent = () => {

  const [user, setUser] = useState({});
  const [gender, setGender] = useState(null);
  const [relation, setRelation] = useState(null);

  const addNewUser = async () => {
    const { fname, mname, lname, email, mobileNumber } = user;
    const randomNum = Math.floor(Math.random() * 1000);
    const res = await fetch('/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        familyId: fname + mname + lname,
        fname,
        mname,
        lname,
        email,
        relation,
        gender: gender.value,
        mobileNumber
      }),
    });
    const data = await res.json();
    console.log(data);
    Router.push("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Input
        label="First Name"
        type="text"
        name="fname"
        onChange={handleChange}
      />
      <Input
        label="Middle Name"
        type="text"
        name="mname"
        onChange={handleChange}
      />
      <Input
        label="Last Name"
        type="text"
        name="lname"
        onChange={handleChange}
      />
      <label>Relation</label>
      <Select
        defaultValue={relation}
        onChange={setRelation}
        options={RelationOptions}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        onChange={handleChange}
      />
      <label>Gender</label>
      <Select
        defaultValue={gender}
        onChange={setGender}
        options={options}
      />
      <Input
        label="Mobile"
        type="text"
        name="mobileNumber"
        onChange={handleChange}
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dob"
        onChange={handleChange}
      />
      <button onClick={addNewUser}>Add user</button>
    </div>
  );
}

export default AddUserComponent;
