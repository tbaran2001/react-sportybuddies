import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import User from "../../components/User";
import { useApi } from "../../contexts/ApiProvider";
import Body from "../../components/common/Body";
import { Link } from "react-router-dom";
import {getBuddies} from "../../api/buddies";
import {getUser} from "../../api/users";

export default function BuddiesPage() {
  const [buddies, setBuddies] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
        const buddies = await getBuddies(api);
        setBuddies(buddies);
    })();
  }, [api]);
  
  const getMatchedUser = async (userId) => {
    const user = await getUser(api, userId);
    return user;
  }
  
  return (
    <Body sidebar>
      {buddies === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {buddies === null ? (
            <p>Failed to load buddies</p>
          ) : (
            <>
              {buddies.length === 0 ? (
                <p>No buddies</p>
              ) : (
                buddies.map((buddy) => (
                  <div key={buddy.matchedUserId}>
                    <Link to={`/chat/${buddy.matchedUserId}`}>Send message</Link>
                    <User key={buddy.matchedUserId} user={getMatchedUser(buddy.matchedUserId)} />
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}
    </Body>
  );
}
