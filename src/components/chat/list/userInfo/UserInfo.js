import "./userInfo.css";
import { useUser } from "../../../../contexts/UserProvider";

export default function UserInfo() {
  const { user } = useUser();

  return (
    <div className="userInfo">
      <div className="user">
        <img src="/avatar.png" alt="user" />
        <h2>{user.name}</h2>
      </div>
      <div className="icons">
        <img src="/more.png" alt="" />
        <img src="/video.png" alt="" />
        <img src="/edit.png" alt="" />
      </div>
    </div>
  );
}
