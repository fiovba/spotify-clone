import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/Spotify_Primary_Logo_RGB_White.png';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../service/authServices';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleValue(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError('');
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const loggedUser = await userLogin(user);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className='bg-black w-full h-screen flex flex-col justify-center items-center px-4'>
      <img src={logo} alt="spotify logo" className='w-auto h-20 mb-6' />

      <form
        onSubmit={handleLogin}
        className='bg-[#121212] text-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6'
      >
        <h2 className='text-2xl font-bold text-center'>Log in to your account</h2>

        {/* Email */}
        <div className='flex flex-col'>
          <label htmlFor='email' className='mb-1 text-sm'>Email</label>
          <input
            type='email'
            name='email'
            value={user.email}
            onChange={handleValue}
            placeholder='you@example.com'
            className='bg-[#2a2a2a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
        </div>

        {/* Password */}
        <div className='flex flex-col relative'>
          <label htmlFor='password' className='mb-1 text-sm'>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={user.password}
            onChange={handleValue}
            placeholder='Your password'
            className='bg-[#2a2a2a] rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500'
            required
          />
          <div
            className='absolute right-4 top-10 text-gray-400 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* Error */}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        {/* Submit */}
        <button
          type='submit'
          className='w-full bg-green-500 hover:bg-green-600 transition-colors duration-200 text-black font-semibold py-2 rounded-md'
        >
          Log In
        </button>

        <p className='text-sm text-center text-gray-400'>
          Don't have an account?{' '}
          <Link to="/register/signup" className='text-green-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
