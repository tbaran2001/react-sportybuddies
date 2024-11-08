import {useUser} from "../../../contexts/UserProvider";
import {getGravatarUrl} from "../../../utils/gravatar";

export default function Picture() {
    const {user}=useUser();
    const gravatarUrl = user ? getGravatarUrl(user.email, 512) : undefined;

    return (
        <div>
            <img src={gravatarUrl}/>
        </div>
    );
}
