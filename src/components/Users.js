import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import User from "./User";
import { useApi } from "../contexts/ApiProvider";
import More from "./common/More";

export default function Users() {
  const [users, setUsers] = useState();
  const [pagination, setPagination] = useState({ pageSize: 10, pageNumber: 1 });
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get("/users");
      if (response.ok) {
        setUsers(response.body);
        const paginationHeader = response.headers["x-pagination"];
        if (paginationHeader) {
          setPagination(JSON.parse(paginationHeader));
        }
      } else {
        setUsers(null);
      }
    })();
  }, [api]);

  const loadNextPage = async () => {
    const response = await api.get("/users", {
      pageSize: 10,
      pageNumber: pagination.CurrentPage + 1,
    });
    if (response.ok) {
      setUsers([...users, ...response.body]);
      setPagination(JSON.parse(response.headers["x-pagination"]));
    }
  };

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
              {users.length === 0 ? (
                <p>No users</p>
              ) : (
                users.map((user) => <User key={user.id} user={user} />)
              )}
              <More pagination={pagination} loadNextPage={loadNextPage} />
            </>
          )}
        </>
      )}
    </>
  );
}
