import React from 'react'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserActions } from '../../stores/useUserStore';
import { api_base } from '../../api/apiURL';



export default function RegisterManager() {
    const {register, handleSubmit} = useForm();
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
            

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            navigate('/login'); 
        }
    }

    return (
        <div className="log-in-form">
            <div className="form-box">
                <div className="text-center">
                    <h1>Register as a venue owner</h1>
                    <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 ">
                        <input 
                        {...register("name", 
                        {required: true,
                        minLength: 3,
                        })}
                        type="text" 
                        placeholder="Full name" 
                        className="input-field"
                        required />
                        <input 
                        {...register("email", 
                        {required: true,
                        })}
                        type="email" 
                        placeholder="E-mail" 
                        className="input-field"
                        required />
                        <input 
                        {...register("password", 
                        {required: true,
                        minLength: 8,
                        })}
                        type="password" 
                        placeholder="Password" 
                        className="input-field"
                        required />
                        <input 
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                        type="password"
                        placeholder="Repeat password"
                        className="input-field" 
                        required/>
                        <input 
                        {...register("avatar", {
                            required: false,
                        })}
                        type="url"
                        placeholder="Avatar URL"
                        className="input-field" 
                        />
                        <input
                        {...register("venueManager", {
                            required: true,
                            value: true,
                        })}
                        type="hidden"
                        
                        />
                        <button 
                        type="submit"
                        className="button"
                        >Register now</button>
                    </form>
                    <p>Forgot password?</p>
                </div>
                <div className="flex flex-col py-2 text-center">
                    <Link to="/auth/register" className='button'>Not a venue owner? Create account here</Link>
                    <Link to="/auth/login" className='mt-5 button'>Already have an account? Log in here</Link>
                </div>
            </div>
        </div>
    )
}