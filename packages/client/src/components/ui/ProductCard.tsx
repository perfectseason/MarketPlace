import { Product } from '../services/product-service';
import useCart from '../hooks/useCart';

interface ProductCardProps {
   product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
   const { addToCart, isLoading, error } = useCart();

   const handleAddToCart = async () => {
      await addToCart(product.id, 1);
   };

   return (
      <div className="rounded-lg border p-4">
         {/* PRODUCT IMAGE */}
         <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover"
         />

         {/* PRODUCT NAME */}
         <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>

         {/* PRICE */}
         <p className="mt-2">₦{product.price.toLocaleString()}</p>

         {/* ADD TO CART */}
         <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="mt-4 rounded bg-black px-4 py-2 text-white"
         >
            {isLoading ? 'Adding...' : 'Add to Cart'}
         </button>

         {/* ERROR */}
         {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
   );
};

export default ProductCard;
