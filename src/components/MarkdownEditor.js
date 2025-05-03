import React, { useState } from "react";
const MarkdownEditor = () => {
  const [inputText, setInputText] = useState("");

  const parseMarkdown = (text) => {
    text = text.replace(/\n/g, "<br/>");
    text = text.replace(/^### (.*)/gm, "<h3>$1</h3>");
    text = text.replace(/^## (.*)/gm, "<h2>$1</h2>");
    text = text.replace(/^# (.*)/gm, "<h1>$1</h1>");
    text = text.replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>");
    text = text.replace(/\*(.*)\*/gm, "<em>$1</em>");
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" target="_blank">$1</a>');
    text = text.replace(/^\- (.*)/gm, "<ul><li>$1</li></ul>");
    text = text.replace(/<\/ul>\n<ul>/g, "");
    return text;
  };

  return (
    <div className="app">
      <h1>Markdown Editor</h1>
      <div className="text-area">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write your Markdown here"
        />
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(inputText) }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
