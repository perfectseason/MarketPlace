import apiClient from './api-client';

export interface User {
   id: number;
   username: string;
   email: string;
   first_name?: string;
   last_name?: string;
}

const userService = {
   getCurrentUser() {
      return apiClient.get<User>('/users/me/');
   },

   getUser(id: number) {
      return apiClient.get<User>(`/users/${id}/`);
   },
};

export default userService;
