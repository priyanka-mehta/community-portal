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
                      {
                        passwordShown
                          ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>
                          : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                      }
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
