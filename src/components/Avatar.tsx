import { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar = ({ src, alt, size = 'lg', className = '' }: AvatarProps) => {
  const [error, setError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80'
  };
  
  
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {error || !src ? (
        <div className="w-full h-full rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl">
          <User size={size === 'xl' ? 64 : size === 'lg' ? 48 : 32} className="text-white" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover border-8 border-white shadow-2xl"
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default Avatar;