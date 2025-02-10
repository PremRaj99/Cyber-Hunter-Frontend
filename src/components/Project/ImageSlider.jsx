import React, { useEffect, useState } from "react";

export default function ImageSlider({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Return early if no images
  if (!images || images.length === 0) {
    return (
      <div className="h-96 rounded-md my-4 w-full bg-gray-900 flex items-center justify-center text-gray-400">
        No screenshots available
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
    <div className="h-96 rounded-md my-4 w-full bg-gray-900 overflow-hidden relative flex items-center">
      <div
        className="flex h-full transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentIndex - 1) * (100 / 3)
            }%)`,
          width: `${images.length * (100 / 3)}%`,
        }}
      >
        {images.map((imageUrl, index) => {
          const isCurrent = index === currentIndex;
          const isLeft = index === (currentIndex - 1 + images.length) % images.length;
          const isRight = index === (currentIndex + 1) % images.length;

          return (
            <div
              key={index}
              className={`h-full flex-shrink-0 w-[33.33%] transition-transform duration-500 ${isCurrent ? "scale-110 z-10" : "scale-90"
                } ${isLeft || isRight ? "opacity-75" : "opacity-50"}`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: isLeft
                  ? "translateX(25%)"
                  : isRight
                    ? "translateX(-25%)"
                    : "translateX(0)",
              }}
            >
              {/* Add error handling for images */}
              <img
                src={imageUrl}
                alt={`Project screenshot ${index + 1}`}
                className="hidden"
                onError={(e) => {
                  e.target.parentElement.style.backgroundImage = 'url("/path-to-fallback-image.jpg")';
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Only show navigation buttons if there are multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full shadow-lg z-20 hover:bg-cyan-600 transition-colors"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-500 text-white p-2 rounded-full shadow-lg z-20 hover:bg-cyan-600 transition-colors"
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
}