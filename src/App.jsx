import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import CodeOutput from "./components/CodeOutput";
import { StompSessionProvider } from "react-stomp-hooks";

function App() {
  return (
    <StompSessionProvider url="http://localhost:8080/interview-ide-websocket">
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor></CodeEditor>
    </Box>
    </StompSessionProvider>
    
  );
}

export default App;
