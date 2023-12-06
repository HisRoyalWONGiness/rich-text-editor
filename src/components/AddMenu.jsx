import {
  faImage,
  faPlus,
  faShare,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AddMenu = ({ setShowMenu, showMenu, openModal }) => {
  return (
    <div>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="flex justify-center cursor-pointer items-center rounded-full mt-10 w-8 h-8 bg-[#E7F1E9]"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {showMenu && (
        <div className="flex flex-col gap-2 shadow bg-white w-[277px] mt-2 rounded-[3px]">
          <p className="uppercase pt-3 px-3">Embeds</p>
          <div
            onClick={() => openModal("picture")}
            className="flex gap-4 px-3 py-2 cursor-pointer hover:bg-[#F7FCF8] transition-all duration-300"
          >
            <div className="text-sm">
              <FontAwesomeIcon icon={faImage} />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm p-0 font-bold">Picture</div>
              <div className="text-[10px]">Jpeg, png</div>
            </div>
          </div>
          <div
            onClick={() => openModal("video")}
            className="flex gap-4 px-3 py-2 cursor-pointer hover:bg-[#F7FCF8] transition-all duration-300"
          >
            <div className="text-sm">
              <FontAwesomeIcon icon={faVideoCamera} />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm p-0 font-bold">Video</div>
              <div className="text-[10px]">JW player, YouTube, Vimeo</div>
            </div>
          </div>
          <div
            onClick={() => openModal("social")}
            className="flex gap-4 px-3 py-2 cursor-pointer hover:bg-[#F7FCF8] transition-all duration-300"
          >
            <div className="text-sm">
              <FontAwesomeIcon icon={faShare} />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm p-0 font-bold">Social</div>
              <div className="text-[10px]">
                Instagram, Twitter, TikTok, Snapchat, Facebook
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMenu;
