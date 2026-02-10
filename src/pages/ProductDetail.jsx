import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { useCart } from '../hooks/useCart';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ShoppingCart, Star } from 'lucide-react';
import axios from 'axios';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
    setToast({ message: `Added ${quantity} Item(s) to Cart!`, type: 'success' });
    setQuantity(1);
  };

  if (loading) return <LoadingSpinner />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Image */}
            <div className="bg-white dark:bg-black rounded-lg p-6 sm:p-8 flex items-center justify-center border dark:border-gray-800">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-64 sm:max-h-96 object-contain"
              />
            </div>

            {/* Details */}
            <div className="bg-white dark:bg-black rounded-lg p-6 sm:p-8 border dark:border-gray-800">
              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase mb-2">
                {product.category}
              </p>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 sm:w-5 h-4 sm:h-5 ${
                        i < Math.round(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {rating}
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                ${product.price.toFixed(2)}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition text-sm sm:text-base"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};
