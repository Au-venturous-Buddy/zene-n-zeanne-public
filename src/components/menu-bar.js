import React from "react"
import {Navbar, Nav} from 'react-bootstrap'

export default function MenuBar({ menuBarItems }) {
    return(
      <Navbar id="menu-bar" className="justify-content-center py-0" variant="dark">
        <Nav className="m-2" style={{borderRadius: 10}} fill>
          {menuBarItems.map((item, index) => (
            (menuBarItems.length > 1 && index === 0) ?
            (<Nav.Item key={index} className="p-1 my-1 ml-1">
              {item}
            </Nav.Item>) :
            (<Nav.Item key={index} className="p-1 m-1">
              {item}
            </Nav.Item>)
          ))}
        </Nav>
      </Navbar>
    )
}