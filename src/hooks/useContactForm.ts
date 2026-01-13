import { useState } from 'react';
import { PortfolioService } from '../services/api';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const portfolioService = PortfolioService.getInstance();
      const result = await portfolioService.sendContactMessage(formData);

      if (result.success) {
        setToast({
          show: true,
          message: result.message || 'Mensagem enviada com sucesso!',
          type: 'success',
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({
          show: true,
          message: result.error || 'Erro ao enviar mensagem. Tente novamente.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setToast({
        show: true,
        message: 'Erro inesperado. Por favor, tente novamente.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      
      // Auto-hide toast after 5 seconds
      if (toast.show) {
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
        }, 5000);
      }
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return {
    formData,
    isSubmitting,
    toast,
    handleChange,
    handleSubmit,
    closeToast,
  };
};