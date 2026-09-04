import apiClient from './api-client';

export interface PropertyEnquiryData {
   property: number;

   name: string;

   email: string;

   phone: string;

   message: string;
}

const propertyEnquiryService = {
   create: (data: PropertyEnquiryData) => {
      return apiClient.post('/property-enquiries/', data);
   },
};

export default propertyEnquiryService;
