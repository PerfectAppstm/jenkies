
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ProfileData } from '../types';
import Icon from './Icon';

interface ChatbotProps {
  profile: ProfileData;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ profile, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `You are an AI persona for ${profile.displayName}. Their bio is: "${profile.bio}". Embody their confident, futuristic, and precise personality. Answer questions as if you are them.`;
      
      const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: input }] }],
        config: {
          systemInstruction: systemInstruction,
        },
      });

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.sender === 'bot') {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { ...lastMessage, text: lastMessage.text + chunkText };
                return newMessages;
            }
            return prev;
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
       setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.sender === 'bot') {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { ...lastMessage, text: `Sorry, I encountered an error: ${errorMessage}` };
                return newMessages;
            }
            return prev;
        });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, profile.displayName, profile.bio]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-orange-500/30 rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] flex flex-col p-4 shadow-orange-500/20">
        <div className="flex-shrink-0 flex justify-between items-center pb-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
             <img src={profile.profilePicture || `https://picsum.photos/seed/${profile.displayName}/40/40`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-orange-500"/>
            <div>
                 <h2 className="text-lg font-bold text-white">Chat with {profile.displayName}'s AI</h2>
                 <p className="text-sm text-gray-400">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <Icon name="xCircle" />
          </button>
        </div>
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto my-4 space-y-4 pr-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <img src={profile.profilePicture || `https://picsum.photos/seed/${profile.displayName}/40/40`} alt="Bot" className="w-8 h-8 rounded-full self-start" />}
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-300 rounded-bl-none'}`}>
                 <p className="text-sm whitespace-pre-wrap">{msg.text}{isLoading && msg.sender === 'bot' && index === messages.length -1 ? '...' : ''}</p>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
        <div className="flex-shrink-0 pt-4 border-t border-gray-700">
          <div className="flex items-center bg-gray-800 rounded-lg p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-orange-600 p-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors">
              <Icon name="arrowRight" className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
