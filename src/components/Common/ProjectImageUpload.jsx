import  { useState, useRef } from "react";
import { IoCloudUpload } from "react-icons/io5";// Ensure you have this icon package installed
import leaduserdemo from "../../assets/leaduserdemo.png"



function ImageUploader() {
  const [imageSrc, setImageSrc] = useState(leaduserdemo);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex  flex-col md:flex-row-reverse justify-evenly items-start w-96">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="h-24 w-24 md:h-32 md:w-32 object-cover "
        />
      )}
      <div className="flex flex-col justify-center mt-4 md:mt-0 md:m-8 items-center md:items-start">
        <button
          className="bg-[#5CE1E6] text-black hover:bg-transparent hover:border-[#5CE1E6] hover:text-[#5CE1E6] hover:border font-bold rounded-md flex justify-evenly items-center px-4 py-1 mt-2 transition duration-500"
          onClick={handleButtonClick}
        >
          <IoCloudUpload className="h-6 w-6 m-1 " />
          Click Here
        </button>
        <input
          type="file"
          required
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
        <ul className="w-full mt-6 list-disc">
          <li className="mt-1 text-xs text-red-500">
            Do not upload the image more than 2mb
          </li>
          <li className="mt-1 text-xs text-red-500">
            only Jpg,png,jpeg supported
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ImageUploader;
