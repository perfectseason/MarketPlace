import apiClient from './api-client';

export interface Entity {
   id: number;
}

class HttpService {
   endpoint: string;

   constructor(endpoint: string) {
      this.endpoint = endpoint;
   }

   // GET ALL
   getAll<T>() {
      const controller = new AbortController();

      const request = apiClient.get<T[]>(`${this.endpoint}/`, {
         signal: controller.signal,
      });

      return {
         request,
         cancel: () => controller.abort(),
      };
   }

   // GET ONE
   get<T>(id: number) {
      return apiClient.get<T>(`${this.endpoint}/${id}/`);
   }

   // CREATE
   create<T>(entity: T) {
      return apiClient.post(`${this.endpoint}/`, entity);
   }

   // UPDATE
   update<T extends Entity>(entity: T) {
      return apiClient.patch(`${this.endpoint}/${entity.id}/`, entity);
   }

   // DELETE
   delete(id: number) {
      return apiClient.delete(`${this.endpoint}/${id}/`);
   }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
