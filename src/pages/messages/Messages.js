import React, { useEffect, useRef } from "react";

import "./Messages.css";
import Message from "../../components/message/Message";

export default function Messages({ messages, firstMember }) {
  const lastChat = useRef();

  const room_messages = messages.filter(
    (message) => message.member.clientData.room === firstMember.room
  );

  useEffect(() => {
    lastChat.current.scrollIntoView();
  }, [messages.length]);

  return (
    <ul className="msg-list">
      {room_messages.map((m) => (
        <Message
          key={"message" + m.id}
          message={m}
          firstMember={firstMember}
        />
      ))}
      <span ref={lastChat}></span>
    </ul>
  );
}
