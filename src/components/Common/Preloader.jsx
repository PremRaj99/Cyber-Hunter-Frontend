// import React from "react";
import preloader from "../../assets/preloader.gif";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-white text-center">
        <div className="mb-4">
          <img src={preloader} alt="Preloader" className="w-64 h-64 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Loading...</h2>
        <p className="text-sm opacity-75">
          Please wait while we prepare something amazing for you!
        </p>
      </div>
    </div>
  );
};

export default Preloader;
