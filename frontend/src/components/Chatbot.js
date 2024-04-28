// Chatbot.js

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const Chatbot = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (props.destination) {
      sendMessage(props.destination);
    }
  }, [props.destination]); // Triggered whenever the destination changes

  const sendMessage = async (content) => {
    if (isSending || !content.trim()) return;

    setIsSending(true);
    const userMessage = { role: 'user', content: content };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:3001/chat-with-openai', {
        messages: [{ role: 'user', content }],
      });
      const assistantMessage = { role: 'assistant', content: response.data.choices[0].message };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
    setIsSending(false);
  };

  useImperativeHandle(ref, () => ({
    sendMessage: (content) => {
      if (!isSending) {
        sendMessage(content);
      }
    },
    clearMessages: () => setMessages([])
  }));



  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[600px] overflow-hidden flex flex-col">
      <div className="flex-grow overflow-y-auto mb-6 pr-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-600">
      {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <span
              className={`inline-block px-4 py-3 rounded-lg shadow ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {typeof message.content === 'string' ? 
                message.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                )) : ''
              }
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex">
        <textarea
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Deine Nachricht..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e.target.value);
              e.target.value = '';
            }
          }}
          rows={2}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onClick={() => {
            const textarea = document.querySelector('textarea');
            sendMessage(textarea.value);
            textarea.value = '';
          }}
        >
          Senden
        </button>
      </div>
    </div>
  );
});

export default Chatbot;
