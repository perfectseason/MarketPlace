import apiClient from './api-client';

export interface PropertyOrder {
   id: number;

   property: number;

   amount: number;

   order_type: string;

   status: string;

   created_at: string;
}

const orderService = {
   getAll: () => apiClient.get<PropertyOrder[]>('/orders/'),

   getOne: (id: number) => apiClient.get<PropertyOrder>(`/orders/${id}/`),

   create: (data: { property: number; amount: number; order_type: string }) =>
      apiClient.post<PropertyOrder>('/orders/', data),

   update: (id: number, data: Partial<PropertyOrder>) =>
      apiClient.patch<PropertyOrder>(`/orders/${id}/`, data),

   delete: (id: number) => apiClient.delete(`/orders/${id}/`),
};

export default orderService;
