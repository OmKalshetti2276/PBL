import React, { useState, useEffect, useRef } from "react";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatbotMessages") || "[]");
    setMessages(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = {
      sender: "bot",
      text: `You said: "${input}". Please follow your health recommendations.`
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-widget">
      {!isOpen && (
        <div className="chatbot-circle" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span>Health Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && <p className="empty-msg">Start chatting with AI</p>}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;