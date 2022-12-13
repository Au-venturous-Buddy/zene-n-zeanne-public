import React from "react"
import {Navbar, Nav} from 'react-bootstrap'

export default function MenuBar({ menuBarItems }) {
    return(
      <Navbar id="menu-bar" className="justify-content-center py-0" variant="dark">
        <Nav className="m-1" style={{borderRadius: 10}} fill>
          {menuBarItems.map((item, index) => (
            <Nav.Item key={index} className="p-1">
              {item}
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
    )
}