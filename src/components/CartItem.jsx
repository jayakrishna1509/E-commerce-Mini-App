import { Trash2, Plus, Minus } from 'lucide-react';

export const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-lg transition border dark:border-gray-800">
      {/* Image */}
      <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 dark:bg-gray-900 rounded flex-shrink-0 flex items-center justify-center p-2">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 mb-2">
          {item.title}
        </h3>
        <p className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400 p-1.5 sm:p-2 rounded transition border dark:border-gray-700"
          >
            <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
          </button>
          <span className="font-semibold text-gray-900 dark:text-white px-2 sm:px-3 min-w-[2.5rem] text-center text-sm sm:text-base">
            {item.quantity}
          </span>
          <button
            onClick={() => onIncrease(item.id)}
            className="bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400 p-1.5 sm:p-2 rounded transition border dark:border-gray-700"
          >
            <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-500 hover:bg-red-600 text-white p-2 sm:p-2.5 rounded self-start transition"
      >
        <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
    </div>
  );
};
