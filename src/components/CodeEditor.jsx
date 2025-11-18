import { Box, Button, HStack } from '@chakra-ui/react'
import React, { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import { executeCode } from '../api';
import CodeOutput from './CodeOutput';
import { useStompClient, useSubscription } from 'react-stomp-hooks';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [codeOutput, setCodeOutput] = useState();
  const stompClient = useStompClient();
  
  // Generate unique ID for this client
  const [clientId] = useState(() => Math.random().toString(36).substring(7));
  
  // Track if change is from remote to prevent loops
  const isRemoteChange = useRef(false);
  
  const publishMessage = (newValue) => {
    if (stompClient && !isRemoteChange.current) {
      // Send as JSON with clientId
      const message = JSON.stringify({
        code: newValue,
        clientId: clientId,
        timestamp: Date.now()
      });
      stompClient.publish({
        destination: '/app/broadcast', 
        body: message
      });
    }
  };
  
  // Subscribe and handle incoming messages
  useSubscription('/room/code', (message) => {
    try {
      const data = JSON.parse(message.body);
      
      // Only apply changes from OTHER clients
      if (data.clientId !== clientId) {
        isRemoteChange.current = true;
        setValue(data.code);
        // Reset flag after a short delay
        setTimeout(() => {
          isRemoteChange.current = false;
        }, 100);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });
  
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
  };
  
  const handleChange = (newValue) => {
    if (newValue !== undefined) {
      setValue(newValue);
      publishMessage(newValue);
    }
  };
  
  const onClick = async () => {
    setCodeOutput();
    const responseData = await executeCode(language, value);
    setCodeOutput(responseData.run);
  };
  
  return (
    <>
      <Box>
        <HStack spacing={4}>
          <Box w='50%'>
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              height="75vh"
              theme="vs-dark"
              language={language}
              value={value}
              onMount={onMount}
              onChange={handleChange}
            />
            <Button onClick={onClick} colorScheme="green" mt={4}>
              Run Code
            </Button>
          </Box>
          <CodeOutput editorRef={editorRef} language={language} output={codeOutput} />
        </HStack>
      </Box>
    </>
  );
};

export default CodeEditor;