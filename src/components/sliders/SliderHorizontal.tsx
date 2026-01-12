// components/sliders/SliderHorizontal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderHorizontalProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerView?: number;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  gap?: number;
}

const SliderHorizontal = <T,>({
  items,
  renderItem,
  itemsPerView = 3,
  className = '',
  showControls = true,
  showDots = true,
  autoSlide = false,
  autoSlideInterval = 5000,
  gap = 32,
}: SliderHorizontalProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsPerView);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ajustar itemsPerSlide baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(itemsPerView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, items.length - itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
  };

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
      {showControls && items.length > itemsPerSlide && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="text-gray-700 hover:text-primary-600" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 md:translate-x-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-200 hover:border-primary-300 hover:bg-primary-50"
            aria-label="Próximo"
          >
            <ChevronRight className="text-gray-700 hover:text-primary-600" size={24} />
          </button>
        </>
      )}

      {/* Slider Container */}
      <div className="overflow-hidden px-2">
        <div
          ref={sliderRef}
          className="transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${items.length}, calc(${100 / itemsPerSlide}% - ${gap * (itemsPerSlide - 1) / itemsPerSlide}px))`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => (
            <div key={index}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores (Dots) */}
      {showDots && items.length > itemsPerSlide && (
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * itemsPerSlide)}
              className={`mx-1 transition-all duration-300 ${
                currentIndex >= index * itemsPerSlide && currentIndex < (index + 1) * itemsPerSlide
                  ? 'w-8 bg-primary-600'
                  : 'w-3 bg-gray-300'
              } h-3 rounded-full`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {currentIndex + itemsPerSlide > items.length ? items.length : currentIndex + itemsPerSlide} de {items.length}
      </div>
    </div>
  );
};

export default SliderHorizontal;