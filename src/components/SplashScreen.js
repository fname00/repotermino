// components/SplashScreen.js
import React, { useEffect } from 'react';
import anime from 'animejs';

const SplashScreen = ({ finishLoading }) => {
  useEffect(() => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: "#logo",
      delay: 0,
      scale: [0, 1], // Start from scale 0 and grow to full size
      duration: 2000,
      easing: "easeInOutExpo", // Smooth easing effect
    });
  }, [finishLoading]);

  return (
    <div className="relative h-screen bg-gray-900 text-white">
      {/* Centered SVG Preloader */}
      <svg
        id="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 150"
        className="absolute"
        style={{
          top: '50%',       // Center vertically
          left: '50%',      // Center horizontally
          transform: 'translate(-50%, -50%)', // Offset to fully center
          position: 'absolute',
          width: '150px',   // Fixed width for better control
          height: 'auto',   // Maintain aspect ratio
        }}
      >
        <path
          fill="none"
          stroke="#eb6753"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="300 385"
          strokeDashoffset="0"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        >
          <animate
            attributeName="stroke-dashoffset"
            calcMode="spline"
            dur="2s"
            values="685;-685"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default SplashScreen;
