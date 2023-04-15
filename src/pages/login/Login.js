import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";

import './Login.css';
import { ChatContext } from '../../App';
import Colors from '../../components/colors/Colors';
import { ROOMS } from '../../shared/config';
import { randomColor } from "../../shared/utilities";

export default function Login() {
  const { chat, setChat } = useContext(ChatContext);
  const [username, setUserName] = useState("");
  const [color, setColor] = useState("");
  const [colorSelected, setColorSelected] = useState("");
  const [random, setRandom] = useState(false);
  const [room, setRoom] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const getUserName = (e) => {
    setUserName(e.target.value);
  };

  const getRoom = (e) => {
    setRoom(e.target.value);
  };

  const getRandom = (e) => {
    if (e.target.checked) {
      setRandom(true);
      setColor("");
    } else {
      setRandom(false);
    }
  };

  const selectColor = (e) => {
    if (!random) {
      setColor(e.target.id);
      setColorSelected(e.target.id);
    }
  };

  const submitLogin = (e) => {
    if (random) {
        chat.member = {
            username: username,
            color: randomColor(),
            room: room
          };
          setChat({ ...chat }, chat.member);
    } else {
        chat.member = {
          username: username,
          color: color,
          room: room
        };
        setChat({ ...chat }, chat.member);
      }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(submitLogin)}>
        <span className="chat-logo">
          <img src="../assets/chat_logo.svg" alt="chat logo" width="180" />
        </span>
        <input 
            className="login-name-input"
            placeholder="Enter your chat name"
            type="text"
            {...register("username", { required: true, minLength: 5 })}
            autoFocus={true}
            value={username}
            onChange={getUserName}
        />
        {errors.username && <p className="error-msg">Username must have min 5 characters ...</p>}
        <select
          className="login-room"
          name="room"
          required
          value={room}
          onChange={getRoom}
        >
          <option key="0" value="" disabled>
            Choose room
          </option>
          {ROOMS.rooms.map((room, index) => (
            <option key={index + 1} value={room}>
              {room.charAt(0).toUpperCase() + room.slice(1)}
            </option>
          ))}
        </select>
        <div className="login-random">
          <label>
            Use random color
          </label>
          <input type="checkbox" onClick={getRandom} />
        </div>
        <span
          className={
            random
              ? "login-color login-color-disabled"
              : "login-color"
          }
        >
          Choose color
        </span>
        <Colors
          random={random}
          selectColor={selectColor}
          colorSelected={colorSelected}
        />
        <input disabled={!username || !room || (!color && !random)} className="login-btn" type="submit" value="CHAT" />
      </form>
    </div>
  )
}
