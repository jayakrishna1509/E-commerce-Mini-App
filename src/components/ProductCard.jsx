import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, onAddToCart }) => {
  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border dark:border-gray-800">
      {/* Image Container */}
      <div className="h-40 sm:h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-3 sm:p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 mb-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{rating}</span>
        </div>

        {/* Price */}
        <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
          ${product.price.toFixed(2)}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-900 dark:text-white py-2 rounded font-medium text-center transition text-sm sm:text-base border dark:border-gray-700"
          >
            View
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium flex items-center justify-center gap-2 transition text-sm sm:text-base"
          >
            <ShoppingCart className="w-3 sm:w-4 h-3 sm:h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
