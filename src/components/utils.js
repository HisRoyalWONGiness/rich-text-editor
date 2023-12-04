export const getWordCount = (text) => {
  const trimmedText = text.trim();

  const words = trimmedText.split(/\s+/);

  const nonEmptyWords = words.filter((word) => word.length > 0);

  return nonEmptyWords.length;
};

// Function to handle making text bold
export const handleBold = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("bold", !quill.getFormat().bold);
};

// Function to handle making text italic
export const handleItalic = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("italic", !quill.getFormat().italic);
};

// Function to handle bulleted list
export const handleBulletedList = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("list", "bullet");
};

// Function to handle numbered list
export const handleNumberedList = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("list", "ordered");
};

// Function to handle drop cap
export const handleDropCap = (editorRef) => {
  const quill = editorRef.current.getEditor();
  const contents = quill.getContents();
  const firstLine = contents.ops.find((op) => op.insert.includes("\n")).insert;

  // Find the first letter in the first line
  const match = firstLine.match(/[a-zA-Z]/);

  if (match) {
    const firstLetterIndex = firstLine.indexOf(match[0]);

    // Apply bold to the first letter
    quill.format("bold", true, firstLetterIndex, 1);
  }
};

// Function to handle inserting a link
export const handleInsertLink = (editorRef) => {
  console.log("CHECK HERE", editorRef);
  const quill = editorRef.current.getEditor();
  const url = prompt("Enter the URL:");

  if (url) {
    quill.format("link", url);
  }
};

// Function to handle inserting an image
export const handleInsertImage = (editorRef) => {
  const quill = editorRef.current.getEditor();
  const url = prompt("Enter the URL of the image:");

  if (url) {
    quill.insertEmbed(quill.getSelection(), "image", url);
  }
};

// Function to handle align left
export const handleAlignLeft = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("align", "left");
};

// Function to handle align right
export const handleAlignRight = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("align", "right");
};

// Function to handle align center
export const handleAlignCenter = (editorRef) => {
  const quill = editorRef.current.getEditor();
  quill.format("align", "center");
};

// Function to handle changing paragraph format
export const handleParagraphFormat = (format, editorRef) => {
  const quill = editorRef.current.getEditor();
  const range = quill.getSelection();

  if (format === "with-indentation") {
    quill.format("indent", true);
  } else if (format === "no-indentation") {
    quill.format("indent", false);
  }

  quill.format("align", "left"); // Set default alignment for the new paragraph

  // Insert a new paragraph at the current position
  quill.insertText(range.index + 1, "\n", "user");
};
