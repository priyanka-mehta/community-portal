import React, { useState } from 'react';
import Router from "next/router";
import Input from './common/Input';
import { checkValidation, handleSubmitValidation } from './common/Validation';
import Loading from './common/Loading';

const Login = () => {

  const [loginDetails, setLoginDetails] = useState({
    familyId: '',
    password: ''
  });

  const [error, setError] = useState({
    familyId: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }

  const handleBlur = (name, value) => {
    let errorObj = checkValidation(name, value);
    setError({ ...error, ...errorObj })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { familyId, password } = loginDetails;
    let obj = {}
    obj.familyId = !familyId ? "FamilyId is Required" : ""
    obj.password = !password ? "Password is Required" : ""

    setError({ ...obj })

    if (error.familyId === '' && error.password === '') {
      setIsLoading(true);
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          familyId,
          password
        }),
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        localStorage.setItem('familyId', familyId);
        Router.push(`/user/${familyId}`);
        setIsLoading(false);
      } else {
        Router.push('/');
        setIsLoading(false);
      }
    }
  }

  return (
    <form className='container border border-3 mt-5 p-3'>
      <h3 className='mt-3'>Login</h3>
      <div className="row mt-3">
        <div className="col">
          <Input
            label="Family ID"
            name="familyId"
            onChange={handleChange}
            value={loginDetails.familyId}
            errorMsg={error.familyId}
            onBlur={(e) => handleBlur(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Input
            label="Password"
            name="password"
            onChange={handleChange}
            value={loginDetails.password}
            type="password"
            errorMsg={error.password}
            onBlur={(e) => handleBlur(e.target.name, e.target.value)}
          />
        </div>
      </div>
      {isLoading ? <Loading /> : null}
      <button type='submit' className="btn btn-primary mt-2" onClick={(e) => handleLogin(e)}>Submit</button>
    </form>
  );
}

export default Login;
