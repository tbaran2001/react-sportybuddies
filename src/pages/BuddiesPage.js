import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import User from "../components/User";
import { useApi } from "../contexts/ApiProvider";
import More from "../components/More";
import Body from "../components/Body";
import { Link } from "react-router-dom";

export default function BuddiesPage() {
  const [buddies, setBuddies] = useState();
  const [pagination, setPagination] = useState({ pageSize: 10, pageNumber: 1 });
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get("/currentuser/buddies");
      if (response.ok) {
        setBuddies(response.body);
        const paginationHeader = response.headers["x-pagination"];
        if (paginationHeader) {
          setPagination(JSON.parse(paginationHeader));
        }
      } else {
        setBuddies(null);
      }
    })();
  }, [api]);

  const loadNextPage = async () => {
    const response = await api.get("/currentuser/buddies", {
      pageSize: 10,
      pageNumber: pagination.CurrentPage + 1,
    });
    if (response.ok) {
      setBuddies([...buddies, ...response.body]);
      setPagination(JSON.parse(response.headers["x-pagination"]));
    }
  };

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
                  <div key={buddy.matchedUser.id}>
                    <Link to={`/chat/${buddy.matchedUser.id}`}>Send message</Link>
                    <User key={buddy.matchedUser.id} user={buddy.matchedUser} />
                  </div>
                ))
              )}
              <More pagination={pagination} loadNextPage={loadNextPage} />
            </>
          )}
        </>
      )}
    </Body>
  );
}
