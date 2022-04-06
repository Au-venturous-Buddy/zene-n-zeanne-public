import React from "react"
import { Button } from "react-bootstrap"
import { GoPlay } from "react-icons/go";
import ResponsiveSize from "../hooks/responsive-size";

export default function PlayNowButton(props) {
    return(
      <Button aria-label={props.children} href={props.slug} target="_blank" rel="noreferrer" style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}>
        <span aria-hidden={true}><GoPlay /> {props.children}</span>
      </Button> 
    )
}