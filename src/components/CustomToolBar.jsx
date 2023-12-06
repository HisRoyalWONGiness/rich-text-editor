import React from "react";
import {
  handleAlignCenter,
  handleAlignLeft,
  handleAlignRight,
  handleBold,
  handleBulletedList,
  handleDropCap,
  handleInsertImage,
  handleInsertLink,
  handleItalic,
  handleNumberedList,
  handleParagraphFormat,
} from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faImage,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";

const CustomToolBar = ({ editorRef }) => {
  return (
    <div className="flex w-max bg-white mb-6 text-sm border border-[#E7F1E9] rounded-[5px]">
      <select
        onChange={(e) => handleParagraphFormat(e.target.value, editorRef)}
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
  );
};

export default CustomToolBar;
