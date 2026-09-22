import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteSettings } from '../lib/useSiteSettings';
import { RenderTrustIcon } from './TrustIcon';
import heroAviator from '../assets/images/hero_aviator_stone_1789622571505.jpg';
import heroTortoise from '../assets/images/hero_tortoise_marble_1789622587182.jpg';
import heroTitanium from '../assets/images/hero_titanium_stone_1789622603770.jpg';
import heroBoldSun from '../assets/images/hero_bold_sun_wood_1789622615799.jpg';
import heroFrames from '../assets/images/hero_frames_marble_1789622628594.jpg';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onScrollDown: () => void;
}

const HERO_SLIDES = [
  {
    image: heroAviator,
    alt: 'Defence Optics Luxury Gold Aviator Sunglasses on warm travertine stone in natural sunlight',
    badge: 'Crafted Heritage',
    title: 'Signature 24K Aviator',
    category: 'Sunglasses'
  },
  {
    image: heroTortoise,
    alt: 'Handcrafted Tortoiseshell Optical Frames on dark polished marble with crystal reflections',
    badge: 'Artisanal Acetate',
    title: 'Sovereign Havana Round',
    category: 'Eyeglasses'
  },
  {
    image: heroTitanium,
    alt: 'Minimalist Champagne Gold Titanium Eyeglasses resting on warm limestone slab',
    badge: 'Featherlight Precision',
    title: 'Aero Titanium Contour',
    category: 'Frames'
  },
  {
    image: heroBoldSun,
    alt: 'Statement Bold Black Acetate Sunglasses on warm fluted walnut wood and stone',
    badge: 'Bespoke Shades',
    title: 'Vanguard Piano Noir',
    category: 'Sunglasses'
  },
  {
    image: heroFrames,
    alt: 'Architectural Optical Eyeglass Frame on polished travertine marble podium',
    badge: 'Studio Optical',
    title: 'Atelier Geometry Frame',
    category: 'Frames'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onShopNow,
  onExploreCollection,
  onScrollDown
}) => {
  const { settings } = useSiteSettings();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Preload all 5 carousel images immediately to prevent any blank/delayed slides
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-rotating carousel: cross-fades every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full bg-[#F6F2EB] overflow-hidden border-b border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-6 z-10">
            {/* Gold Accent Rule & Eyebrow Label */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-4">
              <span className="w-7 sm:w-9 h-[2px] sm:h-[2.5px] bg-[#D4A347]" />
              <span className="text-[10px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] font-bold text-[#B8852B] uppercase font-sans">
                PREMIUM EYEWEAR BOUTIQUE
              </span>
            </div>

            {/* Main Brand Display Headline - Bold, High-Contrast Serif */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[62px] tracking-[-0.02em] text-[#101010] font-black uppercase leading-[1.08] sm:leading-[1.04] mb-2 sm:mb-3.5">
              DEFENCE <span className="text-[#D4A347] font-black">OPTICS</span>
            </h1>

            {/* Sub-headline Tagline - Substantial Weight, Authority, Non-Italic */}
            <div className="font-serif not-italic font-bold text-lg sm:text-2xl lg:text-3xl text-[#181818] tracking-tight mb-2.5 sm:mb-4 flex items-center gap-2 sm:gap-2.5">
              <span>See Better.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A347]" />
              <span>Look Better.</span>
            </div>

            {/* Editorial Description */}
            <p className="text-[#453F36] text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-5 sm:mb-7 font-sans font-normal">
              Discover premium eyeglasses, sunglasses, and frames designed for your style, comfort and vision. Hand-finished frames crafted with optical precision and certified UV protection.
            </p>

            {/* Two Action Buttons with Micro-elevation and High Contrast */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                id="hero-shop-now-btn"
                onClick={onShopNow}
                className="btn-lift w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center px-6 sm:px-7 py-3.5 bg-[#101010] text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-bold hover:bg-[#D4A347] hover:text-[#101010] shadow-[0_4px_16px_rgba(0,0,0,0.14)] group cursor-pointer rounded-lg"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={onExploreCollection}
                className="btn-lift w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center px-6 sm:px-7 py-3.5 border-2 border-[#101010] bg-transparent text-[#101010] text-xs sm:text-sm uppercase tracking-[0.14em] font-bold hover:bg-[#101010] hover:text-white group cursor-pointer rounded-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Micro-Badges with Gold Contrast Accent (Dynamic from Site Settings) */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#DFD6C6] flex flex-wrap items-center gap-4 sm:gap-6 text-[10.5px] sm:text-[11px] text-[#554E44] uppercase tracking-wider font-semibold">
              {settings.trust_badges.map((badge) => (
                <span key={badge.id} className="flex items-center gap-1.5 sm:gap-2">
                  <RenderTrustIcon name={badge.icon_name} className="w-3.5 h-3.5 text-[#D4A347] shrink-0" />
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Hero Column: Auto-rotating Lifestyle Carousel with Fixed 16:9 Aspect Ratio */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-2 lg:mt-0 w-full">
            <div
              className="card-lift group relative w-full max-w-lg lg:max-w-none mx-auto aspect-[16/9] overflow-hidden rounded-xl shadow-[0_12px_36px_rgba(16,16,16,0.12)] border border-[#DDD4C4] bg-[#ECE4D6]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Carousel Slides Container with Cross-Fade */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = heroAviator;
                      }}
                      className={`w-full h-full max-w-full object-cover object-center transition-transform duration-[4500ms] ease-out ${
                        activeSlide === idx ? 'scale-104' : 'scale-100'
                      }`}
                      style={{ maxWidth: '100%', height: '100%' }}
                      loading="eager"
                      decoding="sync"
                    />
                    {/* Subtle Cinematic Warm Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Top Left Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#101010]/90 backdrop-blur-xs text-[#ECE4D6] text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] font-sans font-bold uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/15 shadow-sm rounded-md">
                {HERO_SLIDES[activeSlide].badge}
              </div>

              {/* Bottom Left Slide Caption */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none transition-opacity duration-500 max-w-[65%] sm:max-w-none">
                <span className="text-[9px] sm:text-[10px] text-[#D4A347] font-sans uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold block">
                  {HERO_SLIDES[activeSlide].category}
                </span>
                <span className="font-serif text-xs sm:text-sm md:text-base font-bold text-white tracking-wide drop-shadow-md truncate block">
                  {HERO_SLIDES[activeSlide].title}
                </span>
              </div>

              {/* Interactive Prev/Next Arrows (accessible touch targets on mobile) */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center bg-[#101010]/85 hover:bg-[#D4A347] text-white hover:text-[#101010] transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 border border-white/15 shadow-md rounded-lg cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center bg-[#101010]/85 hover:bg-[#D4A347] text-white hover:text-[#101010] transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 border border-white/15 shadow-md rounded-lg cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Small Dot Indicators at Bottom-Right */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 bg-[#101010]/85 backdrop-blur-md px-2.5 py-1.5 sm:px-3 border border-white/15 shadow-md rounded-lg">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx
                        ? 'w-5 sm:w-6 bg-[#D4A347]'
                        : 'w-2 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scroll Down Indicator - Desktop Only */}
            <button
              id="hero-scroll-indicator"
              onClick={onScrollDown}
              className="hidden lg:flex absolute -bottom-7 right-0 flex-col items-center group cursor-pointer"
              aria-label="Scroll to featured collection"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#6D655A] group-hover:text-[#101010] transition-colors mb-1.5">
                SCROLL DOWN
              </span>
              <div className="w-[1.5px] h-6 bg-[#B8B0A2] group-hover:bg-[#D4A347] transition-colors relative">
                <ChevronDown className="w-3.5 h-3.5 text-[#6D655A] group-hover:text-[#D4A347] absolute -bottom-3 -left-[5.5px] transition-transform duration-300 group-hover:translate-y-0.5" />
              </div>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
