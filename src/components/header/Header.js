import React from "react";

import "./Header.css";

export default function Header({ room, members }) {
  return (
    <div className="header-container">
      <div className="header">
        <span className="header-logo">
          <img src="../assets/chat_logo.svg" alt="chat logo" width="140" />
        </span>
        <div className="room-container">
        <span className="room">Room:</span>
        <span className="header-room">{room}</span>
        </div>
      </div>
      <div className="members-container">
        <span>Members:</span>
        <ul className="members-list">
          {members.map((member) => (
            <li className="member" key={member.id}>
              <span
                className="member-color"
                style={{ backgroundColor: member.clientData.color }}
              />
              <span>{member.clientData.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
