import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { GoogleAuthProvider } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, providerLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const googleProviderLogin = new GoogleAuthProvider();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email)

            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            });

    }

    const handleGoogleSignIn = () => {
        return providerLogin(googleProviderLogin)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });

            })
            .catch(error => console.error(error))
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 shadow-lg rounded-2xl'>
                <h2 className='text-xl text-center mb-10'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password required",
                                minLength: { value: 6, message: "Password must be at least 6 characters or longer" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt text-accent">Forgot Password</span>
                        </label>
                    </div>
                    <input className='btn w-full bg-accent my-4' type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError} Why not</p>}
                    </div>
                    <p>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create new account</Link></p>
                    <div className="divider text-accent">OR</div>
                </form>
                <div className="form-control mt-6 flex gap-2">
                    <button className='btn w-full bg-blue-500 hover:shadow-md border-none hover:text-black text-white' onClick={handleGoogleSignIn}><FaGoogle className='mr-2'></FaGoogle>Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;