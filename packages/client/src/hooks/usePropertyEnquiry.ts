import { useState } from 'react';
import propertyEnquiryService, {
   type PropertyEnquiryData,
} from '../services/property-enquiry-service';

const usePropertyEnquiry = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [success, setSuccess] = useState('');

   const [error, setError] = useState('');

   const submitEnquiry = async (data: PropertyEnquiryData) => {
      try {
         setIsSubmitting(true);
         setError('');
         setSuccess('');

         const response = await propertyEnquiryService.create(data);

         setSuccess('Your property enquiry was sent successfully.');

         return response.data;
      } catch (error: any) {
         setError(error.response?.data?.detail || 'Unable to submit enquiry.');

         throw error;
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

export default usePropertyEnquiry;

// import { useState } from "react";
// import usePropertyEnquiry from "../hooks/usePropertyEnquiry";

// interface Props {
//   propertyId: number;
// }

// const PropertyEnquiryForm = ({
//   propertyId,
// }: Props) => {

//   const {
//     submitEnquiry,
//     isSubmitting,
//     success,
//     error,
//   } = usePropertyEnquiry();

//   const [name, setName] =
//     useState("");

//   const [email, setEmail] =
//     useState("");

//   const [phone, setPhone] =
//     useState("");

//   const [message, setMessage] =
//     useState("");

//   const handleSubmit = async (
//     event: React.FormEvent
//   ) => {

//     event.preventDefault();

//     await submitEnquiry({

//       property: propertyId,

//       name,

//       email,

//       phone,

//       message,

//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <input
//         placeholder="Your name"
//         value={name}
//         onChange={(event) =>
//           setName(event.target.value)
//         }
//       />

//       <input
//         type="email"
//         placeholder="Your email"
//         value={email}
//         onChange={(event) =>
//           setEmail(event.target.value)
//         }
//       />

//       <input
//         placeholder="Phone number"
//         value={phone}
//         onChange={(event) =>
//           setPhone(event.target.value)
//         }
//       />

//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={(event) =>
//           setMessage(event.target.value)
//         }
//       />

//       <button
//         type="submit"
//         disabled={isSubmitting}
//       >
//         {isSubmitting
//           ? "Sending..."
//           : "Request Information"}
//       </button>

//       {success && (
//         <p>{success}</p>
//       )}

//       {error && (
//         <p>{error}</p>
//       )}

//     </form>
//   );
// };

// export default PropertyEnquiryForm;
