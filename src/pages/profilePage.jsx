import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRole } from "../stores/useUserStore";
import { useUser } from "../stores/useUserStore";

function ProfilePage() {
    const token = useToken();
    const navigate = useNavigate();
    const user = useUser();
    const avatar = user.avatar;
    const role = useRole();
    console.log(role); 
    

    
    return(
        <div>
            {!token ? (
                <div>
                    {navigate('/auth/login')}
                </div>
            ) : (
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    {!avatar ? (
                        <div>
                            {/*NOTE:  Add a filler image */}
                            <img src="./../../../imgs/anonymous_avatars_grey_circles.jpg"/>
                        </div>
                    ):(
                        <img src="{avatar}"/>
                    )}
                    {/* Check if profile belongs to current user */}
                    <Link to="/edit-profile" className="button">Edit avatar</Link>
            
                </div>

        )}
                {!role ? (
                    <div>
                        {/* NOTE: add button to add new venue for manager if manager, else have a show of planned vacations. */}
                        <p>Not a manager</p>
                    </div>
                ) : (
                    <div>
                        <Link to="new-venue" className="button">Add new venue</Link>

                    </div>
                )}
        </div>
    )
}

export default ProfilePage;