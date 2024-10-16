import { useEffect } from "react";
import Body from "../components/Body";
import { useParams } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider";
import { useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function NotWorkingChatPage() {
  const { id } = useParams();
  const api = useApi();
  const [buddies, setBuddies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageListRef = useRef(null);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const buddyResponse = await api.get(`/currentuser/buddies`);
      setBuddies(buddyResponse.ok ? buddyResponse.body : []);

      const messageResponse = await api.get(`/currentuser/messages/${id}`);
      setMessages(messageResponse.ok ? messageResponse.body : []);

      const lastMessagesResponse = await api.get(`/currentuser/messages/last`);
      setLastMessages(lastMessagesResponse.ok ? lastMessagesResponse.body : []);
    };

    fetchData();

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/chathub")
      .build();

    connection.on("ReceiveMessage", (user, message, image) => {
      const newMsg = { user, message, image };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });

    connection.start().catch((err) => console.error(err.toString()));

    return () => connection.stop(); // Cleanup on unmount
  }, [id, api]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const response = await api.post("/currentUser/messages/" + id, {
      content: newMessage,
    });
    if (response.ok) {
      setNewMessage(""); // Clear message input
    }
  };

  return (
    <Body sidebar>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            {/* Buddies List */}
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Your Buddies
              </h5>
              <div className="card">
                <div
                  className="card-body overflow-auto"
                  style={{ maxHeight: "700px" }}
                >
                  <ul className="list-unstyled mb-0">
                    {buddies.length > 0 ? (
                      buddies.map((buddy, index) => (
                        <li key={index} className="p-2 border-bottom">
                          <Link
                            to={`/chat/${buddy.matchedUser.id}`}
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex flex-row">
                              <img
                                src={buddy.image}
                                alt="avatar"
                                className="d-flex align-self-center me-3 shadow-1-strong"
                                width="60"
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">
                                  {buddy.matchedUser.name}
                                </p>
                                <p className="small text-muted">
                                  { lastMessages.length > 0 && lastMessages.some((msg) => msg.senderId === buddy.matchedUser.id)
                                    ? "You: "
                                    : ""}
                                  {buddy.lastMessage.content}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1">time</p>
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <p>You have no Buddies yet.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Messages Section */}
            <div className="col-md-6 col-lg-7 col-xl-8">
              <div className="d-flex flex-column" style={{ height: "700px" }}>
                <ul
                  className="list-unstyled flex-grow-1 overflow-auto mb-3"
                  ref={messageListRef}
                >
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between mb-4"
                      >
                        {message.senderId === currentUser.id ? (
                          <>
                            <div className="card w-100">
                              <div className="card-header d-flex justify-content-between p-3">
                                <p className="fw-bold mb-0">
                                  {message.senderId}
                                </p>
                                <p className="text-muted small mb-0">
                                  <i className="far fa-clock"></i>{" "}
                                  {message.timeSent}
                                </p>
                              </div>
                              <div className="card-body">
                                <p className="mb-0">{message.content}</p>
                              </div>
                            </div>
                            <img
                              src={message.sender.image}
                              alt="avatar"
                              className="d-flex align-self-start ms-3 shadow-1-strong"
                              width="60"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={message.sender.image}
                              alt="avatar"
                              className="d-flex align-self-start me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="card w-100">
                              <div className="card-header d-flex justify-content-between p-3">
                                <p className="fw-bold mb-0">
                                  {message.senderId}
                                </p>
                                <p className="text-muted small mb-0">
                                  <i className="far fa-clock"></i>{" "}
                                  {message.timeSent}
                                </p>
                              </div>
                              <div className="card-body">
                                <p className="mb-0">{message.content}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>No messages yet.</p>
                  )}
                </ul>

                {/* Message Input */}
                <div className="bg-white">
                  <form onSubmit={handleSendMessage}>
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-info btn-rounded float-end"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Body>
  );
}
