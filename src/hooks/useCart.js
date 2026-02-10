import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch]
  );

  const handleIncreaseQuantity = useCallback(
    (productId) => {
      dispatch(increaseQuantity(productId));
    },
    [dispatch]
  );

  const handleDecreaseQuantity = useCallback(
    (productId) => {
      dispatch(decreaseQuantity(productId));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    totalPrice,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
    clearCart: handleClearCart,
  };
};
