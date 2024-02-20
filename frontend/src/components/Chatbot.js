<<<<<<< HEAD
import React, { useState } from 'react';

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Wie kann ich dir helfen zu deinen Fragen bezüglich deiner Stadt?",
=======
import React, {useState} from 'react';

function Chatbot(){
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Wie kann ich dir helfen zu deinen Fragen bezüglich {{Stadnamen dann irgendwie",
>>>>>>> 2750278daada927b37511922c8c5126f852f2070
            sender: "ChatGPT"
        }
    ]);

<<<<<<< HEAD
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
=======
    const handleChange = (event)=>{
        setInput(event.target.value)
    }

    const handleSend = async (event)=>{
        event.preventDefault()
        const newMessage = {
            message: input,
            sender: "user"
        }

        const newMessages = [...messages,newMessage];

        setMessages(newMessages);

>>>>>>> 2750278daada927b37511922c8c5126f852f2070
        setInput('');

        await processMessageToChatGPT(newMessages);
    }

<<<<<<< HEAD
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
=======
    async function processMessageToChatGPT(chatMessages){
        const API_KEY = "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"
        let apiMessages = chatMessages.map((messageObject)=>{
            let role="";
            if(messageObject.sender === "ChatGPT"){
                role = "assistant"
            }else{
                role = "user"
            }
            return (
                {role: role, content: messageObject.message}
            )
        });

        const systemMessage = {
            role: "system",
            content: "Explain all concept like i am 10 year old"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data.choices[0].message.content);
            setMessages(
                [
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT"
                    }
                ]
            )
        })
    }

    return (
        <div className="container">
			<div className="response-area">
                {messages.map((message, index) => {
                    return(
                        <div className={message.sender==="ChatGPT" ? 'gpt-message message' : 'user-message message'}>{message.message}</div>
                    );
                })}
            </div>
			<div className="prompt-area">
				<input type="text" placeholder="Send a message..." value={input} onChange={handleChange}/>
				<button className="submit" type="submit" onClick={handleSend}>Send</button>
			</div>
		</div>
    );
}

export default Chatbot;
>>>>>>> 2750278daada927b37511922c8c5126f852f2070
