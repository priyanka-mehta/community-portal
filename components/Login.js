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

  const [invalidError, setInvalidError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (e) => {
    setInvalidError('')
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

    if (loginDetails.familyId !== '' && loginDetails.password !== '') {
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
        setInvalidError("Invalid FamilyID and Password")
        Router.push('/');
        setIsLoading(false);
      }
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='container mt-5 p-3'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <p className='text-danger'>{invalidError}</p>
          <div className='card'>
            <div className="card-header">
              <h5>Login</h5>
            </div>
            <div className='card card-body'>
              <div className='form-group mb-2'>
                <Input
                  label="Family ID"
                  name="familyId"
                  onChange={handleChange}
                  value={loginDetails.familyId}
                  errorMsg={error.familyId}
                  onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                />
              </div>
              <div className='form-group mb-2'>
                <label>Password</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={loginDetails.password}
                    type={passwordShown ? "text" : "password"}
                    icon={passwordShown ? "bi bi-eye-slash" : "bi bi-eye"}
                    onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                  />
                  <div className="input-group-addon ms-auto">
                    <button className='btn bg-light' onClick={() => togglePassword()}>
                      <i className={passwordShown ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <span className='text-danger'>{error.password}</span>
              </div>
              <button type='submit' className="btn btn-primary mt-2" onClick={(e) => handleLogin(e)}>Submit</button>
              {isLoading ? <Loading /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
