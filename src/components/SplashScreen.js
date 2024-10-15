// components/SplashScreen.js
import React, { useEffect, useState } from 'react';
import anime from 'animejs';

const SplashScreen = ({ finishLoading }) => {
  useEffect(() => {
    const loader = anime.timeline({
      complete: () => finishLoading()
    });
    loader.add({
      targets: "#logo",
      delay: 0,
      scale: 3,
      duration: 2000,
      easing: "easeInOutExpo",
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <img id="logo" src="/logo.svg" alt="Logo" className="w-20 h-20" />
    </div>
  );
};

export default SplashScreen;