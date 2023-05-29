import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { IconButton } from "./components/IconButton/IconButton";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";
import "./App.css";
import { Pause } from "@material-ui/icons";
import { DrawerUpdateUser } from "./components/Drawer/DrawerUpdateUser/DrawerUpdateUser";

const CONNECTION_URL = "wss://api.dev.stories.studio/";
const SOCKET_PATH = "/interview-test";
const SOCKET_TRANSPORTS = ["websocket"];

const connectSocket = () => {
  const socket = io(CONNECTION_URL, {
    transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH,
  });

  return socket;
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [test, setTest] = useState();
  const [activateAutoScroll, setActivateAutoScroll] = useState(true);
  const [user, setUser] = useState({
    username: "Zwiloux",
    color: "chartreuse",
    prime: {
      enabled: true,
      display: true,
    },
  });
  const chat = useRef(null);

  const updateUser = (color) => {
    setUser({
      ...user,
      color,
    });
  };

  const sendMessage = (e) => {
    test.emit("send-message", {
      type: "text",
      text: messageToSend,
      user,
    });
    e.preventDefault();
    setMessageToSend("");
  };

  const checkAutoScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop > e.target.offsetHeight) {
      setActivateAutoScroll(false);
    } else {
      setActivateAutoScroll(true);
    }
  };

  useEffect(() => {
    const stockSocket = connectSocket();
    stockSocket.on("new-message", (payload) => {
      setMessages((prev) => [...prev, payload]);
    });
    setTest(stockSocket);

    return () => {
      stockSocket.close();
    };
  }, []);

  useEffect(() => {
    if (
      chat &&
      chat.current &&
      chat.current.lastElementChild &&
      activateAutoScroll
    ) {
      chat.current.lastElementChild.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [messages, activateAutoScroll]);

  return (
    <div>
      <Header />
      <div
        ref={chat}
        onScrollCapture={(e) => {
          setTimeout(() => {
            checkAutoScroll(e);
          }, 200);
        }}
        className="Messages"
      >
        {messages.map((message, index) => {
          return (
            <div key={`message-${index}`} className="Message">
              {message.user.prime &&
                message.user.prime.enabled &&
                message.user.prime.display && (
                  <img
                    src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"
                    alt="prime"
                    className="User-Prime"
                  />
                )}
              <span className="Username" style={{ color: message.user.color }}>
                {message.user.username}
              </span>
              : {message.text}
            </div>
          );
        })}
        {!activateAutoScroll && (
          <button
            className="Active-AutoScroll-Button"
            onClick={() => setActivateAutoScroll(true)}
          >
            <span>
              <Pause /> Chat mis en pause à cause du défilement
            </span>
          </button>
        )}
      </div>
      <form onSubmit={sendMessage}>
        <div className="Input-Message">
          <Drawer
            content={<DrawerUpdateUser user={user} updateUser={updateUser} />}
            title="Identité de discussion"
          >
            <div className="Prime">
              <Tooltip text="Identité de discussion">
                <IconButton
                  src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"
                  alt="prime"
                />
              </Tooltip>
            </div>
          </Drawer>
          <input
            type="text"
            value={messageToSend}
            onChange={(e) => {
              setMessageToSend(e.target.value);
            }}
            placeholder="Envoyer un message"
          />
          <div className="Emoji">
            <IconButton iconName="sentiment_satisfied" />
          </div>
        </div>

        <div className="Bottom-Input-Message">
          <div>POINTS</div>
          <div className="Right-Bottom-Input-Message">
            <Tooltip text="Paramètres du chat">
              <IconButton iconName="settings" />
            </Tooltip>
            <button className="Chat-Button" onClick={sendMessage}>
              Chat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
