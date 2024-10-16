import "./chatList.css";

export default function ChatList() {
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img src="/plus.png" alt="" className="add" />
      </div>
      <div className="item">
        <img src="/avatar.png" alt="user" />
        <div className="texts">
            <span>Jane Doe</span>
            <p>hello</p>
        </div>
      </div>
    </div>
  );
}
