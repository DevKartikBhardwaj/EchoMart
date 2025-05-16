import  { useState } from 'react';
import axios from 'axios';
import { startRegistration } from '@simplewebauthn/browser';
import '../styles/loginSignup.css';

export default function Signup() {
  const [form, setForm] = useState({ email: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post('http://localhost:3000/register',{userEmail:form.email});
      const optionsJSON=data.body.registrationOptions;
  
      const attResp=await startRegistration({optionsJSON});


      //post attsresp to backend verifyattsresp
      const verificationJSON=await axios.post('/verify-registeration',{userId,attResp});
      console.log(verificationJSON);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="meta-container">
      <form className="meta-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>


        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />

        <button type="submit">Create Account</button>

        <div className="form-footer">
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </form>
    </div>
  );
}
