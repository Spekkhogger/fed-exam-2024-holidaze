import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../stores/useUserStore";

function LogOut() {
    const { clearUser } = useUserActions();
    const  navigate = useNavigate();

    function handleLogOut() {
        clearUser();
        navigate('/');
    }

    return (
        <button onClick={handleLogOut}>Log out</button>
    )
}

export default LogOut; 