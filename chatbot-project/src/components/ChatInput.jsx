import LoadingSpinGif from '..//assets/loading-spinner.gif';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';

import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);

    setInputText(''); // reset the input text

    // set up time
    const time = dayjs().valueOf();

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        time: time,
        id: crypto.randomUUID()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: (<img className="loading-spinner" src={LoadingSpinGif}/>),
        sender: 'robot',
        time: time,
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    // console.log(response);

    

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        time: time,
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  function keyDownEvent(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key == 'Escape') {
      setInputText(''); // reset the input text
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }
  

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={keyDownEvent}
        value={inputText} // Controlled input: this is necessary to reset
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessages}
        className="clear-button"
      >Clear</button>
    </div>
  );
}