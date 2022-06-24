import React from "react"
import {Navbar, Nav} from 'react-bootstrap'

export default function MenuBar({ menuBarItems }) {
    return(
      <Navbar id="menu-bar" className="justify-content-center py-0" variant="dark">
        <Nav className="m-2" style={{borderRadius: 10}} fill>
          {menuBarItems.map((item, index) => (
            <Nav.Item key={index} className="p-1 my-1">
              {item}
            </Nav.Item>
          ))}
          {/*<Nav.Item className="p-1 my-1">
            <MenuWindow menuItems={menuItems} pageID={pageID} />
          </Nav.Item>
          <Nav.Item className="p-1 my-1">
            <SearchBox />
          </Nav.Item>*/}
        </Nav>
      </Navbar>
    )
}