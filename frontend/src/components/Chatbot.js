import React, { useState, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';

const Chatbot = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);

  useImperativeHandle(ref, () => ({
    sendMessage: (content) => {
      sendMessage(content);
    },
  }));

  const sendMessage = async (content) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content }]);

    try {
      const response = await axios.post('http://localhost:3001/chat-with-openai', {
        messages: [...messages, { role: 'user', content }],
      });

      const assistantMessage = response.data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Fehler bei der Kommunikation mit OpenAI:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[500px] overflow-y-auto flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${
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
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Deine Nachricht..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-r-md"
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