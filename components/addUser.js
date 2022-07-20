import React, { useState } from 'react';
import Select from 'react-select';
import Input from './common_components/Input';

const options = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

const AddUser = () => {

  const [user, setUser] = useState({});
  const [gender, setGender] = useState(null);

  const addNewUser = async () => {
    const { fname, mname, lname, email, mobileNumber } = user;
    const randomNum = Math.floor(Math.random() * 1000);
    const res = await fetch('/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        mname,
        lname,
        email,
        gender: gender.value,
        mobileNumber
      }),
    });
    const data = await res.json();
    console.log(data);
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
        name="mobile"
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

export default AddUser;
