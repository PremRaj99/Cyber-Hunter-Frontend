import React, { useEffect, useState } from "react";
import image from "../../assets/DemoProject.png";

export default function ImageSlider() {
  const images = [image, image, image, image, image, image];
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the second image as the middle one

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
          transform: `translateX(-${
            (currentIndex - 1) * (100 / 3)
          }%)`, // Adjust for 3 images
          width: `${images.length * (100 / 3)}%`, // Total width adjusted for 3 images visible
        }}
      >
        {images.map((image, index) => {
          const isCurrent = index === currentIndex;
          const isLeft = index === (currentIndex - 1 + images.length) % images.length;
          const isRight = index === (currentIndex + 1) % images.length;

          return (
            <div
              key={index}
              className={`h-full flex-shrink-0 w-[33.33%] transition-transform duration-500 ${
                isCurrent ? "scale-110 z-10" : "scale-90"
              } ${isLeft || isRight ? "opacity-75" : "opacity-50"}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: isLeft
                  ? "translateX(25%)"
                  : isRight
                  ? "translateX(-25%)"
                  : "translateX(0)",
              }}
            />
          );
        })}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
      >
        &#8592;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
      >
        &#8594;
      </button>
    </div>
  );
}
