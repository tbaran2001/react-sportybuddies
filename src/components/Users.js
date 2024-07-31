import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import User from "./User";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL + "/api/users");
      if (response.ok) {
        const results = await response.json();
        setUsers(results);
      } else {
        setUsers(null);
      }
    })();
  }, []);

  return (
    <>
      {users === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {users === null ? (
            <p>Failed to load users</p>
          ) : (
            <>
              <ul>
                {users.map((user) => (
                  <User key={user.id} user={user} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}
