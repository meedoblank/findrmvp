'use client';
import { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    // Show the user’s message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const prompt = input;
    setInput('');

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });
      const { reply } = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
  };

  return (
    <main className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-auto mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-32">
            <h1 className="text-3xl font-semibold mb-2 text-[#001958]">
              Ask anything. Travel smart.
            </h1>
            <button
              onClick={sendMessage}
              className="mt-4 px-6 py-3 bg-[#ff877b] text-white rounded-lg hover:bg-[#ff7f66]"
            >
              Start Planning
            </button>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-[#001958] text-white' : 'bg-gray-100 text-black'}`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex items-center border-t border-gray-300 pt-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question..."
            className="flex-1 p-3 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-[#001958]"
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-[#ff877b] text-white rounded-lg hover:bg-[#ff7f66]">
            Send
          </button>
        </div>
      )}
    </main>
  );
}
