import useCart from '../../hooks/useCart';

interface Props {
   property: {
      id: number;
      title: string;
      price: number;
      image: string;
   };
}

const PropertyCard = ({ property }: Props) => {
   const { addToCart, isLoading } = useCart();

   return (
      <div>
         <img src={property.image} alt={property.title} />

         <h2>{property.title}</h2>

         <p>₦{property.price.toLocaleString()}</p>

         <button onClick={() => addToCart(property.id)} disabled={isLoading}>
            ❤️ Save Property
         </button>
      </div>
   );
};

export default PropertyCard;
