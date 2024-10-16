import Body from "../../components/Body";
import Chat from "../../components/ChatComponents/chat/Chat";
import Detail from "../../components/ChatComponents/detail/Detail";
import List from "../../components/ChatComponents/list/List";
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
