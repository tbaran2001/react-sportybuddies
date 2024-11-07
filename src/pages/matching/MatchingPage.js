import { useState, useEffect } from "react";
import { useApi } from "../../contexts/ApiProvider";
import Spinner from "react-bootstrap/Spinner";
import Body from "../../components/common/Body";
import User from "../../components/User";
import {getRandomMatch,swipeMatch} from "../../api/matching";

export default function MatchingPage() {
  const api = useApi();
  const [match, setMatch] = useState();

  useEffect(() => {
    (async () => {
      const match=await getRandomMatch(api);
        setMatch(match);
    })();
  }, [api]);

  const swipe = async (direction) => {
    const newMatch = await swipeMatch(api, match.id, direction);
    setMatch(newMatch);
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
