import { Box } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from "./LanguageSelector";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onSelect = (language) => {
    setLanguage(language);
  };


  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  return (
    <Box>
      <LanguageSelector language={language} onSelect={onSelect}></LanguageSelector>
      <Editor
        height="75vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        language={language}
        defaultValue="// some comment"
        value={value}
        onMount={onMount}
        onChange={(value) => setValue(value)}
      />

    </Box>
  )
}

export default CodeEditor;