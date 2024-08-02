import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider";
import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import User from "../components/User";

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get("/users/" + id);
      setUser(response.ok ? response.body : null);
    })();
  }, [id, api]);

  return (
    <Body sidebar>
      {user === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>{user === null ? <p>User not found.</p> : <User user={user} />}</>
      )}
    </Body>
  );
}
