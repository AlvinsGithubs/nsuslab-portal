
import React, { useState, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import PauseIcon from './icons/PauseIcon';
import PlayIcon from './icons/PlayIcon';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSlider: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      title: t('home_hero_title_1'),
      subtitle: t('home_hero_subtitle_1'),
      imageUrl: "https://picsum.photos/seed/slide1/1200/600"
    },
    {
      title: t('home_hero_title_2'),
      subtitle: t('home_hero_subtitle_2'),
      imageUrl: "https://picsum.photos/seed/slide2/1200/600"
    },
    {
      title: t('home_hero_title_3'),
      subtitle: t('home_hero_subtitle_3'),
      imageUrl: "https://picsum.photos/seed/slide3/1200/600"
    }
  ];

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(goToNext, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPlaying, goToNext]);

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold">{slides[currentIndex].title}</h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl">{slides[currentIndex].subtitle}</p>
        <button 
          onClick={() => window.location.hash = '#/careers'}
          className="mt-8 px-8 py-3 bg-nsus-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          {t('home_hero_apply_now')}
        </button>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4">
        <button onClick={goToPrev} className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center space-x-2 text-white font-mono">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-gray-400">/</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
        
        <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          {isPlaying ? <PauseIcon className="w-6 h-6 text-white" /> : <PlayIcon className="w-6 h-6 text-white" />}
        </button>

        <button onClick={goToNext} className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <ArrowRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;