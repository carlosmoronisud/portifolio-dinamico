import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, type, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Delay para a animação
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-800/50 text-green-300';
      case 'error':
        return 'bg-red-900/20 border-red-800/50 text-red-300';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-800/50 text-yellow-300';
      case 'info':
      default:
        return 'bg-blue-900/20 border-blue-800/50 text-blue-300';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
      <div className={`flex items-center p-4 rounded-lg border ${getTypeStyles()} shadow-lg backdrop-blur-sm`}>
        <div className="mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;