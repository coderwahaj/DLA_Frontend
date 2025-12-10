import { useState, useCallback } from 'react';
// import { chatApi } from '@/api/chatApi'; // TODO: Create this when backend is ready

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message immediately
      const userMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // TODO: Replace with actual API call
      // const response = await chatApi.sendMessage(content);
      
      // Mock response for now
      const mockResponse = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        title: '📋 Step-by-Step Guide',
        content: 'This is a mock response.  Backend integration pending.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, mockResponse]);
      
    } catch (err) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
};

export default useChat;