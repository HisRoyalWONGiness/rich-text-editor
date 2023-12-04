import React, { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faListUl,
  faListOl,
  faPenFancy,
  faLink,
  faImage,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faPlus,
  faClose,
  faVideoCamera,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ReactQuill from "react-quill";
import {
  getWordCount,
  handleParagraphFormat,
  handleInsertLink,
  handleInsertImage,
  handleAlignLeft,
  handleAlignRight,
  handleAlignCenter,
  handleBulletedList,
  handleNumberedList,
  handleBold,
  handleItalic,
  handleDropCap,
} from "./components/utils";
import AddPictureModal from "./components/AddPictureModal";
import AddVideoModal from "./components/AddVideoModal";
import AddSocialModal from "./components/AddSocialModal";

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

  const handleWordCountLimit = () => {
    if (wordCount >= 1000) {
      alert("Word count limit reached (1000 words).");
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

  const insertImage = async (imageFile) => {
    const editor = editorRef.current && editorRef.current.getEditor();
    if (!editor || !editor.clipboard) {
      return;
    }

    const selection = editor.getSelection(true);

    if (!selection || selection.index === null) {
      return;
    }

    const cursorPosition = selection.index;

    // Convert the image to a data URL
    const imageBlob = await fetch(URL.createObjectURL(imageFile)).then((res) =>
      res.blob()
    );
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);

    reader.onloadend = () => {
      const imageDataUrl = reader.result;

      const updatedInsertDelta = {
        ops: [
          { insert: `<img src="${imageDataUrl}" alt="Inserted Image" />\n` },
        ],
      };

      console.log("DELTA", updatedInsertDelta);

      editor.clipboard.dangerouslyPasteHTML(
        cursorPosition,
        updatedInsertDelta.ops[0].insert
      );
      editor.setSelection(cursorPosition + 2, "silent");
      editor.focus();
    };
  };

  const insertVideo = (videoCode) => {
    console.log("IFRAME", videoCode);
    const editor = editorRef.current && editorRef.current.getEditor();
    console.log("EDITOR", editor);
    if (editor) {
      const cursorPosition = editor.getSelection(true).index || 0;

      const insertDelta = {
        ops: [
          {
            insert: videoCode,
          },
          { insert: "\n" },
        ],
      };

      editor.clipboard.dangerouslyPasteHTML(
        cursorPosition,
        insertDelta.ops[0].insert
      );
      editor.setSelection(cursorPosition + 2, "silent");
      editor.focus();
    }
  };

  return (
    <div className="h-screen text-gray-700 text-xs overflow-y-auto bg-[#FAFAFA] w-screen">
      <div className="sm:w-4/5 md:w-2/5 sm:mx-auto h-full mx-auto my-14">
        <div className="w-full border border-[#E7F1E9] rounded-[4px]">
          <div className="w-full mt-12 h-[1px]" />

          <div className="relative h-[813px] pb-[32px] px-[32px]">
            <div className=" mt-[24px] mb-[18px]">
              <input
                type="text"
                className="font-bold text-2xl placeholder:text-gray-700  bg-[#FAFAFA] w-full border-none outline-none focus:outline-none"
                placeholder="Add post title"
              />
            </div>
            <div className="flex w-max bg-white mb-6 text-sm border border-[#E7F1E9] rounded-[5px]">
              <select
                onChange={(e) =>
                  handleParagraphFormat(e.target.value, editorRef)
                }
                defaultValue=""
                className="px-2 py-1 border-r border-[#E7F1E9] bg-white"
              >
                <option value="" disabled>
                  Paragraph
                </option>
                <option value="with-indentation">With Indentation</option>
                <option value="no-indentation">No Indentation</option>
              </select>

              <div className="flex gap-x-5 p-4 border-x border-[#E7F1E9]">
                <button onClick={() => handleInsertLink(editorRef)}>
                  <FontAwesomeIcon icon={faLink} />
                </button>
                <button onClick={() => handleInsertImage(editorRef)}>
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>

              <div className="flex gap-x-5 p-4 border-x border-[#E7F1E9]">
                <button onClick={() => handleAlignLeft(editorRef)}>
                  <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button onClick={() => handleAlignRight(editorRef)}>
                  <FontAwesomeIcon icon={faAlignRight} />
                </button>
                <button onClick={() => handleAlignCenter(editorRef)}>
                  <FontAwesomeIcon icon={faAlignCenter} />
                </button>
              </div>

              <div className="flex gap-x-5 p-4 border-x border-[#E7F1E9]">
                <button onClick={() => handleBold(editorRef)}>
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button onClick={() => handleItalic(editorRef)}>
                  <FontAwesomeIcon icon={faItalic} />
                </button>
              </div>

              <div className="flex gap-x-5 p-4 border-x border-[#E7F1E9]">
                <button onClick={() => handleBulletedList(editorRef)}>
                  <FontAwesomeIcon icon={faListUl} />
                </button>
                <button onClick={() => handleNumberedList(editorRef)}>
                  <FontAwesomeIcon icon={faListOl} />
                </button>
                <button onClick={() => handleDropCap(editorRef)}>
                  <FontAwesomeIcon icon={faPenFancy} />
                </button>
              </div>
            </div>
            <ReactQuill
              ref={editorRef}
              theme="snow"
              style={{ height: "auto" }}
              value={editorHtml}
              onChange={handleChange}
              onBlur={handleWordCountLimit}
              modules={{
                toolbar: false,
              }}
              formats={["image", "video", "iframe"]}
              bounds={".editor-container"}
              readOnly={false}
            />
            {editorHtml.length === 0 && (
              <div className="absolute text-base pointer-events-none top-[125px] text-gray-400">
                Add content
              </div>
            )}
            {editorHtml && (
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
                        <div className="text-[10px]">
                          JW player, YouTube, Vimeo
                        </div>
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
            )}
            {isModalVisible && (
              <div className="fixed w-full h-full bg-white top-0 left-0">
                <div className="w-full h-full bg-black bg-opacity-25 flex items-center justify-center">
                  <div className="bg-white shadow-md w-[90%] md:w-[45%] max-w-[659px] max-h-[336px] h-auto p-4 rounded-md">
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
                      />
                    )}
                    {selectedModal === "video" && (
                      <AddVideoModal
                        insertVideo={insertVideo}
                        close={closeModal}
                      />
                    )}
                    {selectedModal === "social" && (
                      <AddSocialModal close={closeModal} />
                    )}
                    {/* Add similar blocks for other modals (Video, Social) */}
                  </div>
                </div>
              </div>
            )}
            <div
              className="absolute z-0 flex items-center justify-end bottom-0 right-0 pr-5 h-10 w-full bg-white"
              style={{ zIndex: -1 }}
            >
              {wordCount} / 1000 words
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
