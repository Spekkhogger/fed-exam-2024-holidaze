import { Link } from "react-router-dom";

const ListOfVenuesByProfile = ({ venue }) => {
    return (
      <div className="venue card">
        <Link to={`/venues/${venue.id}`}> 
            <h3>{venue.name}</h3>
            <p>{venue.description}</p>
        </Link>
      </div>
    );
  };
  
  export default ListOfVenuesByProfile;