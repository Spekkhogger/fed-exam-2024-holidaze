import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {
    return (
        <nav className="nav">
            <div>
                <NavLink to="/" className="logo">Holidaze</NavLink>
            </div>
            <div>
                <NavLink to="/auth/login" className="button logInButton"><FontAwesomeIcon icon={faUser} className="logInIcon" />Log In</NavLink>
                
            </div>
        </nav>
    )
}