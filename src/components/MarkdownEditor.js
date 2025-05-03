import React, { useState } from "react";

const MarkdownEditor = () => {
  const [inputText, setInputText] = useState("");

  // Simple function to convert markdown to HTML
  const parseMarkdown = (text) => {
    return text
      .replace(/^# (.*)/gm, "<h1>$1</h1>") // Headers (e.g. # Header)
      .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>") // Bold (e.g. **bold**)
      .replace(/\*(.*)\*/gm, "<em>$1</em>"); // Italic (e.g. *italic*)
  };

  return (
    <div className="app">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Write Markdown"
        rows="10"
        cols="50"
      />
      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(inputText) }} />
    </div>
  );
};

export default MarkdownEditor;
