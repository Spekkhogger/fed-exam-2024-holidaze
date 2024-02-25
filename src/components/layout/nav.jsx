import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useToken } from "../../stores/useUserStore";
import { useRole } from "../../stores/useUserStore";
import { useUser } from "../../stores/useUserStore";
import LogOut from "../../api/auth/logout";


export default function Navbar() {
    const token = useToken();
    const manager = useRole();
    const user = useUser();

    return (
        <nav className="nav">
            <div>
                <NavLink to="/" className="logo">Holidaze</NavLink>
            </div>
        {!token ? (
            <div>
                <div className="flex align-center gap-3">
                    <NavLink to="/browse" className="navItem">Browse</NavLink>
                    <NavLink to="/auth/login" className="button logInButton">
                        <FontAwesomeIcon icon={faUser} className="logInIcon" />
                        Log In
                    </NavLink>
                </div>
            </div>
        ) : (
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/browse" className="navItem">Browse</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/profile/${user.name}`} className="navItem">Profile</NavLink>
                        </li>
                        <li>
                            <LogOut/>
                        </li>
                    </ul>
                </nav>
            </div>
        )}
        </nav>
    )
}