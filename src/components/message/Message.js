import React, { useState, useEffect }  from "react";
import * as dayjs from 'dayjs';

import "./Message.css";

export default function Message({ message, firstMember }) {
  const timeNow = dayjs();
  const [ time, setTime ] = useState('');

  const { member, data, id, timestamp } = message;
  var currentMember = member ? member.id : null;
  const currentMemberChat = member.id === firstMember.id || message.from_me;

  useEffect(() => {
    var timeDiff = timeNow.diff(dayjs(timestamp * 1000), 'minutes')

    if (timeDiff < 60) {
      setTime(`${timeDiff} minutes`)
    } else if(timeDiff < 3599) {
      setTime(`${Math.floor(timeDiff % 60)} hours`)
    } else {
      setTime(`${Math.floor(timeDiff % 3600)} days`)
    }

  }, [timeNow, timestamp])

  return (
    <>
      {currentMember !== firstMember.id ? (
        <li
          className={currentMemberChat ? "msg msg-currentMember" : "msg"}
          key={id}
          data-id={member.id}
        >
          <div className="msg-container">
            <div
              className={
                currentMemberChat
                  ? "member-data member-currentMember"
                  : "member-data"
              }
            >
              <span
                className="msg-color"
                style={{ backgroundColor: member.clientData.color }}
              />
              <div
                className={
                  currentMemberChat
                    ? "info-container info-currentMember"
                    : "info-container"
                }
              >
                <span className="msg-username">
                  {member.clientData.username}
                </span>
              </div>
            </div>

            <div
              className={
                currentMemberChat
                  ? "text-container text-currentMember"
                  : "text-container"
              }
            >
              <div
                className="msg-text"
                style={{ borderColor: member.clientData.color }}
              >
                {data}
              </div>
            </div>

            <div
              className={
                currentMemberChat
                  ? "time-container time-currentMember"
                  : "time-container"
              }
            >
              <span className="time-text">{time} ago</span>
            </div>
          </div>
        </li>
      ) : (
        <li
          className={currentMemberChat ? "msg msg-currentMember" : "msg"}
          key={id}
          data-id={member.id}
        >
          <div
            className={
              currentMemberChat
                ? "text-container text-currentMember"
                : "text-container"
            }
          >
            <div
              className={
                currentMemberChat
                  ? "info-container info-currentMember"
                  : "info-container"
              }
            >
              <span className="msg-username" style={{ color: member.clientData.color }}>Me</span>
            </div>

            <div
              className="msg-text"
              style={{ borderColor: member.clientData.color }}
            >
              {data}
            </div>

            <div
              className={
                currentMemberChat
                  ? "time-container time-currentMember"
                  : "time-container"
              }
            >
              <span className="time-text">{time} ago</span>
            </div>
          </div>
        </li>
      )}
    </>
  );
}
