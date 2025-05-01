import { useContext } from "react";
import { Upload, Plus } from "lucide-react";
import { TeamProjectContext } from "../../../pages/AddTeamProject";

const MediaUploadStep = () => {
  const {
    thumbnailPreview,
    screenshotPreviews,
    thumbnailRef,
    screenshotsRef,
    handleThumbnailChange,
    handleScreenshotsChange
  } = useContext(TeamProjectContext);

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-4">
          Thumbnail <span className="text-yellow-400"> {"( Maximum Size 4mb. Jpg, jpeg, png )"}</span>
        </label>
        <div
          onClick={() => thumbnailRef.current?.click()}
          className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brandPrimary transition-colors"
        >
          {thumbnailPreview ? (
            <img src={thumbnailPreview} alt="Thumbnail" className="max-h-48 mx-auto rounded-lg" />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-400">Click to upload thumbnail</p>
            </div>
          )}
          <input
            type="file"
            ref={thumbnailRef}
            onChange={handleThumbnailChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-4">
          Screenshots&nbsp; <span className="text-yellow-400"> {"( you Can only Upload 5 Screenshots. Jpg, jpeg, png )"}</span>
        </label>

        <div
          onClick={() => screenshotsRef.current?.click()}
          className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brandPrimary transition-colors"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {screenshotPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Screenshot ${index + 1}`} className="rounded-lg" />
            ))}
            <div className="flex flex-col items-center justify-center min-h-[100px] bg-gray-800/50 rounded-lg">
              <Plus className="w-8 h-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-400">Add more</p>
            </div>
          </div>
          <input
            type="file"
            ref={screenshotsRef}
            onChange={handleScreenshotsChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaUploadStep;
