import React, { useState ,useRef} from "react";
import ReactDOM from "react-dom";
 
import Editor from "@monaco-editor/react";
import { Col, Row } from "reactstrap";

 
const Editorc=({code,setCode})=>{
  
  function toggleTheme() {
    console.log(code)
  }
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();
 
  const handleEditorDidMount=(_valueGetter)=>{
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }
 
  const handleShowValue=()=>{
    setCode(valueGetter.current())
  }
 
  return (
    <>      
      <button onClick={handleShowValue} disabled={!isEditorReady}>
        Show value
      </button>
    
      <Editor editorDidMount={handleEditorDidMount} height="90vh" language="cpp" theme="dark" />;
    
    </>
  );
}

export default Editorc