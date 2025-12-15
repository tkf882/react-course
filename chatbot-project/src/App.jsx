// js imports
import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages' // uses a default export
import { Chatbot } from 'supersimpledev';

// css imports
import './App.css'


function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  // const [chatMessages, setChatMessages] = array;

  // const chatMessages = array[0]; // current data
  // const setChatMessages = array[1]; // updater function

  useEffect(() => {
    Chatbot.addResponses({
      'bada bing':'bada boom',
      'goodbye':'Goodbye!'
    });
  }, []);

  // This runs whenever chatMessages changes
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
      />
      <p className="welcome-message">
      {
        chatMessages.length === 0
        ? 'Welcome to the chatbot project! Send a message using the textbox below'
        : ''
      }</p>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
