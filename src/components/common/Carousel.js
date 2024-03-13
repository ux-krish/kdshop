// Carousel.js
import React, { useState, useEffect } from 'react';

const slidesData = [
  { id: 1, imageUrl: './6671436_3374577.jpg' },
  { id: 2, imageUrl: './11773476_4849848.jpg' },
  { id: 3, imageUrl: './13379794_5202622.jpg' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative min-w-[100%] h-[300px] overflow-hidden ">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute overflow-hidden inset-[1px] max-w-full h-full transition-opacity duration-500 ease-in-out rounded-lg ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.imageUrl} alt={`slide-${slide.id}`} className="object-cover w-full h-full" />
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-slate-200/50 h-10 w-10 text-white px-4 py-2 rounded-full"
        onClick={prevSlide}
      >
        <svg width={10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="#ec4899" /></svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-slate-200/50 h-10 w-10 text-white px-4 py-2 rounded-full"
        onClick={nextSlide}
      >
        <svg width={10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="#ec4899"/></svg>
      </button>
    </div>
  );
};

export default Carousel;
