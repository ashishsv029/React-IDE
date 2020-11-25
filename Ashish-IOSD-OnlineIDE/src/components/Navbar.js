import React,{useReducer, useState,useEffect} from "react"
import {Container,Row,Col,Button, Input} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { FaAlignJustify, FaCheck, FaChevronRight, FaDollarSign, FaExclamation, FaExclamationCircle, FaEye, FaEyeSlash, FaFacebook, FaFacebookMessenger, FaHamburger, FaHandPaper, FaHandshake, FaHandsHelping, FaInstagram, FaInstagramSquare, FaLock, FaPlayCircle, FaPlus, FaRecycle, FaRegHandshake, FaSlack, FaThumbsUp } from "react-icons/fa"
const Navbar=()=>{
    return(
        <div className="navbar" style={{backgroundColor:"black",height:"4rem"}}>
                <h2 className="heading lead" style={{fontSize:"2rem",color:"white"}}>Ashish Online <span style={{color:"gold"}}>IDE</span></h2>
                <FaAlignJustify style={{float:"right",color:"white",fontSize:"1.3rem"}}/>

        </div>
    )
}

export default Navbar