import React from "react";
import { useForm } from "react-hook-form";

import "./Input.css";

export default function Input({ sendMessage, firstMember }) {
  const initialInput = {
    text: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({defaultValues: initialInput});

  function submitInput(e) {
    sendMessage({
      room: `observable-${firstMember.room}`,
      message: e.chatMessage,
    });
    reset();
  }

  return (
    <div className="chat-message">
      <form className="chat-message-form" onSubmit={handleSubmit(submitInput)}>
        <input
          className="chat-message-input"
          type="text"
          placeholder="Start chating..."
          {...register("chatMessage", {
            required: "You forgot to enter the chat!",
            maxLength: { value: 50, message: "Your chat is to long (50 max)!" },
          })}
          autoFocus={true}
        />
        {errors.chatMessage && (
          <span className="error-msg">{errors.chatMessage.message}</span>
        )}
        <button className="chat-message-btn" type="submit">
          <img src="../assets/send_white.svg" alt="send-chat" width="15" />
        </button>
      </form>
    </div>
  );
}
