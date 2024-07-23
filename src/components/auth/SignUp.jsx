import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './CSS/SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const backhandle = () => {
    navigate('/adminhome');
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const passwordmatchtest = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (password!== confirmPasswordValue) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const signUp = (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
       .then((userCredentials) => {
          console.log('User created:', userCredentials);

          const userRef = ref(db, `UserauthList/${userCredentials.user.uid}`);
          set(userRef, {
            firstName: firstName,
            lastName: lastName,
            occupation: selectedOption,
            officeemail:email,
            profilePicture: '', 
            personalemail: '',
            dateOfBirth: '', 
            phoneNumber: '', 
            address: '', 
          }).then(() => {
            console.log('User data saved to database successfully');
            window.location.reload();
          }).catch((error) => {
            console.error('Error saving user data to database:', error);
          });
        }).catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  };

  const validateFields = () => {
    if (!firstName) {
      alert('Please enter your first name');
      return false;
    }

    if (!lastName) {
      alert('Please enter your last name');
      return false;
    }

    if (!email) {
      alert('Please enter your email');
      return false;
    }

    if (!password) {
      alert('Please enter a password');
      return false;
    }

    if (!confirmPassword) {
      alert('Please confirm your password');
      return false;
    }

    if (password!== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    if (!selectedOption) {
      alert('Please select an account type');
      return false;
    }

    return true;
  };

  return (
    <div className=''>
      <br />
      <button onClick={backhandle} className="backbutton">
        <img
          src="/images/components/Arrow_left.png"
          alt="leftarrow"
          className='leftarrow'
        />
        Back
      </button>
      <div className='fieldcontainer'>
        <form action="" id="regform" className="" onSubmit={signUp}>
          <div className="">
            <input type="text" className="registrationtextfield" id="fname" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <br />
          <div className="">
            <input type="text" className="registrationtextfield" id="lname" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <br />
          <div className="">
            <input type="email" className="registrationtextfield" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
          <div className="">
            <input type="password" className="registrationtextfield" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
          <div className="">
            <input type="password" className="registrationtextfield" id="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => passwordmatchtest(e)} />
            {passwordError && <div style={{ color: 'ed' }}>{passwordError}</div>}
          </div>
          <br />
          <div className="dropdown">
            <select id="dropdown" className="signupformdropdown" value={selectedOption} onChange={handleSelectChange}>
              <option value="" disabled>Account Type</option>
              <option value="Admin">Admin</option>
              <option value="Driver">Driver</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <br />
          <center><button type="submit" className="registerbutton" >Register</button></center>
        </form>
      </div>
      <br /><br /><br /><br /><br />
    </div>
  );
}

export default SignUp;