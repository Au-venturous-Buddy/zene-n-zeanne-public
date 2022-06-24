import { BsCaretLeftFill } from "react-icons/bs";
import React from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

export default function PrevArrow(props) {
    const { onClick } = props;
    return (
      <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Previous Page")}
      >
      <Button
        onClick={onClick}
        aria-label="Previous"
        style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}
      >
        <span aria-hidden={true}><BsCaretLeftFill /></span>
      </Button>
      </OverlayTrigger>
    );
  }