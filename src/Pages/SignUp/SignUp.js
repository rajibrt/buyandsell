import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail)
    const location = useLocation();


    if (token) {
        navigate("/")

    }
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                navigate(from, { replace: true });
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role);
                        <div>
                            {toast.success('Account created successfully!')}
                            < Toaster />
                        </div>
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.messages)
            })

    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // getUserToken(email);
                setCreatedUserEmail(email);
            })
    }
    // const getUserToken = email => {
    //     fetch(`http://localhost:4000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 localStorage.setItem('accessToken', data.accessToken);
    //                 navigate('/');
    //             }
    //         });
    // }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 shadow-lg rounded-2xl'>
                <h2 className='text-xl text-center mb-10'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)} >
                    <label className="label"> <span className="label-text">I want to be a</span></label>
                    <select type="select" {...register("role")} className="select select-secondary w-full max-w-xs">
                        <option>Buyer</option>
                        <option>Seller</option>
                    </select>

                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is required",
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email Address is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                            pattern: {
                                value: /[A-Z]/, message: "Must have a CAPITAL letter",
                            },

                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                    <input className='btn w-full bg-accent my-4' value="Sign Up" type="submit" />
                    <p>Already have an account? <Link to='/login' className='text-secondary'>Please login</Link></p>
                    <div className="divider text-accent">OR</div>
                    <button className='btn w-full bg-white text-accent my-4 hover:text-white'>CONTINUE WITH GOOGLE</button>
                    {signUpError && <p className="text-red-600">{ }signUpError</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;