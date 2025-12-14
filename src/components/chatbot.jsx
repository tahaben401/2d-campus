import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, Zap, Building2, BedDouble, Users } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Bonjour ! 👋 Je suis votre assistant virtuel CampusView. Je peux vous aider à gérer les logements, vérifier les disponibilités et répondre à vos questions. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const suggestions = [
    { icon: BedDouble, text: "Combien de chambres sont disponibles ?" },
    { icon: Building2, text: "Quelles chambres sont libres au bâtiment A ?" },
    { icon: Users, text: "Qui occupe la chambre 102 ?" },
    { icon: Zap, text: "Quel est le taux d'occupation global ?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
    setIsTyping(true);

    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      const response = await axios.post('http://localhost:8001/api/chat', {
        question: text.trim()
      });

      setIsTyping(false);

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
      setIsTyping(false);
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
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans relative overflow-hidden">

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* Header with solid background for dark mode */}
      <div className="relative z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-5">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative w-14 h-14 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-all duration-300">
              <Bot className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white dark:border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              Assistant CampusView
              <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </h2>
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              IA propulsée • Prêt à vous aider
            </p>
          </div>

          {/* Quick stats badge */}
          <div className="ml-auto hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Réponse instantanée</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 scroll-smooth relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 animate-fadeInUp ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${message.type === 'bot'
                ? 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600'
                : 'bg-gradient-to-br from-cyan-500 to-indigo-600'
                }`}>
                {message.type === 'bot' ? (
                  <Bot className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`relative px-5 py-4 text-[15px] leading-relaxed transition-all duration-300 hover:shadow-lg ${message.type === 'bot'
                  ? message.isError
                    ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-2xl rounded-tl-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm'
                  : 'bg-gradient-to-br from-cyan-500 to-indigo-600 text-white rounded-2xl rounded-tr-sm shadow-lg shadow-indigo-500/25'
                  }`}>
                  {/* Decorative corner for bot messages */}
                  {message.type === 'bot' && !message.isError && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-md" />
                  )}
                  <p className="whitespace-pre-wrap relative z-10">{message.text}</p>
                </div>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-2 px-2 flex items-center gap-1">
                  {formatTime(message.timestamp)}
                  {message.type === 'user' && (
                    <svg className="w-3 h-3 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 animate-fadeIn">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-6 py-4 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">L'assistant réfléchit...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer Area */}
      <div className="relative z-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-5">
        <div className="max-w-4xl mx-auto">

          {/* Suggestions - Enhanced */}
          {messages.length === 1 && (
            <div className="mb-5 animate-fadeInUp">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Suggestions rapides</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion.text)}
                    className="group flex items-center gap-3 text-left text-sm px-4 py-3.5 rounded-xl bg-white dark:bg-slate-800/50 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-indigo-50 dark:hover:from-cyan-900/20 dark:hover:to-indigo-900/20 border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 group-hover:from-cyan-500 group-hover:to-indigo-500 flex items-center justify-center transition-all duration-300">
                      <suggestion.icon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {suggestion.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar - Premium Design */}
          <div className="relative">
            {/* Glow effect on focus */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-lg opacity-0 focus-within:opacity-20 transition-opacity duration-500" />

            <div className="relative flex items-end gap-3 bg-white dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-cyan-400 dark:focus-within:border-cyan-600 shadow-lg transition-all duration-300">

              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question sur les logements..."
                rows="1"
                disabled={isLoading}
                className="w-full max-h-[120px] py-3 px-4 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-[15px]"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`
                  flex-shrink-0 mb-1 mr-1 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                  ${!inputValue.trim() || isLoading
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-br from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'}
                `}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Propulsé par l'IA • Les réponses peuvent varier
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;