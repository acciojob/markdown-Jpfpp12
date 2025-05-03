<p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>
import React from "react";
import MarkdownEditor from "./MarkdownEditor.js";
function App() {
  return (
    <div className="app-container">
      <h1 className="title">Markdown Editor</h1>
      <MarkdownEditor />
    </div>
  );
}

export default App;
