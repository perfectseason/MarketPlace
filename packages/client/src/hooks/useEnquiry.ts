import { useState } from 'react';
import apiClient from '../services/api-client';

export interface EnquiryData {
   name: string;
   email: string;
   phone: string;
   message: string;
}

const useEnquiry = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [success, setSuccess] = useState('');
   const [error, setError] = useState('');

   const submitEnquiry = async (data: EnquiryData) => {
      try {
         setIsSubmitting(true);
         setSuccess('');
         setError('');

         await apiClient.post('/enquiries/', data);

         setSuccess('Your enquiry has been submitted successfully.');
      } catch (err: any) {
         setError(
            err.response?.data?.detail ||
               err.response?.data?.message ||
               'Unable to submit enquiry'
         );
      } finally {
         setIsSubmitting(false);
      }
   };

   return {
      submitEnquiry,
      isSubmitting,
      success,
      error,
   };
};

export default useEnquiry;
