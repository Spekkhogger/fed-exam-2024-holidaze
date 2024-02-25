import React from 'react'
import {set, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserActions } from '../../stores/useUserStore';
import { api_base } from '../../api/apiURL';



export default function LogInPage() {
    const {register, handleSubmit, formState: {errors} } = useForm();
    const { setUser, setLoggedInStatus } = useUserActions();
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
            const response = await fetch(`${api_base}auth/login`, options);

            const json = await response.json();
            if(response.ok){
                setUser(json);
                setLoggedInStatus(true);
            } else {
                setError(json.message);
            }
            // console.log(json);

            // Save user in global state

        } catch (error) {
            console.error('Error logging in:', error);
        }  finally {
            setIsLoading(false);
            navigate('/browse');
        }}

    return (
        <div className="log-in-form">
            <div className="form-box">
                <div className="form-content text-center w-4/5">
                    <h1>Log In</h1>
                    <form onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2">
                        <input 
                        {...register("email", 
                        {required: "Email is required",
                        })}
                        id="email"
                        type="email" 
                        placeholder="E-mail" 
                        className="input-field"
                        />
                        {/* {errors.email && <p>{errors.message}</p>} */}
                        {/* {error && <p>{error}</p>} */}

                        <input 
                        {...register("password", {
                            required: "Password is required",
                        })}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="input-field" 
                        />
                        {/* {errors.password && <p className="text-red-500">{errors.message}</p>} */}

                        <button 
                        type="submit"
                        className="button"
                        >Log in</button>
                    </form>
                    <p>Forgot password?</p>
                </div>
                <div className="flex flex-col py-2 text-center gap-2">
                    <p>New to Holidaze?</p>
                    <Link to="/auth/register" className='button'>Create new account</Link>
                    <Link to="/auth/register-manager" className='button'>Register as venue owner</Link>
                </div>
            </div>
        </div>
    )
}