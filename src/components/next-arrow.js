import { BsCaretRightFill } from "react-icons/bs";
import React from "react"
import { Button } from "react-bootstrap"

export default function NextArrow(props) {
    const { onClick } = props;
    return (
      <Button
        className={"carousel-control-next catalog-next"}
        onClick={onClick}
        aria-label="Next"
      >
        <BsCaretRightFill style={{fontSize:"20px"}}></BsCaretRightFill>
      </Button>
    );
  }