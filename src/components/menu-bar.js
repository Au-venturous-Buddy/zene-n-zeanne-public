import React from "react"
import {Nav, Navbar} from 'react-bootstrap'
import { IoHome } from "react-icons/io5";
import { ImMenu2, ImFilm } from "react-icons/im";
import {FaBook} from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import {AiOutlineAlignCenter, AiFillHeart} from "react-icons/ai"
import TextBreakWithBreakpoint from "./text-break-with-breakpoint"

function ListLink(props) {
  return (
      <Nav.Item aria-hidden={true} className="px-1 my-1">
        <Nav.Link style={{fontSize: "0.7rem"}} href={props.to} eventKey={props.eventKey}>
          <b className="m-0">
            {props.children}
          </b>
        </Nav.Link>
      </Nav.Item>
    )
}

export default function MenuBar({ pageID }) {
    return(
        <Navbar expand="sm" id="menu-bar" className="justify-content-center hover-shadow py-0" variant="dark">
          <Navbar.Toggle className="my-2" aria-controls="menu-bar-collapse" style={{fontSize: "0.9rem"}}>
            <ImMenu2 /> Menu
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-content-center" id="menu-bar-collapse">
          <Nav className="my-1" fill variant="pills" activeKey={pageID} >
            <ListLink to="/" eventKey="home">
              <IoHome /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Home</span>
            </ListLink>
            <ListLink to="/characters/" eventKey="characters">
              <GiPerson /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Characters</span>
            </ListLink>
            <ListLink to="/books/" eventKey="books">
              <FaBook /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Read</span>
            </ListLink>
            <ListLink to="/videos/" eventKey="videos">
              <ImFilm /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Watch</span>
            </ListLink>
            <ListLink to="/bonus/" eventKey="bonus">
              <AiFillHeart /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Bonus</span>
            </ListLink>
            <ListLink to="/credits/" eventKey="credits">
              <AiOutlineAlignCenter /> <TextBreakWithBreakpoint maxSize={575} /> <span className="menu-item-text">Credits</span>
            </ListLink>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        
    )
}