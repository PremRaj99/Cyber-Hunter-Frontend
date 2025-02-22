import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const [glitchText, setGlitchText] = useState('404');
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      const position = Math.floor(Math.random() * 2);
      const newText = glitchText.split('');
      newText[position] = randomChar;
      setGlitchText(newText.join(''));

      setTimeout(() => {
        setGlitchText('404');
      }, 100);
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [glitchText]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate(-1);
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full bg-brandPrimary"
              style={{ top: `${i * 5}%`, animation: `scroll ${2 + i * 0.1}s linear infinite` }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-brandPrimary"
              style={{ left: `${i * 5}%`, animation: `scroll ${2 + i * 0.1}s linear infinite` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-8 animate-pulse">
          {glitchText} !
        </h1>
        <h2 className="text-2xl md:text-3xl text-white mb-8 animate-bounce">
          Page Not Found
        </h2>
        <p className="text-cyan-200 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have slipped into a digital void.
          Don't worry, you will be redirected shortly.
        </p>
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center m-4">
            <svg
              className="animate-spin h-28 w-h-28 text-cyan-400 p-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75 rounded-full"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-brandPrimary">{countdown}</span>
          </div>
        </div>
        <p className="text-lg mt-4 text-cyan-300">
          Redirecting in {countdown} seconds...
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-brandPrimary text-black font-bold rounded-lg
                     hover:bg-cyan-400 transition-all duration-300
                     hover:scale-105 hover:shadow-lg hover:shadow-brandPrimary/50 mt-6"
        >
          <span className="flex items-center gap-2 text-lg"><IoMdArrowRoundBack />Go Back</span>
        </button>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brandPrimary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(100vh) translateX(100vw); }
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(100px, 100px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className=" relative block w-full h-24 sm:h-32 lg:h-48"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-cyan-200 opacity-50"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ErrorPage;
