import { BsCaretLeftFill } from "react-icons/bs";
import React from "react"
import { Button } from "react-bootstrap"

export default function PrevArrow(props) {
    const { onClick } = props;
    return (
      <Button
        className={"carousel-control-prev catalog-prev"}
        onClick={onClick}
        aria-label="Previous"
      >
        <span aria-hidden={true}><BsCaretLeftFill style={{fontSize:"20px"}} /></span>
      </Button>
    );
  }