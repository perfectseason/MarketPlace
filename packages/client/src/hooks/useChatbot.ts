// customer enquiry form
import { useState } from 'react';
import apiClient from '../services/api-client';

export interface ChatMessage {
   id: string;
   role: 'user' | 'assistant';
   content: string;
}

const useChatbot = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const sendMessage = async (message: string) => {
      try {
         setIsLoading(true);
         setError('');

         // Add user's message immediately
         const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: message,
         };

         setMessages((previous) => [...previous, userMessage]);

         // Send message to Django
         const response = await apiClient.post('/chatbot/', {
            message,
         });

         // Add AI response
         const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: response.data.reply,
         };

         setMessages((previous) => [...previous, assistantMessage]);
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to contact chatbot'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const clearChat = () => {
      setMessages([]);
      setError('');
   };

   return {
      messages,
      isLoading,
      error,
      sendMessage,
      clearChat,
   };
};

export default useChatbot;
