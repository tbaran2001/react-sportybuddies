import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {useState, useRef, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../../contexts/ApiProvider";
import {useUser} from "../../contexts/UserProvider";
import {initializeConnection, fetchMessages, sendMessage} from "../../api/chat";

export default function Chat() {
    const {buddyId} = useParams();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const api = useApi();
    const {user} = useUser();
    const [connection, setConnection] = useState(null);

    const endRef = useRef(null);

    // Initialize WebSocket connection and set up message listener
    useEffect(() => {
        const connection = initializeConnection((message) => {
            setMessages((prev) => [...prev, message]);
        });

        setConnection(connection);

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    // Fetch initial messages for the chat
    useEffect(() => {
        (async () => {
            const messages = await fetchMessages(api, buddyId);
            setMessages(messages);
        })();
    }, [api, buddyId]);

    // Scroll to the end of messages when new messages arrive
    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: "smooth"});
    }, [text, messages]);

    // Handle emoji selection
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    // Handle message send action
    const handleSend = async () => {
        if (text.trim() === "") return;

        await sendMessage(api, buddyId, text);
        setText("");
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="/avatar.png" alt=""/>
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor, sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="/phone.png" alt=""/>
                    <img src="/video.png" alt=""/>
                    <img src="/info.png" alt=""/>
                </div>
            </div>
            <div className="center">
                {messages &&
                    messages.map((message, index) => (
                        <div
                            className={message.senderId === user?.id ? "message own" : "message"}
                            key={index}
                        >
                            <img src="/avatar.png" alt=""/>
                            <div className="texts">
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="/img.png" alt=""/>
                    <img src="/camera.png" alt=""/>
                    <img src="/mic.png" alt=""/>
                </div>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="emoji">
                    <img
                        src="/emoji.png"
                        alt=""
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}
