import React, { useState } from 'react';

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Wie kann ich dir helfen zu deinen Fragen bezüglich deiner Stadt?",
            sender: "ChatGPT"
        }
    ]);

    const handleChange = (event) => {
        console.log("handleChange:", event.target.value); // Log the input change
        setInput(event.target.value);
    }

    const handleSend = async (event) => {
        event.preventDefault();
        console.log("handleSend:", input); // Log the message being sent
        const newMessage = {
            message: input,
            sender: "user"
        };

        const newMessages = [...messages, newMessage];
        console.log("newMessages after sending:", newMessages); // Log the new messages array
        setMessages(newMessages);
        setInput('');

        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        console.log("processMessageToChatGPT called with:", chatMessages); // Log the messages being processed
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
            messages: apiMessages
        };

        console.log("Sending to API:", apiRequestBody); // Log the request body

        await fetch("http://localhost:3001/chat-with-openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((response) => {
            console.log("API Response:", response); // Log the raw response
            return response.json();
        }).then((data) => {
            console.log("API Response Data:", data); // Log the response data
            if (data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message.content;
                setMessages([...chatMessages, { message: reply, sender: "ChatGPT" }]);
            }
        }).catch((error) => {
            console.error("Fehler bei der Verarbeitung der Nachricht: ", error);
        });
    }

    return (
        <div className="container max-w-sm mx-auto p-6 bg-gray-100 rounded-lg shadow-md"> 
    
          <div className="response-area overflow-y-auto h-96"> 
            {messages.map((message, index) => {
              return (
                <div 
                  key={index} 
                  className={`flex items-end mb-4 ${message.sender === "ChatGPT" ? 'justify-start' : 'justify-end'}`}
                > 
                  <div className={`bg-white p-3 rounded-lg shadow ${message.sender === 'ChatGPT' ? 'bg-blue-100' : 'bg-green-100'}`}> 
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>
    
          <div className="prompt-area flex mt-4">
            <input 
              type="text" 
              placeholder="Send a message..." 
              value={input} 
              onChange={handleChange} 
              className="flex-grow border border-gray-400 rounded-l-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button 
              className="submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
              type="submit"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
    
        </div>
      );
    }
    
    export default Chatbot;
