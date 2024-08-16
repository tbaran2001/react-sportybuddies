import { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider";
import Spinner from "react-bootstrap/Spinner";
import Body from "../components/Body";
import User from "../components/User";

export default function MatchingPage() {
  const api = useApi();
  const [match, setMatch] = useState();

  useEffect(() => {
    (async () => {
      const response = await api.get("/currentuser/matches/random");
      if (response.ok) {
        setMatch(response.body);
      } else {
        setMatch(null);
      }
    })();
  }, [api]);

  const swipe = async (direction) => {
    const response = await api.put("/currentuser/matches/" + match.id, {
      swipe: direction === "right" ? 1 : 2,
      swipeDateTime: new Date().toISOString(),
    });
    if (response.ok) {
      const response = await api.get("/currentuser/matches/random");
      if (response.ok) {
        setMatch(response.body);
      } else {
        setMatch(null);
      }
    }
  };

  return (
    <Body sidebar>
      {match === undefined ? (
        <Spinner animation="border" />
      ) : match === null ? (
        <p>No match found</p>
      ) : (
        <>
          <User user={match.matchedUser} />
          <button onClick={() => swipe("left")}>❌</button>
          <button onClick={() => swipe("right")}>❤️</button>
        </>
      )}
    </Body>
  );
}
