import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import { useUser } from "../contexts/UserProvider";
import { getGravatarUrl } from "../utils/gravatar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ProfilePage() {
  const { user } = useUser();
  const gravatarUrl = user ? getGravatarUrl(user.email, 512) : undefined;

  return (
    <Body sidebar>
      {user === undefined ? (
        <Spinner animation="border" />
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={gravatarUrl} />
          <Card.Body>
            <Card.Title>{user.userName}</Card.Title>
            <Card.Text>
              {user.description}
            </Card.Text>
            <Button variant="primary">Send message</Button> 
            <ul>
                {user.sports.map((sport) => (
                    <li key={sport.id}>{sport.name}</li>
                ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </Body>
  );
}
