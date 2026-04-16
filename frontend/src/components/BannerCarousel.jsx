import { useState, useEffect, useRef } from "react";
import "./BannerCarousel.css";

const banners = [
  { id: 1, image: "/banners/img 1.png" },
  { id: 2, image: "/banners/img 2.png" },
  { id: 3, image: "/banners/img 3.png" },
  { id: 4, image: "/banners/img 4.png" },
  { id: 5, image: "/banners/img 5.png" },
];

const INTERVAL = 4000;
// Show 2 full cards + half of next
const CARD_WIDTH_PERCENT = 42; // each card ~42% of container width

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const cardWidth = isMobile ? 100 : CARD_WIDTH_PERCENT;

  const startTimer = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startTimeRef.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startTimeRef.current;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      if (elapsed < INTERVAL) {
        progressRef.current = requestAnimationFrame(animate);
      }
    };
    progressRef.current = requestAnimationFrame(animate);

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
      startTimeRef.current = performance.now();
      setProgress(0);
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, []);

  const go = (dir) => {
    setCurrent((prev) => (prev + dir + banners.length) % banners.length);
    startTimer();
  };

  // Translate so current card is first, showing 2 full + half
  const translateX = -(current * cardWidth);

  return (
    <div className="banner-section">
      <div className="banner-outer">
        <button className="banner-arrow banner-arrow-left" onClick={() => go(-1)}>‹</button>
        <button className="banner-arrow banner-arrow-right" onClick={() => go(1)}>›</button>

        <div className="banner-track-wrapper">
          <div
            className="banner-track"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {/* Duplicate for seamless loop feel */}
            {[...banners, ...banners].map((b, i) => (
              <div className="banner-card" key={i}>
                <img src={b.image} alt={`Banner ${b.id}`} className="banner-img" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="banner-slider-track">
        {banners.map((_, i) => (
          <button
            key={i}
            className="slider-seg-btn"
            onClick={() => { setCurrent(i); startTimer(); }}
          >
            <div className={`slider-seg ${i === current ? "slider-seg-active" : ""}`}>
              {i === current && (
                <div className="slider-fill" style={{ width: `${progress}%` }} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
