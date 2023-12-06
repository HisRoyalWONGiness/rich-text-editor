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

export const insertImage = async (imageFile, editorRef) => {
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
        {
          insert: `<img style="display: block; margin: auto; max-width: 100%;" src="${imageDataUrl}" alt="Inserted Image" />\n`,
        },
      ],
    };

    editor.clipboard.dangerouslyPasteHTML(
      cursorPosition,
      updatedInsertDelta.ops[0].insert
    );

    editor.clipboard.dangerouslyPasteHTML(cursorPosition + 1, "\n");

    editor.setSelection(cursorPosition + 2, "silent");
    editor.focus();
  };
};

export const insertVideo = (videoCode, editorRef) => {
  const editor = editorRef.current && editorRef.current.getEditor();
  if (editor) {
    const cursorPosition = editor.getSelection(true).index || 0;

    const videoHtml = `<div class="ql-video">${videoCode}</div>\n`;

    const insertDelta = {
      ops: [
        {
          insert: videoHtml,
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

export const insertSocialPost = (socialPostCode, editorRef) => {
  const editor = editorRef.current && editorRef.current.getEditor();
  if (editor) {
    const cursorPosition = editor.getSelection(true).index || 0;

    const insertDelta = {
      ops: [{ insert: socialPostCode }, { insert: "\n" }],
    };

    editor.clipboard.dangerouslyPasteHTML(
      cursorPosition,
      insertDelta.ops[0].insert
    );
    editor.setSelection(cursorPosition + 2, "silent");
    editor.focus();
  }
};

export const handleWordCountLimit = (wordCount) => {
  if (wordCount >= 1000) {
    alert("Word count limit reached (1000 words).");
  }
};

export const formats = [
  "header",
  "link",
  "image",
  "align",
  "bold",
  "italic",
  "list",
  "bullet",
  "indent",
  "video",
  "iframe",
];
