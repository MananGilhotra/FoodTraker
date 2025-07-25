import { useState, useRef, useEffect } from 'react';

const botAvatar = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png';
const userAvatar = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'mistralai/mixtral-8x7b-instruct';

async function fetchOpenRouterResponse(message, apiKey) {
  if (!apiKey) return 'Please enter your OpenRouter API key.';
  try {
    const res = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'FoodTraker Chatbot'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful food delivery assistant for FoodTraker. Answer user questions about orders, delivery, and food. Keep your answers concise, no more than 40 words.' },
          { role: 'user', content: message }
        ]
      })
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('OpenRouter error:', res.status, err);
      return `Error: ${res.status} - ${err}`;
    }
    const data = await res.json();
    if (data.choices && data.choices[0]?.message?.content) {
      
      let text = data.choices[0].message.content.trim();
      const words = text.split(/\s+/);
      if (words.length > 40) {
        text = words.slice(0, 40).join(' ') + '...';
      }
      return text;
    }
    return 'Sorry, I could not get a response from the AI.';
  } catch (e) {
    console.error('Fetch error:', e);
    return 'Sorry, there was an error connecting to the AI.';
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = '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';
  const chatRef = useRef(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg, { from: 'bot', text: 'Thinking...' }]);
    setInput('');
    setLoading(true);
    let aiText = await fetchOpenRouterResponse(userMsg.text, apiKey);
    setMessages(msgs => [
      ...msgs.slice(0, -1),
      { from: 'bot', text: aiText }
    ]);
    setLoading(false);
  };

  return (
    <>
      
      <button
        className="fixed z-50 bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-label="Open Chatbot"
      >
        💬
      </button>
      
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <img src={botAvatar} alt="Bot" className="w-7 h-7 rounded-full" />
              <span className="font-bold text-primary-500">FoodTraker Help</span>
            </div>
            <button className="text-gray-400 hover:text-gray-700 text-xl" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'bot' && <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-full mr-2" />}
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.from === 'bot' ? 'bg-primary-100 text-primary-800' : 'bg-primary-500 text-white'}`}>{msg.text}</div>
                {msg.from === 'user' && <img src={userAvatar} alt="You" className="w-6 h-6 rounded-full ml-2" />}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center border-t px-2 py-2 bg-white">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:border-primary-400 text-sm"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              disabled={loading}
            />
            <button type="submit" className="ml-2 px-3 py-2 rounded-lg bg-primary-500 text-white font-bold hover:bg-primary-600" disabled={loading}>Send</button>
          </form>
        </div>
      )}
    </>
  );
} 