import { Box, Button } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import { executeCode } from '../api';
import CodeOutput from './CodeOutput';


const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [codeOutput, setCodeOutput] = useState();

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };


  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };

  const onClick = async () => {
    setCodeOutput()
    const responseData = await executeCode(language, value);
    setCodeOutput(responseData.run);
  }

  return (
    <>
      <Box>
        <LanguageSelector language={language} onSelect={onSelect}></LanguageSelector>
        <Editor
          height="75vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          value={value}
          onMount={onMount}
          onChange={(value) => setValue(value)}
        />
        <Button onClick={onClick}>Run Code</Button>
      </Box>
      <Box>
        <CodeOutput codeOutput={codeOutput}></CodeOutput>
      </Box>
    </>

  )
}

export default CodeEditor;