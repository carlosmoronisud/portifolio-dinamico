// components/sliders/SliderVertical.tsx
import React, { useState, useEffect, useRef } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react';

interface SliderVerticalProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerView?: number;
  className?: string;
  showControls?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  itemHeight?: number; // Nova prop para altura do item
}

const SliderVertical = <T,>({
  items,
  renderItem,
  itemsPerView = 1, 
  className = '',
//   showControls = false,
  autoSlide = false,
  autoSlideInterval = 5000,
  itemHeight = 300, 
}: SliderVerticalProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsPerView);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ajustar itemsPerSlide baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, items.length - itemsPerSlide);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

  // Auto slide
  useEffect(() => {
    if (!autoSlide) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, maxIndex]);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum item para exibir</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Controles */}
      {/* {showControls && items.length > itemsPerSlide && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-0 md:-translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-500 hover:bg-primary-50 group"
            aria-label="Experiência anterior"
          >
            <ChevronUp className="text-gray-700 group-hover:text-primary-600 transition-colors" size={24} />
          </button>
          
           <button
            onClick={nextSlide}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:right-0 md:translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-500 hover:bg-primary-50 group"
            aria-label="Próxima experiência"
          >
            <ChevronDown className="text-gray-700 group-hover:text-primary-600 transition-colors" size={24} />
          </button> 
        </>
      )} */}

      {/* Indicadores para mobile */}
      {items.length > itemsPerSlide && (
        <div className="flex justify-center md:hidden mb-6">
          {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerSlide)}
              className={`w-3 h-2 mx-1 rounded-full transition-all duration-300 ${
                currentIndex >= index * itemsPerSlide && currentIndex < (index + 1) * itemsPerSlide
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="overflow-hidden rounded-xl"
        style={{ 
          height: `${itemsPerSlide * itemHeight}px`,
          minHeight: `${itemHeight}px`
        }}
      >
        <div
          className="transition-all duration-500 ease-out"
          style={{
            transform: `translateY(-${(currentIndex * 26) / itemsPerSlide}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="mb-8 last:mb-0 transition-opacity duration-300"
              style={{ 
                height: `${itemHeight}px`,
                opacity: currentIndex <= index && index < currentIndex + itemsPerSlide ? 1 : 0.7
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Contador e navegação */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          {Math.min(currentIndex + itemsPerSlide, items.length)} de {items.length} experiências
        </div>
        
        {/* Navegação por números para desktop */}
        {items.length > itemsPerSlide && (
          <div className="hidden md:flex items-center space-x-2">
            {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerSlide)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                  currentIndex >= index * itemsPerSlide && currentIndex < (index + 1) * itemsPerSlide
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={`Ir para experiência ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderVertical;