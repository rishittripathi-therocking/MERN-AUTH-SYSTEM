import React, {useState, useEffect} from 'react';
import authSvg from '../assets/welcome.svg';
import {ToastContainer, toast} from 'react-toastify';
import {authenticate, isAuth} from '../helpers/auth';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

const Activate = ({match}) => {
    const [formData, setFormData] = useState({
        name:'',
        token:'',
        show: true
    })

    useEffect(()=> {
        let token = match.params.token;
        let name = jwt.decode(token);
        if(token) {
            setFormData({
                ...formData,
                name,
                token
            })

        }
    },[]);

    const {name,show, token} = formData;

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/activation`,{
            token
        }).then(res=>{
            setFormData({
                ...formData,
                show: false
            })
            toast.success(res.data.message);
        }).catch(err => {
            toast.error(err.response.data.error);
        });
    }
    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth()?<Redirect to='/' />: null}
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Welcome {name}
                        </h1>
                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                            >
                                <div className='mx-auto max-w-xs relative '>
                                    <button
                                        type='submit'
                                        className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                        >
                                        Activate your Account
                                    </button>
                                </div>
                                <div className='my-12 border-b text-center'>
                                    <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                        Or sign up again
                                    </div>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <a
                                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                                            bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                            href='/register'
                                            target='_self'
                                        >
                                    <span className='ml-4'>Sign Up</span>
                                    </a>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activate;


