import { useEffect, useState } from 'react';
import orderService, { PropertyOrder } from '../services/order-service';

const useOrders = () => {
   const [orders, setOrders] = useState<PropertyOrder[]>([]);

   const [isLoading, setIsLoading] = useState(false);

   const [error, setError] = useState('');

   const loadOrders = async () => {
      try {
         setIsLoading(true);

         const response = await orderService.getAll();

         setOrders(response.data);
      } catch (error: any) {
         setError(error.response?.data?.detail || 'Unable to load orders.');
      } finally {
         setIsLoading(false);
      }
   };

   const createOrder = async (data: {
      property: number;
      amount: number;
      order_type: string;
   }) => {
      const response = await orderService.create(data);

      setOrders((previous) => [...previous, response.data]);

      return response.data;
   };

   useEffect(() => {
      loadOrders();
   }, []);

   return {
      orders,
      createOrder,
      loadOrders,
      isLoading,
      error,
   };
};

export default useOrders;
