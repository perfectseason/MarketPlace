import { useState } from 'react';

import chatbotService from '../services/chatbot-service';

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
      if (!message.trim()) {
         return;
      }

      try {
         setIsLoading(true);
         setError('');

         // Add customer message
         const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: message,
         };

         setMessages((previous) => [...previous, userMessage]);

         // Send to Django
         const response = await chatbotService.sendMessage({
            message,
         });

         // Add AI response
         const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: response.data.reply,
         };

         setMessages((previous) => [...previous, assistantMessage]);
      } catch (error: any) {
         setError(
            error.response?.data?.detail ||
               error.response?.data?.message ||
               'The chatbot could not respond.'
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
