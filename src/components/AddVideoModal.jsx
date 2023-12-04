/* eslint-disable no-useless-escape */
import React, { useState } from "react";

const AddVideoModal = ({ close, insertVideo }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoProvider, setVideoProvider] = useState("youtube");

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleProviderChange = (event) => {
    setVideoProvider(event.target.value);
  };

  const generateEmbedCode = () => {
    // Extract video ID from the YouTube URL
    const videoIdMatch = videoUrl.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|y\/)([^"&?\/\s]{11})/
    );

    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      // Generate YouTube embed code
      console.log(videoId);
      return `<iframe width="1280" height="720" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      return null;
    }
  };

  const handleEmbedClick = () => {
    const embedCode = generateEmbedCode();

    if (embedCode) {
      // Insert the video embed code into the editor
      insertVideo(embedCode);
      // Close the modal
      close();
    } else {
      // Handle invalid YouTube URL
      console.error("Invalid YouTube Video URL");
    }
  };

  return (
    <div>
      <div className="w-full">
        <div>
          <p className="uppercase text-gray-500 mb-1 mt-4 text-xs">
            Video Provider
          </p>
          <select
            value={videoProvider}
            onChange={handleProviderChange}
            className="py-3 px-2 w-full bg-[#FAFAFA] border-none outline-none"
          >
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div className="mt-7">
          <p className="uppercase text-gray-500 mb-1 mt-4 text-xs">URL</p>
          <input
            className="py-3 px-2 w-full bg-[#FAFAFA] border-none outline-none"
            type="text"
            value={videoUrl}
            onChange={handleInputChange}
            placeholder="Enter YouTube Video URL"
          />
        </div>
      </div>

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

export default AddVideoModal;
