import apiClient from './api-client';

export interface PropertyCartItem {
   id: number;
   property: number;
   property_title: string;
   property_image: string;
   price: number;
   location: string;
}

export interface PropertyCart {
   id: number;
   items: PropertyCartItem[];
   total_items: number;
}

const cartService = {
   // GET CART
   getCart: () => apiClient.get<PropertyCart>('/cart/'),

   // POST PROPERTY INTO CART
   addItem: (propertyId: number) =>
      apiClient.post<PropertyCart>('/cart/items/', {
         property: propertyId,
      }),

   // PATCH CART ITEM
   updateItem: (
      itemId: number,
      data: {
         property?: number;
      }
   ) => apiClient.patch<PropertyCart>(`/cart/items/${itemId}/`, data),

   // DELETE CART ITEM
   removeItem: (itemId: number) =>
      apiClient.delete<PropertyCart>(`/cart/items/${itemId}/`),
};

export default cartService;
