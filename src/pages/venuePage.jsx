import VenueList from "../venues/VenuesList";

import SearchForm from "../components/search/Search";

export default function VenuePage() {
    return (
        <div>
            <SearchForm />
            <h1>List of venues</h1>
            <VenueList />
        </div>
    )
}