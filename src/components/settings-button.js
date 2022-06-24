import React from "react"
import { AiFillSetting } from "react-icons/ai";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

const helpTooltip = (message, props) => (
    <Tooltip {...props}>
      {message}
    </Tooltip>
  );

export default function SettingsButton({fontButtonSize, handleShow}) {
    return(
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Settings")}
        >
        <Button aria-label="Settings" style={{fontSize: fontButtonSize}} onClick={handleShow}>
            <span aria-hidden={true}><AiFillSetting /></span>
        </Button>
        </OverlayTrigger>
    )
}