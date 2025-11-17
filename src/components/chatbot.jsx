import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Bonjour ! Je suis votre assistant virtuel pour la gestion des logements. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  
  const suggestions = [
    "Combien de chambres sont disponibles ?",
    "Quelles chambres sont libres au bâtiment A ?",
    "Qui occupe la chambre 102 ?",
    "Quel est le taux d'occupation global ?"
  ];

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        question: text.trim()
      });

      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response.data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        isError: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Assistant Logements
              <Sparkles className="w-4 h-4 text-cyan-500" />
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">En ligne • Réponse instantanée</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'bot'
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                : 'bg-gradient-to-br from-purple-500 to-pink-600'
            }`}>
              {message.type === 'bot' ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`flex flex-col max-w-[70%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'bot'
                  ? message.isError 
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 px-2">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (affichées uniquement s'il n'y a qu'un message) */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-semibold">Questions suggérées :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                className="text-left text-sm px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              rows="1"
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50"
              style={{ maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
          Appuyez sur Entrée pour envoyer • Maj+Entrée pour une nouvelle ligne
        </p>
      </div>
    </div>
  );
};

export default Chatbot;