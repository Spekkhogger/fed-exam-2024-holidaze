import { useRole, useToken } from "../stores/useUserStore"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import apiVenueClient from "../api/apiVenueClient";
import { Link } from "react-router-dom";

function CreateNewVenue() { 
    const manager = useRole();
    const token = useToken();
    const navigate = useNavigate();

    const { register, handleSubmit, errors } = useForm();

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

        console.log(data); 
        const response = await apiVenueClient.postNewVenue(data, token);
        console.log(response.id);
        console.log('Venue created successfully:', response);
        // If response is OK redirect to the new venue
        if (response.ok) {
            navigate(`/venues/${response.id}`);
        }
      } catch (error) {
        // Needs to handle the errors. Let user know what went wrong 
        console.error('Error creating venue:', error);
      }
    };


    return (

        <div>
            {!manager ? (
                <div> Register as manager to post a venue </div>
            ) : (
                <div className="m-2">
                    {/* <Link to="/profile/" className="">Go back to profile</Link> */}
                    <h1 className="text-center">Create New Venue</h1>
                    <form onSubmit={handleSubmit(onSubmit)} action="submit" className="shadow-md rounded px-6 pt-6 pb-8 gap-3 grid">
                        <div>
                            <input {...register('name')} type="text" className="input-field" placeholder="Name of venue"/>
                        </div>
                        <div>
                            <input {...register('description')} type="text" className="input-field" placeholder="Description"/>
                        </div>
                        <div>
                            <input {...register('media')} type="text" className="input-field" placeholder="Pictures"/>
                        </div>
                        <div>
                            <input {...register('price')} type="number" className="input-field" placeholder="Price"/>
                        </div>
                        <div>
                            <input {...register('maxGuests')} type="number" className="input-field" placeholder="Max guests"/>
                        </div>
                        <div>
                            <input {...register('Rating')} type="number" className="input-field" placeholder="Rating: 1-5"/>
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
                                <input {...register('meta.parking')} type="checkbox" className="input-field" placeholder="Parking"/>
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
                            <input {...register('location.address')} type="text" className="input-field" placeholder="Address"/>
                        </div>
                        <div>
                            <input {...register('location.city')} type="text" className="input-field" placeholder="City"/>
                        </div>
                        <div>
                            <input {...register('location.zip')} type="text" className="input-field" placeholder="Zip code"/>
                        </div>
                        <div>
                            <input {...register('location.country')} type="text" className="input-field" placeholder="Country"/>
                        </div>
                        <div>
                            <input {...register('location.continent')} type="text" className="input-field" placeholder="Continent"/>
                        </div>
                        <div>
                            <input {...register('location.lat')} type="number" className="input-field" placeholder="lat"/>
                        </div>
                        <div>
                            <input {...register('location.lng')} type="number" className="input-field" placeholder="lng"/>
                        </div>


                        <button type="submit" className="button">Create</button>
                    </form>
                </div>
            )}



        </div>
    )

}

export default CreateNewVenue;