import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function User({ user }) {
  return (
    <Stack direction="horizontal" gap={3} className="User">
      <Image src={user.avatar} roundedCircle width={64} height={64} />
      <div>
        <p>
          <Link to={`/user/${user.name}`}>{user.name}</Link>
        </p>
        <p>{user.description}</p>
      </div>
    </Stack>
  );
}
