import VenueList from "../venues/VenuesList";
import SearchBar from "../components/search/Search";

export default function VenuePage() {
    return (
        <div>
            <SearchBar />
            <h1>List of venues</h1>
            <VenueList />
        </div>
    )
}