import React from "react"
import { Button } from "react-bootstrap"
import { GoPlay } from "react-icons/go";

export default function PlayNowButton(props) {
    return(
      <Button href={props.slug} target="_blank" rel="noreferrer" style={props.style}><GoPlay aria-hidden={true} /> {props.children}</Button> 
    )
}