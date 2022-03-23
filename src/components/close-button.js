import React from "react"
import { FaWindowClose } from "react-icons/fa";
import {Button} from "react-bootstrap";

export default function CloseButton({handleClose}) {
    return(
        <Button onClick={handleClose}>
            <FaWindowClose aria-hidden={true} /> Close
        </Button>
    )
}