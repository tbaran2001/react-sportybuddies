import Body from "../../components/common/Body";
import Header from "./Header/Header";
import SportsPicker from "./SportsPicker/SportsPicker";
import {useUser} from "../../contexts/UserProvider";


export default function UserProfile() {
    const {user}=useUser();

    return (
        <Body sidebar>
            <Header/>
            <SportsPicker/>
        </Body>
    );
}
