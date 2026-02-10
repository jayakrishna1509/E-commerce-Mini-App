import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`fixed top-3 sm:top-16 right-3 sm:right-4 ${bgColor} text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 z-50 animate-in fade-in slide-in-from-top-4 text-sm sm:text-base max-w-xs sm:max-w-sm`}>
      <Icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-2 flex-shrink-0"
      >
        <X className="w-3 sm:w-4 h-3 sm:h-4" />
      </button>
    </div>
  );
};
