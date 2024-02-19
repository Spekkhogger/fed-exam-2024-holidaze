import { useRole, useToken } from "../stores/useUserStore"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

function CreateNewVenue() { 
    const manager = useRole();
    const token = useToken();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    function onSubmit(data) {
        console.log(data);
    }

    return (

        <div>
            {!manager ? (
                <div> Upgrade to manager to post a venue </div>
            ) : (
                <div>
                                <h1>Create New Venue</h1>
                    <form onSubmit={handleSubmit(onSubmit)} action="submit" className="shadow-md rounded px-6 pt-6 pb-8">
                        <input {...register('name')} type="text" />
                        <input {...register('description')} type="text" />
                        <input {...register('media')} type="url" />
                        <input {...register('price')} type="number" />
                        <input {...register('maxGuests')} type="number" />
                        <input {...register('maxGuests')} type="number" />

                        <button type="submit">Create</button>
                    </form>
                </div>
            )}



        </div>
    )

}