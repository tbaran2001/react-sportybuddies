import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { getGravatarUrl } from "../utils/gravatar";

export default function User({ user }) {
  const gravatarUrl = getGravatarUrl(user.email, 64);
  return (
    <Stack direction="horizontal" gap={3} className="User">
      <Image src={gravatarUrl} roundedCircle width={64} height={64} />
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
