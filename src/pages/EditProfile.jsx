import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import apiProfileClient from "../api/apiProfileClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "../stores/useUserStore";
import { useToken } from "../stores/useUserStore";

function EditProfile() {
    const token = useToken();
    const user = useUser();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await apiProfileClient.editProfile(data, user.name, token);
        } catch (error) {
            console.error('Error editing profile:', error);
        }
    };
    

    return (
        <div className="shadow-md rounded px-6 pt-6 pb-8">
            <Link to={`/profile/${user.name}`} className="button">Go back</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        {...register('name', { required: false })}
                        placeholder={`${user.name}`}

                    />
                    {errors.name && <span>Name is required</span>}
                </div>
                <div>
                    <label>Avatar:</label>
                    <input
                        type="text"
                        {...register('avatar', { required: false })}
                        placeholder="URL"
                    />
                    {errors.avatar && <span>Avatar is required</span>}
                </div>
                <div>
                <label>
                    <input
                            type="checkbox"
                            {...register('venueManager')}
                        />
                    Venue Manager
                </label>
                </div>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    )
}

export default EditProfile;