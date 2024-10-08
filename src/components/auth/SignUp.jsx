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

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value.replace('@gmail.com', ''); // Prevent typing "@gmail.com"
    setEmail(`${inputEmail}@gmail.com`);
  };

  const [password, setPassword] = useState(''); // Add this line to define password state


  const [passwordStrength, setPasswordStrength] = useState(''); // For password strength indicator
  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    checkPasswordStrength(inputPassword); // Check password strength while typing
  };

  const checkPasswordStrength = (password) => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };
  
  const calculatePasswordStrength = (password) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  
    if (strongPassword.test(password)) {
      return 'strong';
    } else if (mediumPassword.test(password)) {
      return 'medium';
    } else {
      return 'weak';
    }
  };
  

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  // const backhandle = () => {
  //   navigate('/adminhome');
  // };

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
            profilePicture: 'https://firebasestorage.googleapis.com/v0/b/tiremngdtbase.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=8ad886f5-29e0-459e-a29a-d3db94fc9857', 
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

    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if (!firstName) {
      alert('Please enter your first name');
      return false;
    }

    if (!nameRegex.test(firstName)) {
      alert('First name can only contain letters');
      return false;
    }


    if (lastName !== null && lastName.trim() !== '' && !nameRegex.test(lastName)) {
      alert('Last name must contain only letters and cannot be empty');
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

    // Validate password strength
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, include a lowercase letter, an uppercase letter, a number, and a symbol.');
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
    <div className='body'>
      <div className='fieldcontainer'>
        <form action="" id="regform" className="" onSubmit={signUp}>
          <div className="">
            <input type="text" className="registrationtextfield" id="fname" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <br />
          <div className="">
            <input type="text" className="registrationtextfield"
              id="lname"
              placeholder="Last Name  (Optional)" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <br />
          <div className="">
            <div className="email-container">
              <input
                type="text"
                className="registrationtextfield email-input"
                id="email"
                placeholder="Email"
                value={email.replace('@gmail.com', '')}
                onChange={handleEmailChange}
              />
              <span className="email-domain">@gmail.com</span>
            </div>
          </div>

          <br />
          <div className="">
            <input type="password" className="registrationtextfield" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <div className="password-strength-bar">
              <div className={`strength-meter ${passwordStrength}`} style={{ width: `${password.length * 10}%` }}></div>
            </div>
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
              <option className='op' value="Admin">Admin</option>
              <option className='op' value="Driver">Driver</option>
              <option className='op' value="Employee">Employee</option>
            </select>
          </div>
          <br />
          <center><button type="submit" className="registerbutton" >Register</button></center>
        </form>
      </div>
    </div>
  );
}

export default SignUp;