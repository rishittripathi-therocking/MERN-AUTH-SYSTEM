import React, {useState} from 'react';
import authSvg from '../assets/auth.svg';
import {ToastContainer, toast} from 'react-toastify';
import {authenticate, isAuth} from '../helpers/auth';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';


const Register = () => {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const {name, email, password1, password2} = formData;
    const handleChange = text => e =>  {
        setFormData({...formData, [text]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(name && email && password1 ) {
            if(password1 === password2){
                axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    name,email, password: password1
                }).then(res => {
                    setFormData({...formData, name:'',email:'', password1:'',password2: ''})
                    toast.success(res.data.message);
                }).catch(err => {
                    toast.error(err.response.data.error);
                })

                
            } else {
                toast.error('Passwords dont match')
            }
        } else {
            toast.error('Please fill al fields')
        }
    }
    return(
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth()?<Redirect to='/' />: null}
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>Sign up for FashionPoint</h1>
                        <form className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                            >
                            <div className='mx-auto max-w-xs relative'>
                                <input type='text' 
                                       placeholder='Name'
                                       onChange={handleChange('name')}
                                       value={name}
                                       className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                       />
                                <input type='email' 
                                       placeholder='Email'
                                       onChange={handleChange('email')}
                                       value={email}
                                       className='mt-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                       />
                                <input type='password' 
                                       placeholder='Password'
                                       onChange={handleChange('password1')}
                                       value={password1}
                                       className='mt-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                       />
                                <input type='password' 
                                       placeholder='Confirm Password'
                                       onChange={handleChange('password2')}
                                       value={password2}
                                       className='mt-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                       />
                                <button type='submit' className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>Register</span>
                                </button>

                            </div>
                            <div className='my-12 border-b text-center'>
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or Sign in With email or social login
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                            <a
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                               bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    href='/login'
                                    target='_self'
                                    >
                                        <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                        <span className='ml-4'>Sign In</span>
                                    </a>
                            </div>
                            <div className='flex flex-col items-center'>
                                <a
                                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                        bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                href='/'
                                target='_self'
                                >
                                <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                <span className='ml-4'>Home</span>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{backgroundImage: `url(${authSvg})`}}
                        >

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;