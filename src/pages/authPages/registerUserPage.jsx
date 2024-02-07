import React from 'react'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserActions } from '../../stores/useUserStore';
import { api_base } from '../../api/apiURL';



export default function RegisterUser() {
    const {register, handleSubmit} = useForm();
    // const {isLoggedIn, login} = useUserStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function onSubmit(data) {
        // Post request to API

        const options = {
            headers: {
                'Content-Type': 'application/json',
            }, 
            method: 'POST',
            body: JSON.stringify(data),
        };

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${api_base}auth/register`, options);
            const json = await response.json();

            if (!response.ok) {
                return setError(json);
            }

            // Save user in global state
            useUserActions.setUser(json);

            //Redirect to dashboard after successful login
            // navigate('/'); 
        

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="log-in-form">
            <div className="bg-white shadow-md rounded px-6 pt-6 pb-8">
                <div className="mb-4 flex flex-col">
                    <h1>Register new account</h1>
                    <form onSubmit={handleSubmit(onSubmit)}
                    className="">
                        <input 
                        {...register("name", 
                        {required: true,
                        minLength: 3,
                        })}
                        type="text" 
                        placeholder="Full name" 
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        required />
                        <input 
                        {...register("email", 
                        {required: true,
                        })}
                        type="email" 
                        placeholder="E-mail" 
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        required />
                        <input 
                        {...register("password", 
                        {required: true,
                        minLength: 8,
                        })}
                        type="password" 
                        placeholder="Password" 
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        required />
                        <input 
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                        type="password"
                        placeholder="Repeat password"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        required/>
                        <input 
                        {...register("avatar", {
                            required: false,
                        })}
                        type="url"
                        placeholder="Avatar URL"
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" 
                        />
                        <button 
                        type="submit"
                        className="button"
                        >Register now</button>
                    </form>
                    <p>Forgot password?</p>
                </div>
                <div className="flex flex-col py-2">
                    <Link to="/auth/register-manager" className='button book-now-button'>Register as venue owner</Link>
                    <Link to="/auth/login" className='mt-5'>Already have an account? Log in here</Link>
                </div>
            </div>
        </div>
    )
}