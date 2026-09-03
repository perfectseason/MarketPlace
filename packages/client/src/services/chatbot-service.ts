import apiClient from './api-client';

export interface ChatMessageRequest {
   message: string;
}

export interface ChatMessageResponse {
   reply: string;
}

const chatbotService = {
   sendMessage(data: ChatMessageRequest) {
      return apiClient.post<ChatMessageResponse>('/chatbot/', data);
   },
};

export default chatbotService;
