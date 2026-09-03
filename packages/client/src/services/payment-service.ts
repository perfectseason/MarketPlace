import apiClient from './api-client';

const paymentService = {
   initialize: (data: { order_id: number }) =>
      apiClient.post('/payments/initialize/', data),
};
