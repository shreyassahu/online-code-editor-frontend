import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import CodeOutput from "./components/CodeOutput";

function App() {
  return (
    <>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor></CodeEditor>
      </Box>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeOutput></CodeOutput>
      </Box>
    </>
  );
}

export default App;
