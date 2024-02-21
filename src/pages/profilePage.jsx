import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToken, useRole, useUser } from "../stores/useUserStore";
import useOwner from "../api/auth/checkOwner";
import apiProfileClient from "../api/apiProfileClient";
import ListOfVenuesByProfile from "../components/venueHandle/ManagerListOfVenues";
import { set } from "react-hook-form";

function ProfilePage() {
    const token = useToken();
    const navigate = useNavigate();
    const user = useUser();
    const role = useRole();
    const avatar = user.avatar;
    const { param } = useParams();
    const [profile, setProfile] = useState({});
    const [profileVenues, setProfileVenues] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
          try {
            const profileData = await apiProfileClient.getProfileByName(param, token);
            setProfile(profileData);
            setProfileVenues(profileData.venues);
            console.log(profileData.venues); 
            console.log(profileData);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };
    
        getProfile();
        console.log(profile);
      }, [param, token]);

      const owner = useOwner(profile.name);

    return(
        <div>
            <h1>{profile.name}</h1>
            <img src={`${profile.avatar}`} alt={`${profile.name} avatar`} />
            {!owner ? (
                <div>Not owner</div>
            ):(
                <div>
                    <div>Is Owner</div>
                    <Link to="/profile/new-venue" className="button">Add new venue</Link>
                    <Link to="/profile/edit-profile" className="button">Edit profile</Link>
                    <div>
                        <ul className="list-of-venues-manager-page">
                            <li></li>
                        </ul>
                    </div>
                    <h2>Venue List</h2>
                    <div className="venue-list">
                        {profile.venues.map((venue, index) => (
                        <ListOfVenuesByProfile key={index} venue={venue} />
                        ))}
                    </div>


                </div>
            )}

            
        </div>
    )


    // return(
    //     <div>

    //         {/* {!token ? (
    //             <div>
    //                 {navigate('/auth/login')}
    //             </div>
    //         ) : (
    //             <div>
    //                 <h1>{user.name}</h1>
    //                 <p>{user.email}</p>
    //                 {!avatar ? (
    //                     <div>
    //                         {/*NOTE:  Add a filler image */}
    //                         {/* <img src="./../../../imgs/anonymous_avatars_grey_circles.jpg"/>
    //                     </div>
    //                 ):(
    //                     <img src="{avatar}"/>
    //                 )}
    //                 {/* Check if profile belongs to current user */}
    //                 {/* <Link to="edit-profile" className="button">Edit avatar</Link> */}
            
    //             {/* </div> */} */}

    //     // )}
    //     {/* //         {!role ? ( */}
    //     {/* //             <div> */}
    //     //                 {/* NOTE: add button to add new venue for manager if manager, else have a show of planned vacations. */}
    //     //                 <p>Not a manager</p>
    //     //             </div>
    //             // ) : (
    //             //     <div>
    //             //         <Link to="new-venue" className="button">Add new venue</Link>
    //             //         <div>
    //             //             <ul>
    //             //                 <li></li>
    //             //             </ul>
    //             //         </div>
    //             //     </div>
    //             // )} */}
    //     </div>
    // )
}

export default ProfilePage;