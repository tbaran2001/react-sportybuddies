import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";

export default function User({ user }) {
  return (
    <Stack direction="horizontal" gap={3} className="User">
      <Image src={user.avatar} roundedCircle width={64} height={64} />
      <div>
        <p>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
          &nbsp;&mdash;&nbsp;
          <TimeAgo isoDate={user.lastActive} />
        </p>
        <p>{user.description}</p>
      </div>
    </Stack>
  );
}
