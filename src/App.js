import React, { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ReactQuill from "react-quill";
import {
  getWordCount,
  formats,
  handleWordCountLimit,
} from "./components/utils";
import CustomToolBar from "./components/CustomToolBar";
import AddMenu from "./components/AddMenu";
import Modals from "./components/Modals";

const App = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const editorRef = useRef();

  const wordCount = getWordCount(editorHtml);

  const handleChange = (html) => {
    if (getWordCount(html) <= 1000) {
      setEditorHtml(html);
    }
  };

  const openModal = (modalType) => {
    setSelectedModal(modalType);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedModal(null);
    setIsModalVisible(false);
  };

  return (
    <div className="text-gray-700 text-xs overflow-y-auto bg-[#FAFAFA]">
      <div className="sm:w-4/5 md:w-3/5 sm:mx-auto h-full mx-auto my-14">
        <div className="w-full border border-[#E7F1E9] rounded-[4px]">
          <div className="w-full mt-12 h-[1px]" />

          <div className="relative h-[713px] pb-[32px] px-[32px]">
            <div className=" mt-[24px] mb-[18px]">
              <input
                type="text"
                className="font-bold text-2xl placeholder:text-gray-700  bg-[#FAFAFA] w-full border-none outline-none focus:outline-none"
                placeholder="Add post title"
              />
            </div>
            <CustomToolBar editorRef={editorRef} />
            <ReactQuill
              ref={editorRef}
              theme="snow"
              style={{
                height: "auto",
                width: "100%",
                maxHeight: "600px",
                overflow: "auto",
                paddingBottom: "50px",
              }}
              value={editorHtml}
              onChange={handleChange}
              onBlur={() => handleWordCountLimit(wordCount)}
              modules={{
                toolbar: false,
              }}
              formats={formats}
              bounds={".editor-container"}
              readOnly={false}
            />
            {editorHtml.length === 0 && (
              <div className="absolute text-base pointer-events-none top-[125px] text-gray-400">
                Add content
              </div>
            )}
            {editorHtml && (
              <AddMenu
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                openModal={openModal}
              />
            )}
            {isModalVisible && (
              <Modals
                closeModal={closeModal}
                selectedModal={selectedModal}
                editorRef={editorRef}
              />
            )}
            <div
              className={`absolute ${
                isModalVisible ? "z-[-1]" : "z-1"
              } -bottom-7 right-0 h-10 w-full`}
            >
              <div className="bg-white px-[32px] h-full flex w-full items-center justify-end">
                {wordCount} / 1000 words
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-end pr-5 w-full mt-10">
          <button className="bg-[#0A7227] text-white h-[35px] w-[62px] font-semibold rounded-[4px]">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
