import React, { useState } from 'react';
import Input from './common_components/Input';

const AddUser = () => {

  const [user, setUser] = useState({});

  const addNewUser = async () => {
    const { name, email, mobileNumber } = user;
    const randomNum = Math.floor(Math.random() * 1000);
    const res = await fetch('/api/test/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        gender: 'female',
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
        label="Name"
        type="text"
        name="name"
        onChange={handleChange}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        onChange={handleChange}
      />
      <Input
        label="Mobile"
        type="text"
        name="mobile"
        onChange={handleChange}
      />
      <button onClick={addNewUser}>Add user</button>
    </div>
  );
}

export default AddUser;
