// import React from "react";
import preloader from "../../assets/preloader.gif";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="mb-4">
          <img src={preloader} alt="Preloader" className="w-64 h-64 mx-auto" />
        </div>
    </div>
  );
};

export default Preloader;
