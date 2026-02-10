import { CartItem } from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export const Cart = () => {
  const { items, totalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            Shopping Cart
          </h1>

          <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 sm:p-12 text-center border dark:border-gray-800">
            <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
              Start Shopping to Add Items to Your Cart!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 rounded transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 sm:p-8 h-fit sticky top-20 border dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <span>Tax</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span className="text-blue-600">${(totalPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 rounded-lg block text-center transition mb-3 text-sm sm:text-base"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="w-full bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold py-2 sm:py-3 rounded-lg block text-center transition border dark:border-gray-700 text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
