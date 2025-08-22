import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/Spotify_Primary_Logo_RGB_White.png';
import { Link, useNavigate } from 'react-router-dom';
import { userSignUp } from '../service/authServices';
import { getAllUsers } from '../service/service';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/\d/, 'At least one number')
    .required('Password is required'),
});


function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='bg-black w-full h-screen flex flex-col justify-center items-center px-4'>
      <img src={logo} alt="spotify logo" className='w-auto h-20 mb-6' />

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const users = await getAllUsers();
            const existingUser = users.find(
              user => user.email && user.email.toLowerCase() === values.email.toLowerCase()
            );

            if (existingUser) {
              setErrors({ email: "This email is already used" });
              setSubmitting(false);
              return;
            }

            console.log("Yeni istifadəçi yaradılır:", values);
            await userSignUp(values);
            navigate('/register/login');
          } catch (error) {
            console.error("Signup error:", error);
          } finally {
            setSubmitting(false);
          }
        }}


      >
        {({ isSubmitting }) => (
          <Form className='bg-[#121212] text-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6'>
            <h2 className='text-2xl font-bold text-center'>Sign up for free music.</h2>

            {/* Name */}
            <div className='flex flex-col'>
              <label htmlFor='name' className='mb-1 text-sm'>Name</label>
              <Field
                type='text'
                name='name'
                placeholder='Your name'
                className='bg-[#2a2a2a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='text-sm text-red-500 mt-1'
              />
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <label htmlFor='email' className='mb-1 text-sm'>Email</label>
              <Field
                type='email'
                name='email'
                placeholder='you@example.com'
                className='bg-[#2a2a2a] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-sm text-red-500 mt-1'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col relative'>
              <label htmlFor='password' className='mb-1 text-sm'>Password</label>
              <div className='relative'>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Create a password'
                  className='bg-[#2a2a2a] rounded-md px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-green-500'
                />
                <div
                  className='absolute right-4 top-2.5 text-gray-400 cursor-pointer'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <ErrorMessage
                name='password'
                component='div'
                className='text-sm text-red-500 mt-1'
              />
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-green-500 hover:bg-green-600 transition-colors duration-200 text-black font-semibold py-2 rounded-md'
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className='text-sm text-center text-gray-400'>
              Already have an account?{' '}
              <Link to="/register/login" className='text-green-500 hover:underline'>
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupPage;
