import React, { useContext } from 'react';

import './Login.css';
import { ChatContext } from '../../App';

export default function Login() {
  const { chat, setChat } = useContext(ChatContext);

  return (
    <div>Login</div>
  )
}
