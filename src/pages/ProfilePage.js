import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import { useUser } from "../contexts/UserProvider";
import { getGravatarUrl } from "../utils/gravatar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiProvider";

export default function ProfilePage() {
  const { user } = useUser();
  const gravatarUrl = user ? getGravatarUrl(user.email, 512) : undefined;
  const [sports, setSports] = useState([]);
  const api = useApi();
  const [userSports, setUserSports] = useState(user.sports);

  const addSport = async (sport) => {
    const response = await api.post("/currentuser/sports/"+sport.id);
    if (response.ok) {
      setUserSports([...userSports, sport]);
    }
  };

  const removeSport = async (sport) => {
    const response = await api.delete("/currentuser/sports/"+sport.id);
    if (response.ok) {
      setUserSports(userSports.filter((userSport) => userSport.id !== sport.id));
    }
  };

  useEffect(() => {
    (async () => {
      const response = await api.get("/sports");
      if (response.ok) {
        setSports(response.body);
      } else {
        setSports(null);
      }
    })();
  }, [api]);

  useEffect(() => {
    (async () => {
      const response = await api.get("/currentuser/sports");
      if (response.ok) {
        setUserSports(response.body);
      }
    })();
  }, [api, user.id]);

  return (
    <Body sidebar>
      {user === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={gravatarUrl} />
            <Card.Body>
              <Card.Title>{user.userName}</Card.Title>
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
