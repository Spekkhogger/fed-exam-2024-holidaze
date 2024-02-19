

function EditProfile() {
    return (
        <div className="shadow-md rounded px-6 pt-6 pb-8">
            <h1>Edit Profile</h1>
            <form action="submit">
                <input type="text" className="shadow border rounded w-full py-2 px-3" placeholder="Avatar"/>
                <input type="text" className="shadow border rounded w-full py-2 px-3"/>
                <button type="submit" className="button">Save changes</button>
            </form>
        </div>
    )
}

export default EditProfile;