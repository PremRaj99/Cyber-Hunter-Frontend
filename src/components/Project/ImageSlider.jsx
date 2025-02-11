import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 rounded-xl my-4 w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-gray-400">
        <p className="text-lg font-medium">No screenshots available</p>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="h-96 rounded-xl my-4 w-full bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative flex items-center group">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((imageUrl, index) => {
          const isCurrent = index === currentIndex;
          const isLeft = index === (currentIndex - 1 + images.length) % images.length;
          const isRight = index === (currentIndex + 1) % images.length;
          return (
            <div
              key={index}
              className={`relative h-full w-full flex-shrink-0 transition-all duration-700 ease-in-out
                ${isCurrent ? "z-10" : "z-0"}
                overflow-hidden rounded-xl`}
            >
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-in-out
                  ${isCurrent ? "scale-100" : "scale-90"}
                  ${isLeft || isRight ? "opacity-60" : isCurrent ? "opacity-100" : "opacity-40"}`}
              >
                <div className="relative ">
                  <img
                    src={imageUrl}
                    alt={`Project screenshot ${index + 1}`}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "/path-to-fallback-image.jpg";
                    }}
                    style={{
                      transform: isLeft
                        ? "translateX(10%)"
                        : isRight
                          ? "translateX(-10%)"
                          : "translateX(0)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 rounded-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-20 
              opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-20 
              opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}