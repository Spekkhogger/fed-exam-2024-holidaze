import React from 'react'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserActions } from '../../stores/useUserStore';
import { api_base } from '../../api/apiURL';



export default function LogInPage() {
    const {register, handleSubmit} = useForm();
    const { setUser, setLoggedInStatus } = useUserActions();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function onSubmit(data) {
        console.log(data); 

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
            const response = await fetch(`${api_base}auth/login`, options);
            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                return setError(json);
            }

            // Save user in global state
            setUser(json);
            setLoggedInStatus(true);

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
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit(onSubmit)}
                    className="">
                        <input 
                        {...register("email", 
                        {required: true,
                        })}
                        type="email" 
                        placeholder="E-mail" 
                        className="shadow border rounded w-full py-2 px-3"
                        required />
                        <input 
                        {...register("password", {
                            required: true,
                        })}
                        type="password"
                        placeholder="Password"
                        className="shadow border rounded w-full py-2 px-3" 
                        required/>
                        <button 
                        type="submit"
                        className="button w-full rounded"
                        >Log in</button>
                    </form>
                    <p>Forgot password?</p>
                </div>
                <div className="flex flex-col py-2">
                    <p>New to Holidaze?</p>
                    <Link to="/auth/register" className='button book-now-button'>Create new account</Link>
                    <Link to="/auth/register-manager" className='button book-now-button'>Register as venue owner</Link>
                </div>
            </div>
        </div>
    )
}