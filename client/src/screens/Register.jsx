import React, {useState} from 'react';
//import authSvg from '../assets/auth.svg';
import {ToastContainer, toast} from 'react-toastify';
import {authenticate, isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import e from 'express';


const Register = () => {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        passowrd1: '',
        password2: ''
    })

    const {name, email, passowrd1, password2} = formData;
    const handleChange = test = e =>  {
        setFormData({...formData, [text]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(name && email && passowrd1 ) {
            if(password1 === password2){
                axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                    name,email, password: passowrd1
                }).then(res => {
                    setFormData({...formData, name:'',email:'', password1:'',password2: ''})
                    toast.success(res.data.message);
                }).catch(err => {
                    toast.error(err.response.data);
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;