import React, { useState } from 'react';
import '../styles/loginSignup.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login submitted!');
  };

  return (
    <div className="meta-container">
      <form className="meta-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

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

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button type="submit">Log In</button>

        <div className="form-footer">
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
}
