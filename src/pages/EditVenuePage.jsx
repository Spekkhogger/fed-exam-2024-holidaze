import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import apiVenueClient from "../api/apiVenueClient";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../stores/useUserStore";
import { useToken } from "../stores/useUserStore";

function EditVenue() {
    const token = useToken();
    const user = useUser();
    const { id } = useParams();
    const [venue, setVenue] = useState({});
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    // Fetch information about venue to be used a placeholders
    useEffect(() => {
        const fetchVenue = async () => {
          try {
            const venueData = await apiVenueClient.getVenueById(id);
            setVenue(venueData);
          } catch (error) {
            console.error('Error fetching venue:', error);
          }
        };
    
        fetchVenue();
      }, [id]);

    // On submit, PUT new data to the api
    const onSubmit = async (data) => {
        try {
            if (data.price) {
                data.price = parseFloat(data.price);
            }
            if (data.maxGuests) {
                data.maxGuests = parseInt(data.maxGuests);
            }
            if (data.rating) {
                data.rating = parseFloat(data.Rating);
            }
            if (data.location.lat) {
                data.location.lat = parseFloat(data.location.lat);
            }
            if (data.location.lng) {
                data.location.lng = parseFloat(data.location.lng);
            }

            data.media = data.media.split(',').map(url => url.trim());

            const response = await apiVenueClient.editVenue(data, id, token);
        } catch (error) {
            console.error('Error editing venue:', error);
        }
    };

    
    // const { address, city, country, lat, lng, zip } = venue.location;



    return (
        <div className="shadow-md rounded px-6 pt-6 pb-8">
            <Link to={`/profile/${user.name}`} className="button">Go back</Link>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                            <input {...register('name')} type="text" className="input-field" placeholder={`${venue.name}`}/>
                        </div>
                        <div>
                            <input {...register('description')} type="text" className="input-field" placeholder={`${venue.description}`}/>
                        </div>
                        <div>
                            <input {...register('media')} type="text" className="input-field" placeholder={`${venue.media}`}/>
                        </div>
                        <div>
                            <input {...register('price')} type="number" className="input-field" placeholder={`${venue.price}`}/>
                        </div>
                        <div>
                            <input {...register('maxGuests')} type="number" className="input-field" placeholder={`${venue.maxGuests}`}/>
                        </div>
                        <div>
                            <input {...register('Rating')} type="number" className="input-field" placeholder={`${venue.rating}`}/>
                        </div>
                        <div>
                            {/* Fix this so it makes sense for user */}
                            <p>Select:</p>
                            <div className="flex">
                                <label> Wifi
                                    <input {...register('meta.wifi')} type="checkbox" className="input-field" placeholder="Wifi"/>
                                </label>
                            </div>
                            <div className="flex">
                                <label> Parking
                                <input {...register('meta.parking')} type="checkbox" className="input-field" placeholder="Parking" />
                                </label>
                            </div>
                            <div className="flex">
                                <label> Breakfast
                                <input {...register('meta.breakfast')} type="checkbox" className="input-field" placeholder="Breakfast"/>
                                </label>
                            </div>
                            <div className="flex">
                                <label> Pets
                                <input {...register('meta.pets')} type="checkbox" className="input-field" placeholder="Pets"/>
                                </label>
                            </div>
                            
                        </div>

                        <div>
                            <input {...register('location.address')} type="text" className="input-field" placeholder={`${venue.address}`}/>
                        </div>
                        <div>
                            <input {...register('location.city')} type="text" className="input-field" placeholder={`${venue.city}`}/>
                        </div>
                        <div>
                            <input {...register('location.zip')} type="text" className="input-field" placeholder={`${venue.zip}`}/>
                        </div>
                        <div>
                            <input {...register('location.country')} type="text" className="input-field" placeholder={`${venue.country}`}/>
                        </div>
                        <div>
                            <input {...register('location.continent')} type="text" className="input-field" placeholder={`${venue.continent}`}/>
                        </div>
                        <div>
                            <input {...register('location.lat')} type="number" className="input-field" placeholder={`${venue.lat}`}/>
                        </div>
                        <div>
                            <input {...register('location.lng')} type="number" className="input-field" placeholder={`${venue.lng}`}/>
                        </div>

                        <button type="submit" className="button">Create</button>
            </form>
        </div>
    )
}

export default EditVenue;