import React, { useState, useEffect } from "react";
import { marked } from "marked";

function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");

  useEffect(() => {
    setHtmlPreview(marked.parse(markdownText));
  }, [markdownText]);

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="markdown-input"
        placeholder="Enter Markdown here..."
        value={markdownText}
        onChange={handleInputChange}
      />
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: htmlPreview }}
      />
    </div>
  );
}

export default MarkdownEditor;
