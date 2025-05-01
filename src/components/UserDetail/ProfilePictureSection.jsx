/* eslint-disable react/prop-types */
import { FaAsterisk } from "react-icons/fa6";
import { IoCloudUpload } from "react-icons/io5";
import Button from "../Common/Button";

const ProfilePictureSection = ({
  imageSrc,
  fileInputRef,
  handleButtonClick,
  handleImageUpload
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-center md:items-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          className="h-20 w-20 md:h-32 md:w-32 object-cover rounded-full"
        />
      )}
      <div className="flex flex-col justify-center items-center md:items-start md:ml-8">
        <h2 className="flex gap-2 text-base md:text-lg text-white">
          UPLOAD PHOTO{" "}
          <span className="text-red-700 text-xs">
            <FaAsterisk />
          </span>
        </h2>
        <Button
          type="button"
          rounded="md"
          width="full"
          onClick={handleButtonClick}
          className="w-full md:w-auto"
        >
          <span className="flex gap-2 items-center">
            <IoCloudUpload className="h-5 w-5 md:h-6 md:w-6" />
            <p>Upload File</p>
          </span>
        </Button>

        <input
          type="file"
          required
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ProfilePictureSection;
