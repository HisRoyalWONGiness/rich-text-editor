import React, { useRef, useState } from "react";

const AddPictureModal = ({ close, insertImage }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <div>
      <h2 className="text-gray-500 text-base font-medium py-3">Upload Image</h2>
      <p className="text-gray-500 mb-1 text-xs">FILE UPLOAD</p>
      <div className="flex justify-center items-center w-full border-dashed border border-[#0A7227] h-[141px]">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={handleImageUpload}
          className="border border-[#6CAA7D] rounded-[4px] p-2"
        >
          Import Image from Device
        </button>
      </div>
      {uploadedImage && uploadedImage.name && (
        <p className="mt-1">Uploaded {uploadedImage.name}</p>
      )}
      <div className="flex gap-5 mt-5 text-base">
        <button
          onClick={() => {
            insertImage(uploadedImage);
            close();
          }}
          className="bg-[#0A7227] text-white h-[35px] w-[78px] font-medium rounded-[4px]"
        >
          Embed
        </button>
        <button
          onClick={close}
          className="border border-[#CEE3D4] h-[35px] w-[78px] font-medium rounded-[4px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPictureModal;
