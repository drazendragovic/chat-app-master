import React, { useState, createContext, useEffect } from "react";

import "./App.css";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Messages from "./pages/messages/Messages";
import Input from "./components/input/Input";

export const ChatContext = createContext(null);

const initialChat = {
  member: { username: "", room: "", color: "" },
  messages: [],
};

function App() {
  const [chat, setChat] = useState(initialChat);
  const [firstMemberId, setFirstMemberId] = useState(null);
  const [members, setMembers] = useState({ online: [] });
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (chat.member.username !== "") {
      const drone = new window.Scaledrone("Dtc2lhpj7nfFndKN", {
        data: chat.member,
      });
      setDrone(drone);
    }
  }, [chat.member]);
  
  useEffect(() => {
    if (drone && !chat.member.id) {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }

        chat.member.id = drone.clientId;

        if (firstMemberId === null) {
          setFirstMemberId(drone.clientId);
        }
        setChat({ ...chat }, chat.member);

        const room = drone.subscribe(`observable-${chat.member.room}`);

        room.on("open", (error) => {
          if (error) {
            console.error(error);
          }
        });
        room.on("members", (m) => {
          members.online = m;
          setMembers({ ...members });
        });
        room.on("member_join", (member) => {
          members.online.push(member);
          setMembers({ ...members });
        });
        room.on("message", (message) => {
          message.member.clientData.room = chat.member.room;
          chat.messages.push(message);
          setChat({ ...chat }, chat.messages);
        });
      });

      drone.on("error", (error) => console.error(error));
    }
  }, [chat, drone, firstMemberId, members]);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {!chat.member.username ? (
        <Login />
      ) : (
        <div className="chat">
          <Header room={chat.member.room} members={members.online} />
          <Messages
            messages={chat.messages}
            firstMember={chat.member}
          />
          <Input
            sendMessage={(obj) => drone.publish(obj)}
            firstMember={chat.member}
          />
        </div>
      )}
    </ChatContext.Provider>
  );
}

export default App;
