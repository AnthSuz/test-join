import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { IconButton } from "./components/IconButton/IconButton";
import { Tooltip } from "./components/Tooltip/Tooltip";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";
import "./App.css";
import { Pause } from "@material-ui/icons";
import { Icon } from "@material-ui/core";
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
  const [displayButtonWinPoint, setDisplayButtonWinPoint] = useState(true);
  const [point, setPoint] = useState(10);
  const chat = useRef(null);

  const updateUserColor = (color) => {
    setUser({
      ...user,
      color,
    });
  };

  const updateUserGlobalBadge = (value) => {
    setUser({
      ...user,
      prime: {
        ...user.prime,
        display: value,
      },
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

  useEffect(() => {
    if (!displayButtonWinPoint) {
      setTimeout(() => {
        setDisplayButtonWinPoint(true);
      }, 10000);
    }
  }, [displayButtonWinPoint]);

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
        <h6>Bienvenue sur le chat !</h6>
        {messages.map((message, index) => {
          return (
            <div key={`message-${index}`} className="Message">
              {message.user.prime &&
                message.user.prime.enabled &&
                message.user.prime.display && (
                  <img
                    src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/2"
                    alt="prime"
                    className="Badge"
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
      <div >
        <form onSubmit={sendMessage} className="Input-Message">
          <Drawer
            content={
              <DrawerUpdateUser
                user={user}
                updateUserColor={updateUserColor}
                updateUserGlobalBadge={updateUserGlobalBadge}
              />
            }
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
        </form>

        <div className="Bottom-Input-Message">
          <div className="Points-Content">
            <button className="Points">{point} Points</button>
            {displayButtonWinPoint && (
              <button
              className="Points-Button"
                onClick={() => {
                  setPoint(point + 50);
                  setDisplayButtonWinPoint(false);
                }}
              >
                <Icon className="Points-Button-Icon">inventory_2</Icon>
              </button>
            )}
          </div>
          <div className="Right-Bottom-Input-Message">
            <Tooltip text="Paramètres du chat">
              <IconButton iconName="settings" />
            </Tooltip>
            <button className="Chat-Button" onClick={sendMessage}>
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
