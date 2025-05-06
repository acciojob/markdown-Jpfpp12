import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked'; 
import "./styles/App.css";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('Heading');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const parsedHtml = marked(markdownText); // Use marked to parse markdown to HTML
    const safeHtml = DOMPurify.sanitize(parsedHtml); // Sanitize the HTML
    setHtmlOutput(safeHtml);
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
        {/* Editor Section */}
        <div className="w-1/2 p-4 border-r border-gray-300">
          <div className="mb-2 font-semibold text-gray-700">Editor</div>
          <textarea
            className="textarea markdown-input w-full h-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={markdownText}
            onChange={handleInputChange}
            placeholder="Write your markdown here..."
          />
        </div>

        {/* Preview Section */}
        <div className="w-1/2 p-4">
          <div className="mb-2 font-semibold text-gray-700">Preview</div>
          <div
            className="preview h-full p-4 border border-gray-300 rounded overflow-auto"
          >
            {loading ? (
              <div className="loading text-center text-gray-500">Loading...</div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 p-2 text-center text-sm text-gray-600">
        React Markdown Editor - Live Preview
      </footer>
    </div>
  );
};

export default MarkdownEditor;
