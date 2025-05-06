import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('# Heading');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const parsedHtml = marked(markdownText); 
    const safeHtml = DOMPurify.sanitize(parsedHtml); 
    setHtmlOutput(safeHtml); // Set sanitized HTML output
    setLoading(false);
  }, [markdownText]);

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  return (
    <div className="app flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Markdown Editor</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 border-r border-gray-300">
          <div className="mb-2 font-semibold text-gray-700">Editor</div>
          <textarea
            className="textarea markdown-input w-full h-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={markdownText}
            onChange={handleInputChange}
            placeholder="Write your markdown here..."
          />
        </div>

        <div className="w-1/2 p-4">
          <div className="mb-2 font-semibold text-gray-700">Preview</div>
          {loading ? (
            <div className="loading text-center text-gray-500">Loading...</div>
          ) : (
            <h1 className="preview h-full p-4 border border-gray-300 rounded overflow-auto">
              {htmlOutput}
            </h1>
          )}
        </div>
      </div>

      <footer className="bg-gray-100 p-2 text-center text-sm text-gray-600">
        React Markdown Editor - Live Preview
      </footer>
    </div>
  );
};

export default MarkdownEditor;
