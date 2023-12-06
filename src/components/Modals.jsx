import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AddPictureModal from "./AddPictureModal";
import { insertImage, insertSocialPost, insertVideo } from "./utils";
import AddVideoModal from "./AddVideoModal";
import AddSocialModal from "./AddSocialModal";

const Modals = ({ closeModal, selectedModal, editorRef }) => {
  return (
    <div className="fixed w-full h-full bg-white top-0 left-0">
      <div className="w-full h-full bg-black bg-opacity-25 flex items-center justify-center">
        <div className="bg-white shadow-md w-[90%] md:w-[45%] max-w-[659px] max-h-[636px] h-auto p-4 rounded-md">
          <div className="flex justify-between w-full">
            <div className="text-base font-bold">Embed</div>
            <button className="text-base" onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          {selectedModal === "picture" && (
            <AddPictureModal
              close={closeModal}
              insertImage={insertImage}
              editorRef={editorRef}
            />
          )}
          {selectedModal === "video" && (
            <AddVideoModal
              insertVideo={insertVideo}
              close={closeModal}
              editorRef={editorRef}
            />
          )}
          {selectedModal === "social" && (
            <AddSocialModal
              insertSocialPost={insertSocialPost}
              close={closeModal}
              editorRef={editorRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modals;
