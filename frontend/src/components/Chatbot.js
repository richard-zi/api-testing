import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = forwardRef(({ destination, handleFetchData }, ref) => {
  const [messages, setMessages] = useState([]);
  const [lastSentMessage, setLastSentMessage] = useState(null); // Initialisierung auf null

  useEffect(() => {
    if (destination && destination !== lastSentMessage) {
      sendMessage(destination);
      setLastSentMessage(destination);
    }
  }, [destination, lastSentMessage]);

  useImperativeHandle(ref, () => ({
    sendMessage: (content) => {
      if (content !== lastSentMessage) {
        sendMessage(content);
        setLastSentMessage(content);
      }
    },
    clearMessages: () => {
      setMessages([]);
      setLastSentMessage(null);
    },
  }));

  const sendMessage = async (content) => {
    if (content !== lastSentMessage) { // Überprüfung, ob die Nachricht bereits gesendet wurde
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content }]);
      setLastSentMessage(content); // Aktualisierung von lastSentMessage vor dem Senden

      try {
        const response = await axios.post('http://localhost:3001/chat-with-openai', {
          messages: [...messages, { role: 'user', content }],
        });

        const assistantMessage = response.data.choices[0].message;
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('Fehler bei der Kommunikation mit OpenAI:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[600px] overflow-hidden flex flex-col">
      <div className="flex-grow overflow-y-auto mb-6 pr-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-600">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
            }`}
          >
            <span
              className={`inline-block px-4 py-3 rounded-lg shadow ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
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