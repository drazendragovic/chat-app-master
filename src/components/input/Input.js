import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./Input.css";

export default function Input({ sendMessage, thisMember }) {
  const initialInput = {
    text: ""
  };

  const { register, handleSubmit, formState: { errors }} = useForm();
  const [input, setInput] = useState(initialInput);

  function changeInput(e) {
    setInput({ ...input, text: e.target.value });
  }

  function submitInput(e) {
      sendMessage({
        room: `observable-${thisMember.room}`,
        message: input.text,
      });
      setInput({ text: "" });
  }

  return (
    <div className="chat-message">
      <form className="chat-message-form" onSubmit={handleSubmit(submitInput)}>
        <input
          className="chat-message-input"
          type="text"
          {...register("chatMessage", {
            required: "You forgot to enter the chat!",
            maxLength: { value: 50, message: "Your chat is to long (50 max)!" },
          })}
          placeholder="Start chating..."
          autoFocus={true}
          value={input.text}
          onChange={changeInput}
        />
        {errors.chatMessage && <span className="error-msg">{errors.chatMessage.message}</span>}
        <button
          className="chat-message-btn"
          type="submit"
        >
          <img src="../assets/send_white.svg" alt="send-chat" width="15" />
        </button>
      </form>
    </div>
  );
}
