import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { ref, set } from 'firebase/database';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [occupation, setOccupation] = useState('');

    const signUp = (e) => {
        e.preventDefault();

        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log('User created:', userCredentials);

                // Send user data to Firebase Realtime Database
                const userRef = ref(db, `UserauthList/${userCredentials.user.uid}`);
                set(userRef, {
                    firstName: firstName,
                    lastName: lastName,
                    occupation: occupation
                });
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='log-in-container'>
            <form action="" id="regform" className="w-25 m-4" onSubmit={signUp}>
                <h2 className="mb-3">Registration Of New User</h2>
                <div className="form-floating mb-3">
                    
                    <input type="text" className="form-control" id="fname" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <label htmlFor="fname">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    
                    <input type="text" className="form-control" id="lname" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label htmlFor="lname">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="admin" id="adminRadio" checked={occupation === 'admin'} onChange={() => setOccupation('admin')} />
                    <label className="form-check-label" htmlFor="adminRadio">Admin</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="employee" id="employeeRadio" checked={occupation === 'employee'} onChange={() => setOccupation('employee')} />
                    <label className="form-check-label" htmlFor="employeeRadio">Employee</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="role" value="driver" id="driverRadio" checked={occupation === 'driver'} onChange={() => setOccupation('driver')} />
                    <label className="form-check-label" htmlFor="driverRadio">Driver</label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" >Register</button>
            </form>
        </div>
    );
}

export default SignUp;
