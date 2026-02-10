import { useState, useRef, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Toast } from '../components/Toast';
import { Lock, Mail } from 'lucide-react';

const checkoutFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.payload.field]: action.payload.message } };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    case 'RESET':
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        errors: {},
      };
    default:
      return state;
  }
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { clearCart } = useCart();
  const firstNameRef = useRef(null);
  const [toast, setToast] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formState, dispatch] = useReducer(checkoutFormReducer, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    errors: {},
  });

  // Focus first input on mount
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=checkout');
    }
  }, [isLoggedIn, navigate]);

  const validateForm = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
    let isValid = true;

    if (!formState.firstName.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'firstName', message: 'First name is required' } });
      isValid = false;
    }
    if (!formState.lastName.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'lastName', message: 'Last name is required' } });
      isValid = false;
    }
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'email', message: 'Valid email is required' } });
      isValid = false;
    }
    if (!formState.phone.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'phone', message: 'Phone is required' } });
      isValid = false;
    }
    if (!formState.address.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'address', message: 'Address is required' } });
      isValid = false;
    }
    if (!formState.city.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'city', message: 'City is required' } });
      isValid = false;
    }
    if (!formState.zipCode.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'zipCode', message: 'Zip code is required' } });
      isValid = false;
    }
    if (!formState.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'cardNumber', message: 'Valid 16-digit card is required' } });
      isValid = false;
    }
    if (!formState.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'expiryDate', message: 'Valid expiry date (MM/YY) is required' } });
      isValid = false;
    }
    if (!formState.cvv.match(/^\d{3}$/)) {
      dispatch({ type: 'SET_ERROR', payload: { field: 'cvv', message: 'Valid 3-digit CVV is required' } });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({ message: 'Please fix the errors above', type: 'error' });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setToast({ message: 'Order Placed Successfully!', type: 'success' });
      dispatch({ type: 'RESET' });
      clearCart();
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-6 sm:py-8">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded-lg shadow-lg p-6 sm:p-8 border dark:border-gray-800">
          {/* Personal Information */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                First Name *
              </label>
              <input
                ref={firstNameRef}
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleFieldChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
              />
              {formState.errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{formState.errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleFieldChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
              />
              {formState.errors.lastName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{formState.errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleFieldChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{formState.errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleFieldChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
              />
              {formState.errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{formState.errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm sm:text-base text-gray-900 dark:text-white font-semibold mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formState.address}
              onChange={handleFieldChange}
              className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formState.errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
            />
            {formState.errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{formState.errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-900 dark:text-white font-semibold mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formState.city}
                onChange={handleFieldChange}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {formState.errors.city && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 dark:text-white font-semibold mb-2">
                Zip Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formState.zipCode}
                onChange={handleFieldChange}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {formState.errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
            Payment Information
          </h2>

          <div className="mb-6">
            <label className="block text-gray-900 dark:text-white font-semibold mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formState.cardNumber}
              onChange={handleFieldChange}
              maxLength="19"
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formState.errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {formState.errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-900 dark:text-white font-semibold mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formState.expiryDate}
                onChange={handleFieldChange}
                maxLength="5"
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.expiryDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {formState.errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 dark:text-white font-semibold mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={formState.cvv}
                onChange={handleFieldChange}
                maxLength="3"
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formState.errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {formState.errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{formState.errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Lock className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
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
  );
};
