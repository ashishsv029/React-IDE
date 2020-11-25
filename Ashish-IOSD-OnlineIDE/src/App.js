import React,{useReducer, useState,useEffect,useRef} from "react"
import {Container,Row,Col,Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge, ButtonDropdown} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import FormData from "form-data"
import axios from "axios"
import Editor from "@monaco-editor/react";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import Navbar from "./components/Navbar"
import Editorc from "./Editorc"

const App=()=>{  
    axios.defaults.baseURL='https://ide.geeksforgeeks.org'
    //axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
    const [code,setCode]=useState("")
    const [output,setOutput]=useState("")
    const [input,setInput]=useState("")
    //const textArea=useRef()
    const [lang,setLang]=useState("Cpp")
    const [clickedrun,setclickedrun]=useState(false)
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [pythoncode,setPythoncode]=useState(`print("Type your code here")`)
    const [cppcode,setCppcode]=useState(`#include<iostream>\nusing namespace std;\n int main(){\n}`)
    const valueGetter = useRef();
    
    const [memory,setMemory]=useState('0.0')
    const [time,setTime]=useState('0.0')
    const handleEditorDidMount=(_valueGetter)=>{
        setIsEditorReady(true);
        valueGetter.current = _valueGetter;
    }
    
    const handleShowValue= async ()=>{
        await setCode(valueGetter.current())
        getdetails()
        
    }

    const getdetails=()=>{
        //setCode(valueGetter.current())
        setOutput("")
        setclickedrun(true)
        console.log("code=",valueGetter.current(),typeof(valueGetter.current()))        
        const code1="#include<iostream>\nusing namespace std;\nint main()\n{ \n    int a,b;\n    cin>>a>>b;\n    cout<<\"output is=\"<<a+b;\n}"
        console.log("code1 is=",code1,typeof(code1))
        var data = new FormData();
        data.append('lang', lang); 
        data.append('code', valueGetter.current());
        data.append('input', input);
        data.append('save', 'true');
        var config = {
          method: 'post',
          url: '/main.php',
          headers: { 
             'content-type':'multipart/form-data',
             'Access-Control-Allow-Origin':'*',
             'crossorigin':true
          },
          mode : 'no-cors',
          data : data,
        };
        
        var sid;
        axios(config)
        .then((response)=>{
          console.log(JSON.stringify(response.data));
          sid=response.data.sid
          console.log(sid)
        })
        .then(()=>{
            var data1 = new FormData();
            console.log("sid is=",typeof(sid))
            data1.append('sid', sid);
            data1.append('requestType', 'fetchResults');
            var config1 = {
                method: 'post',
                url: '/submissionResult.php',
                headers: { 
                    'content-type':'multipart/form-data',
                    'Access-Control-Allow-Origin':'*',
                    'crossorigin':true

                },
                mode : 'no-cors',
                data : data1
            };
            
            axios(config1)
            .then((response)=> {
                axios(config1)
                .then((response)=>{
                    console.log("Final2 JSON is=",JSON.stringify(response.data));
                    const op=response.data.output
                    const cmpError=response.data.cmpError
                    const rntError=response.data.rntError
                    const t=response.data.time
                    const m=response.data.memory
                    //console.log(op)
                    setTime(t)
                    setMemory(m)
                    setclickedrun(false)
                    if(op!=undefined)
                    {
                        console.log("OUTPUT:-",op)

                        setOutput(op)
                        
                    }
                    if(cmpError!=undefined)
                    {
                        console.log("c-ERRORS:-",cmpError)
                        setOutput(cmpError)
                    }
                    
                    if(rntError!=undefined)
                    {
                        console.log("r-ERRORS:-",cmpError)
                        setOutput(rntError)
                    }
                    else if(response.data.status=="IN-QUEUE")
                    {
                        console.log("response queued")
                        setOutput("response queued,try after sometime...")
                    }
                })
                .catch((error)=> {
                    console.log(error,"error in 2nd submission call");
                })
                
            })
            .catch((error)=> {
                console.log(error,"error in 1st submission call");
            });
        }

        )
        .catch(function (error) {
          console.log(error,"error in call to main.php");
        });
        
    }

    const [dropdownOpen,setDropdownOpen]=useState(false)
    const toggle=()=>setDropdownOpen(prevState=>!prevState);
    const [pythonlang,setPythonlang]=useState(false)
    const [cpplang,setCpplang]=useState(true)
    return (        
        
        <div style={{height:"200vh",backgroundColor:"#dfe7eb"}}>
                <Navbar/>
                <Container fluid >
                    <Row>

                        <Col md="7" >
                        <div style={{width:"90%",margin:"auto",marginTop:"1rem"}}>
                        <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle} style={{float:"left",marginBottom:"1rem"}}>
                            <DropdownToggle caret>
                                Language
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={()=>{setLang("Cpp");setCpplang(true);setPythonlang(false);setPythoncode(valueGetter.current())}}>C++</DropdownItem>
                                <DropdownItem onClick={()=>{setLang("Python");setPythonlang(true);setCpplang(false);setCppcode(valueGetter.current())}}>Python</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Badge style={{float:"left",marginLeft:"1rem",height:"1.5rem",width:"3.6rem",marginTop:"0.2rem"}} color="warning" pill>{lang}</Badge>
                        </div>
                        {/*<Input  style={{fontSize:"1.1rem",height:"35rem",width:"90%",margin:"auto",marginTop:"3rem",backgroundColor:"black",color:"white",borderRadius:"20px"}} type='textarea' name='code' id='code' placeholder={`write your ${lang} code here...`} value={code} onChange={e => setCode(e.target.value)}/>*/}
                        
                        {pythonlang?(<Editor editorDidMount={handleEditorDidMount} height="70vh" language="python" theme="dark" value={pythoncode}/>):
                                         ("")}
                        {cpplang?(<Editor editorDidMount={handleEditorDidMount} height="70vh" language="cpp" theme="dark" value={cppcode} />):
                                         ("")}
                        {/*<Button onClick={handleShowValue} disabled={!isEditorReady}>Compile </Button>*/}
                        <Button  onClick={getdetails} style={{width:"8rem",height:"3rem",marginTop:"2rem",color:"black",backgroundColor:"gold",fontSize:"1.4rem",borderRadius:"10px"}}>Run Code</Button>
                        {clickedrun?(<h5 style={{fontSize:"1.5rem",float:"right"}}>Running...</h5>):("")}
                        </Col>
                        
                        <Col md="5" >
                        
                        <Input  style={{height:"15rem",margin:"auto",marginTop:"3.8rem",backgroundColor:"black",color:"white"}} type='textarea' name='code' id='code' placeholder='Input your values in new lines..' value={input} onChange={e => setInput(e.target.value)}/>
                        <div style={{width:"100%"}}>
                            <h4 >Memory(MB):-<span>{memory}</span></h4>
                            <h4 >Time taken(sec):-<span>{time}</span></h4>
                        </div>
                        <Input  style={{height:"20rem",margin:"auto",marginTop:"0.8rem",backgroundColor:"black",color:"white"}} type='textarea' name='code' id='code' placeholder='output shown here' value={output}/>
                        </Col>
     
                    </Row>
                </Container>
        </div>
        
        

    )
}

export default App