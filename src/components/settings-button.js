import React from "react"
import { AiFillSetting } from "react-icons/ai";
import {Button} from "react-bootstrap";

export default function SettingsButton({fontButtonSize, handleShow}) {
    return(
        <Button aria-label="Settings" style={{fontSize: fontButtonSize}} onClick={handleShow}>
            <span aria-hidden={true}><AiFillSetting /> Settings</span>
        </Button>
    )
}