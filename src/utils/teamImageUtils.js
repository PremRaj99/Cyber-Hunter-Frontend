import { toast } from "react-toastify";

export const handleImageOperations = (
  setImageFile,
  setImagePreview,
  setFormData,
  formData
) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB max
        toast.error("Image size should be less than 2MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageEnter = () => {
    setFormData({ ...formData, isHoveringImage: true });
  };

  const handleImageLeave = () => {
    setFormData({ ...formData, isHoveringImage: false });
  };

  const removeImage = () => {
    setFormData({ ...formData, teamImage: null });
    setImageFile(null);
    setImagePreview(null);
  };

  return {
    handleImageChange,
    handleImageEnter,
    handleImageLeave,
    removeImage,
  };
};
