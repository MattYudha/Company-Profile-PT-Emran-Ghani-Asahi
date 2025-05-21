import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatbotResponse } from '../utils/openai';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: t.chatbotWelcome,
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await getChatbotResponse(userInput, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      setError(t.chatError || 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* Chat button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: isOpen ? 0 : 1 }}
          exit={{ scale: 0 }}
          onClick={toggleChat}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>

        {/* Chat window */}
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-80 sm:w-96"
            style={{ minHeight: '400px', maxHeight: '600px', bottom: '5rem' }}
          >
            {/* Chat header */}
            <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                <h3 className="font-medium">{t.chatWithUs}</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-left"
                >
                  <div className="inline-block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t.typeMessage}
                  className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-r-lg transition-colors ${
                    isTyping ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isTyping}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;