import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  MessageCircle,
  X,
  Globe,
  Send,
  Paperclip,
  Printer,
  CheckCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { getChatbotResponse } from "../utils/gemini";

// Interfaces
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface SuggestedResponse {
  id: string;
  text: string;
}

// ChatbotAvatar Component
interface ChatbotAvatarProps {
  isBotMessage: boolean;
}

const ChatbotAvatar: React.FC<ChatbotAvatarProps> = ({ isBotMessage }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br ${
        isBotMessage
          ? "from-green-500 to-green-800"
          : "from-gray-500 to-gray-700"
      }`}
    >
      {isBotMessage ? (
        <div className="h-full w-full flex items-center justify-center text-white text-xs font-bold">
          <Printer className="h-4 w-4" />
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white text-xs font-bold">
          You
        </div>
      )}
    </motion.div>
  );
};

// ChatbotButton Component
interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className="bg-gradient-to-br from-green-500 to-green-800 hover:from-green-600 hover:to-green-900 text-white p-3 rounded-full shadow-lg fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12"
      aria-label="Open PT Emran Ghanim Asahi Chatbot"
    >
      <MessageCircle className="h-6 w-6 animate-pulse" />
    </motion.button>
  );
};

// ChatbotError Component
interface ChatbotErrorProps {
  message: string;
  onRetry?: () => void;
}

const ChatbotError: React.FC<ChatbotErrorProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-3 p-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-xs flex items-center justify-between"
    >
      <div className="flex items-center">
        <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>{message}</span>
      </div>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="ml-3 text-xs font-semibold py-1 px-2 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-md transition-colors"
        >
          Retry
        </motion.button>
      )}
    </motion.div>
  );
};

// ChatbotHeader Component
interface ChatbotHeaderProps {
  title: string;
  onClose: () => void;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ title, onClose }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-green-500 to-green-800 text-white p-3 rounded-t-xl flex justify-between items-center shadow-md"
    >
      <div className="flex items-center">
        <Printer className="h-5 w-5 mr-2 text-white" />
        <h3 className="text-base font-semibold">PT Emran Ghanim Asahi</h3>
      </div>
      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleLanguage}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label="Toggle language"
        >
          <Globe className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label="Close chatbot"
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ChatbotInput Component
interface ChatbotInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  isDisabled: boolean;
  placeholder: string;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  value,
  onChange,
  onSend,
  isDisabled,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800"
    >
      <form onSubmit={onSend} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-sm ${
              isFocused
                ? "border-green-300"
                : "border-gray-300 dark:border-gray-600"
            } bg-gray-50 dark:bg-gray-700 dark:text-white text-gray-800`}
            disabled={isDisabled}
            aria-label={placeholder}
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Attach file"
            onClick={(e) => e.preventDefault()}
            disabled={isDisabled}
          >
            <Paperclip className="h-4 w-4" />
          </motion.button>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isDisabled || !value.trim()}
          className={`bg-gradient-to-br from-green-500 to-green-800 hover:from-green-600 hover:to-green-900 text-white p-2 rounded-lg transition-colors flex items-center justify-center ${
            isDisabled || !value.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </form>
    </motion.div>
  );
};

// ChatbotMessage Component
interface ChatbotMessageProps {
  message: Message;
  isLastMessage: boolean;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({
  message,
  isLastMessage,
}) => {
  const isUserMessage = message.sender === "user";

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className={`mb-3 flex ${isUserMessage ? "justify-end" : "justify-start"}`}
    >
      {!isUserMessage && (
        <div className="mr-2 mt-1">
          <ChatbotAvatar isBotMessage={true} />
        </div>
      )}
      <div
        className={`max-w-[75%] flex flex-col ${
          isUserMessage ? "items-end" : "items-start"
        }`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`px-3 py-2 rounded-lg shadow-sm ${
            isUserMessage
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 text-gray-800 dark:text-white rounded-bl-none"
          }`}
        >
          <p className="text-xs break-words">{message.text}</p>
        </motion.div>
        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="mr-1">{formatTime(message.timestamp)}</span>
          {isUserMessage && isLastMessage && (
            <span className="flex items-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCheck className="h-3 w-3 text-blue-500" />
              </motion.span>
            </span>
          )}
          {isUserMessage && !isLastMessage && (
            <Check className="h-3 w-3 text-gray-400" />
          )}
        </div>
      </div>
      {isUserMessage && (
        <div className="ml-2 mt-1">
          <ChatbotAvatar isBotMessage={false} />
        </div>
      )}
    </motion.div>
  );
};

// ChatbotSuggestions Component
interface ChatbotSuggestionsProps {
  suggestions: SuggestedResponse[];
  onSelect: (suggestion: string) => void;
}

const ChatbotSuggestions: React.FC<ChatbotSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  if (!suggestions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
      className="mb-3 flex flex-wrap gap-2"
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          whileHover={{ scale: 1.05, backgroundColor: "#34D399" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(suggestion.text)}
          className="text-xs py-1 px-3 bg-green-100 hover:bg-green-200 text-green-800 font-medium rounded-lg border border-green-300 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {suggestion.text}
        </motion.button>
      ))}
    </motion.div>
  );
};

// ChatbotTypingIndicator Component
const ChatbotTypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-start mb-3"
    >
      <div className="mr-2 mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center text-white font-bold">
        <Printer className="h-4 w-4" />
      </div>
      <div className="px-3 py-2 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-lg rounded-bl-none shadow-sm">
        <div className="flex space-x-1">
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Main Chatbot Component
const Chatbot: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      sender: "bot",
      text:
        language === "id"
          ? "Selamat datang! Saya asisten percetakan PT Emran Ghanim Asahi. Bagaimana saya bisa membantu Anda hari ini?"
          : "Welcome! I am the printing assistant for PT Emran Ghanim Asahi. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestedResponse[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (language === "en") {
      setSuggestions([
        { id: uuidv4(), text: "Tell me about your printing services" },
        { id: uuidv4(), text: "What types of printing do you offer?" },
        { id: uuidv4(), text: "Can you provide a quote?" },
        { id: uuidv4(), text: "How can I place an order?" },
      ]);
    } else {
      setSuggestions([
        { id: uuidv4(), text: "Ceritakan tentang layanan percetakan Anda" },
        { id: uuidv4(), text: "Jenis percetakan apa yang Anda tawarkan?" },
        { id: uuidv4(), text: "Bisakah Anda memberikan penawaran harga?" },
        { id: uuidv4(), text: "Bagaimana cara memesan?" },
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      if (newMessages.length > 0 && newMessages[0].sender === "bot") {
        newMessages[0] = {
          ...newMessages[0],
          text:
            language === "id"
              ? "Selamat datang! Saya asisten percetakan PT Emran Ghanim Asahi. Bagaimana saya bisa membantu Anda hari ini?"
              : "Welcome! I am the printing assistant for PT Emran Ghanim Asahi. How can I assist you today?",
        };
      }
      return newMessages;
    });
  }, [language]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
    if (!isOpen) {
      setTimeout(scrollToBottom, 300);
    }
  };

  const processUserMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      sender: "user",
      text: text,
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);
    setError(null);
    setSuggestions([]);

    try {
      // Call Gemini API via getChatbotResponse
      const botResponse = await getChatbotResponse(text, language);

      const botMessage: Message = {
        id: uuidv4(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [
        ...prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg
        ),
        botMessage,
      ]);
      setIsTyping(false);

      // Update suggestions based on language
      if (language === "en") {
        setSuggestions([
          { id: uuidv4(), text: "Tell me more about your printing process" },
          { id: uuidv4(), text: "What materials do you use?" },
          { id: uuidv4(), text: "Can I see samples?" },
          { id: uuidv4(), text: "How fast can you deliver?" },
        ]);
      } else {
        setSuggestions([
          {
            id: uuidv4(),
            text: "Ceritakan lebih detail proses percetakan Anda",
          },
          { id: uuidv4(), text: "Bahan apa yang Anda gunakan?" },
          { id: uuidv4(), text: "Bisakah saya melihat sampel?" },
          { id: uuidv4(), text: "Seberapa cepat Anda bisa mengirim?" },
        ]);
      }
    } catch (err: any) {
      setIsTyping(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
      setError(
        language === "id"
          ? "Maaf, terjadi kesalahan saat menghubungi server AI. Silakan coba lagi."
          : "Sorry, there was an error connecting to the AI server. Please try again."
      );
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await processUserMessage(userInput);
  };

  const handleSuggestionSelect = async (text: string) => {
    await processUserMessage(text);
  };

  const handleRetry = async () => {
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.sender === "user");
    if (lastUserMessage) {
      await processUserMessage(lastUserMessage.text);
    }
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80 max-h-[500px] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 sm:w-72"
          >
            <ChatbotHeader
              title="PT Emran Ghanim Asahi Chatbot"
              onClose={toggleChat}
            />
            <div
              ref={messageContainerRef}
              className="flex-1 p-4 overflow-y-auto scroll-smooth bg-gradient-to-br from-green-50 to-white dark:from-green-900 dark:to-green-800"
              style={{ minHeight: "300px" }}
            >
              {messages.map((message, index) => (
                <ChatbotMessage
                  key={message.id}
                  message={message}
                  isLastMessage={
                    index === messages.length - 1 && message.sender === "user"
                  }
                />
              ))}
              <AnimatePresence>
                {isTyping && <ChatbotTypingIndicator />}
              </AnimatePresence>
              <AnimatePresence>
                {error && (
                  <ChatbotError message={error} onRetry={handleRetry} />
                )}
              </AnimatePresence>
              <ChatbotSuggestions
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
              />
              <div ref={messagesEndRef} />
            </div>
            <ChatbotInput
              value={userInput}
              onChange={setUserInput}
              onSend={handleSendMessage}
              isDisabled={isTyping}
              placeholder={
                t.typeMessage ||
                (language === "id"
                  ? "Ketik pesan Anda..."
                  : "Type your message...")
              }
            />
          </motion.div>
        ) : (
          <ChatbotButton onClick={toggleChat} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
