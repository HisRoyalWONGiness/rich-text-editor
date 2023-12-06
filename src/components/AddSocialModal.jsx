import React, { useState } from "react";

const AddSocialModal = ({ insertSocialPost, close, editorRef }) => {
  // State to capture platform, URL, and code
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [inputValue, setInputValue] = useState("");
  const [iframeCode, setIframeCode] = useState("");

  // Function to handle platform change
  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const newInputValue = e.target.value;

    // Update the URL input
    setInputValue(newInputValue);

    const generateIframeCode = (url) => {
      // Customize this part based on the iframe code structure for different platforms
      const platformCode = `<div style="text-align: center;">
      <iframe src="${url}" width="500" height="100%" frameborder="0" allowfullscreen style="width: 100%;"></iframe>
    </div>;`;
      setIframeCode(platformCode);
    };

    // Update the iframe code based on the new URL input
    const isIframeCode = newInputValue.includes("<iframe");
    if (isIframeCode) {
      setIframeCode(newInputValue);
    } else {
      generateIframeCode(newInputValue);
    }
  };

  // Function to handle embed click
  const handleEmbedClick = () => {
    // Insert the social post in the editor
    insertSocialPost(iframeCode, editorRef);

    // Close the modal
    close();
  };

  return (
    <div>
      <div className="w-full">
        {/* Platform selection */}
        <div>
          <p className="uppercase text-gray-500 mb-1 mt-4 text-xs">
            Social media platform
          </p>
          <select
            value={selectedPlatform}
            onChange={handlePlatformChange}
            className="py-3 px-2 w-full bg-[#FAFAFA] border-none outline-none"
          >
            <option value="facebook">Facebook</option>
            {/* Add other social media platforms as needed */}
          </select>
        </div>

        {/* URL or iframe input */}
        <div className="mt-7">
          <p className="uppercase text-gray-500 mb-1 mt-4 text-xs">Input</p>
          <input
            className="py-3 px-2 w-full bg-[#FAFAFA] border-none outline-none"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter social media post URL or iframe code"
          />
        </div>

        {/* Code input (disabled) */}
        <div className="mt-7">
          <p className="uppercase text-gray-500 mb-1 mt-4 text-xs">Code</p>
          <input
            className="py-3 px-2 w-full text-gray-500 bg-[#FAFAFA] border-none outline-none"
            type="text"
            disabled={true}
            value={iframeCode}
          />
        </div>

        {/* Disable caption */}
        <div className="flex text-sm justify-between items-center mt-7 w-full">
          <p className="text-gray-500 text-xs">Disable caption</p>
          {/* Your checkbox input */}
        </div>
      </div>

      {/* Embed and Cancel buttons */}
      <div className="flex gap-5 mt-5 text-base">
        <button
          onClick={handleEmbedClick}
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

export default AddSocialModal;
