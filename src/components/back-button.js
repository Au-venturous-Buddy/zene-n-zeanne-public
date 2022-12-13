import React from "react"
import {Button} from "react-bootstrap";
import {IoCaretBack} from "react-icons/io5";
import ResponsiveSize from "../hooks/responsive-size";

export default function BackButton({handleClose}) {
    return(
        <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} aria-label="Close" onClick={handleClose}>
            <span aria-hidden={true}><IoCaretBack aria-hidden={true} /> Back</span>
        </Button>
    )
}