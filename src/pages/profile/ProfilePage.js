import Spinner from "react-bootstrap/Spinner";
import Body from "../../components/common/Body";
import {useUser} from "../../contexts/UserProvider";
import {getGravatarUrl} from "../../utils/gravatar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {useApi} from "../../contexts/ApiProvider";
import {getAllSports, getCurrentUserSports, addUserSport, removeUserSport} from "../../api/sports";

export default function ProfilePage() {
    const {user} = useUser();
    const gravatarUrl = user ? getGravatarUrl(user.email, 512) : undefined;
    const api = useApi();
    const [sports, setSports] = useState([]);
    const [userSports, setUserSports] = useState(user.sports);

    const addSport = async (sport) => {
        const response = await addUserSport(api, sport.id);
        if (response) {
            setUserSports([...userSports, sport]);
        }
    };

    const removeSport = async (sport) => {
        const response = await removeUserSport(api, sport.id);
        if (response) {
            setUserSports(userSports.filter((userSport) => userSport.id !== sport.id));
        }
    };

    useEffect(() => {
        (async () => {
            const sports = await getAllSports(api);
            setSports(sports);
        })();
    }, [api]);

    useEffect(() => {
        (async () => {
            const userSports = await getCurrentUserSports(api);
            setUserSports(userSports);
        })();
    }, [api, user.id]);

    return (
        <Body sidebar>
            {user === undefined ? (
                <Spinner animation="border"/>
            ) : (
                <>
                    <Card style={{width: "18rem"}}>
                        <Card.Img variant="top" src={gravatarUrl}/>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>{user.description}</Card.Text>
                            <Button variant="primary">Send message</Button>
                            <ul>
                                {userSports.map((sport) => (
                                    <li key={sport.id}>{sport.name}</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                    <ul>
                        {sports.map((sport) => {
                            const userHasSport = userSports.some((userSport) => userSport.id === sport.id);
                            return (
                                <li key={sport.id}>
                                    {sport.name}
                                    {userHasSport ? (
                                        <button onClick={() => removeSport(sport)}>Remove</button>
                                    ) : (
                                        <button onClick={() => addSport(sport)}>Add</button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </Body>
    );
}
