import React, { useState, useEffect } from 'react';

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState('# Heading');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const parsedHtml = parseMarkdown(markdownText);
    setHtmlOutput(parsedHtml);
    setLoading(false);
  }, [markdownText]);

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const parseMarkdown = (markdown) => {
    if (!markdown) return '';

    let html = markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\n/g, '<br />');

    html = html.replace(/<li>.*?<\/li>/g, function(match) {
      return '<ul>' + match + '</ul>';
    });

    html = html.replace(/<\/ul><ul>/g, '');

    return html;
  };

  return (
    <div className="app flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Markdown Editor</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 border-r border-gray-300">
          <div className=" mb-2 font-semibold text-gray-700">Editor</div>
          <textarea
            className="textarea markdown-input w-full h-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={markdownText}
            onChange={handleInputChange}
            placeholder="Write your markdown here..."
          />
        </div>

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

      <footer className="bg-gray-100 p-2 text-center text-sm text-gray-600">
        React Markdown Editor - Live Preview
      </footer>
    </div>
  );
};

export default MarkdownEditor;
