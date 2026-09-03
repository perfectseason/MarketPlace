import apiClient from './api-client';

export interface OrderItem {
   id: number;
   product: number;
   product_name: string;
   quantity: number;
   price: number;
   subtotal: number;
}

export interface Order {
   id: number;
   items: OrderItem[];
   total: number;
   status: string;
   created_at: string;
}

export interface CreateOrderData {
   shipping_address: string;
   phone: string;
   payment_method: string;
}

const orderService = {
   // Get customer's orders
   getOrders() {
      return apiClient.get<Order[]>('/orders/');
   },

   // Get one order
   getOrder(id: number) {
      return apiClient.get<Order>(`/orders/${id}/`);
   },

   // Create order
   createOrder(data: CreateOrderData) {
      return apiClient.post<Order>('/orders/', data);
   },
};

export default orderService;
