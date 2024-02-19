import { useToken } from "../../stores/useUserStore";
import { useUser } from "../../stores/useUserStore";

function useOwner(owner){
    const token = useToken();
    const user = useUser();

    if (token && user.name === owner){
        return true;
    } else {
        return false;
    }
}

export default useOwner;