import React, { useState } from 'react';
import '../styles/signup.css';
import { instance } from '../utils/AxiosConfig';
import logo from '../images/logo.png';

const SignUp = () => {
  const [input, setInput] = useState({});

  const handleClick = () => {
    if (
      input.phone == undefined ||
      input.password == undefined ||
      input.email == undefined ||
      input.userName == undefined
    ) {
      alert('Form is incomplete');
    } else {
      instance.post('/signup', input).then((response) => {
        console.log(response.data.Status);
        if (response.data.Status === 'S') {
          alert('Successful registered');
          // props.history.push('/Dashboard');
        } else if (response.data.Status === 'F') {
          alert('Username or Email ID already exists');
        }
      });
    }
  };

  return (
    <>
      <div className="container signup">
        <div className="signup-logo">
          <img src={logo} alt="" />
        </div>

        <div className="signup-form">
          <h3>INTRODUCE YOURSELF</h3>
          <label htmlFor="">Hi there! My name is</label>
          <input
            id="username"
            onChange={(event) => {
              setInput({ ...input, [event.target.id]: event.target.value });
            }}
            className="form-control"
            type="text"
            required
          />

          <label htmlFor="">Here’s my email address: </label>
          <input
            id="email"
            onChange={(event) => {
              setInput({ ...input, [event.target.id]: event.target.value });
            }}
            className="form-control"
            type="text"
            required
          />

          <label htmlFor="">And here’s my password: </label>
          <input
            id="password"
            onChange={(event) => {
              setInput({ ...input, [event.target.id]: event.target.value });
            }}
            className="form-control"
            type="text"
            required
          />

          <label htmlFor="">And here’s my Phone NO: </label>
          <input
            id="number"
            onChange={(event) => {
              setInput({ ...input, [event.target.id]: event.target.value });
            }}
            className="form-control"
            type="number"
            required
          />

          <button onClick={handleClick} className="btn">Sign me up!</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
