import Body from "../../components/common/Body";
import Chat from "../../components/chat/Chat";
import Detail from "../../components/chat/detail/Detail";
import List from "../../components/chat/list/List";
import "./ChatPage.css";

export default function ChatPage() {
  return (
    <Body sidebar>
      <div className="body-container">
        <div className="chat-container">
          <List />
          <Chat />
          <Detail />

        </div>
      </div>
    </Body>
  );
}
