import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';

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
  const textareaRef = useRef(null);

  const suggestions = [
    "Combien de chambres sont disponibles ?",
    "Quelles chambres sont libres au bâtiment A ?",
    "Qui occupe la chambre 102 ?",
    "Quel est le taux d'occupation global ?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Gestionnaire pour ajuster la hauteur du textarea automatiquement
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

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
    
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const response = await axios.post('http://localhost:8001/api/chat', {
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
      inputRef.current?.focus(); // Note: inputRef n'est plus utilisé directement sur le textarea ici, mais on garde la logique
      textareaRef.current?.focus();
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
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Header avec effet Glassmorphism */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Bot className="w-7 h-7 text-white transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              Assistant Logements
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h2>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              En ligne & prêt à vous aider
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pt-24 pb-4 px-4 sm:px-6 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                message.type === 'bot'
                  ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700'
                  : 'bg-indigo-600'
              }`}>
                {message.type === 'bot' ? (
                  <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 shadow-sm text-[15px] leading-relaxed ${
                  message.type === 'bot'
                    ? message.isError 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-800 rounded-2xl rounded-tl-none'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none'
                    : 'bg-indigo-600 text-white rounded-2xl rounded-tr-none shadow-indigo-500/20'
                }`}>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-1.5 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer Area */}
      <div className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="mb-4 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <MessageSquare className="w-3 h-3" />
                Suggestions rapides
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-left text-sm px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 text-slate-600 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all duration-200 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar Unifiée (Design Symétrique) */}
          <div className="relative flex items-end gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-3xl border border-transparent focus-within:border-indigo-300 dark:focus-within:border-indigo-700 focus-within:ring-4 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all duration-300">
            
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur les logements..."
              rows="1"
              disabled={isLoading}
              className="w-full max-h-[120px] py-3 px-4 bg-transparent border-none focus:ring-0 resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-[15px]"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className={`
                flex-shrink-0 mb-1 mr-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${!inputValue.trim() || isLoading 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95'}
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className={`w-5 h-5 ${inputValue.trim() ? 'ml-0.5' : ''}`} />
              )}
            </button>
          </div>
          
          <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-3 text-center font-medium">
            L'IA peut faire des erreurs. Vérifiez les informations importantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;