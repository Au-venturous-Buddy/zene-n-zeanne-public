import React, {useState} from "react"
import {Navbar, Nav, Modal, Button} from 'react-bootstrap'
import { IoHome } from "react-icons/io5";
import { ImFilm } from "react-icons/im";
import {FaBook} from "react-icons/fa";
import { GiPerson, GiHamburgerMenu } from "react-icons/gi";
import {AiOutlineAlignCenter, AiFillHeart} from "react-icons/ai"
import CloseButton from "../components/close-button";
import ResponsiveHeader from "../components/responsive-header";
import {GridList, GridListTile} from '@material-ui/core';
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import SearchBox from "../components/search-box";

function MenuWindow({menuItems, pageID}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var menuLinks = []
  Object.keys(menuItems).forEach((value, index) => {
    if(value === pageID) {
      menuLinks.push(
        <Button style={{fontSize: "0.9rem"}} className="p-3 m-3 page-link current-page-link" href={menuItems[value]["to"]}>
          <b className="m-0">
            {menuItems[value]["logo"]} <br /> <span className="menu-item-text">{menuItems[value]["text"]}</span>
          </b>
        </Button>
      )
    }
    else {
      menuLinks.push(
        <Button style={{fontSize: "0.9rem"}} className="p-3 m-3 page-link" href={menuItems[value]["to"]}>
          <b className="m-0">
            {menuItems[value]["logo"]} <br /> <span className="menu-item-text">{menuItems[value]["text"]}</span>
          </b>
        </Button>
      )
    }
  })

  return(
    <>
      <Button className="menu-button mx-1" aria-label={menuItems[pageID]["text"]} onClick={handleShow}>
        <GiHamburgerMenu /> {menuItems[pageID]["logo"]} <span className="menu-item-text">{menuItems[pageID]["text"]}</span>
      </Button>
      <Modal size="md" show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <div style={{color: "#017BFF"}}>
              <ResponsiveHeader level={1}>Menu</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "justify", color: "#017BFF"}}>
          <section>
            <GridList cellHeight="auto" spacing={5} cols={ResponsiveGridColumns(3, [860, 560])}>
              {menuLinks.map((value, index) => (
                <GridListTile key={index}>
                  {value}
                </GridListTile>
              ))}
            </GridList>
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default function MenuBar({ pageID }) {
    const menuItems = {
      "home": {
        "logo": (<IoHome />),
        "text": "Home",
        "to": "/"
      },
      "characters": {
        "logo": (<GiPerson />),
        "text": "Characters",
        "to": "/characters/"
      },
      "books": {
        "logo": (<FaBook />),
        "text": "Read",
        "to": "/books/"
      },
      "videos": {
        "logo": (<ImFilm />),
        "text": "Watch",
        "to": "/videos/"
      },
      "bonus": {
        "logo": (<AiFillHeart />),
        "text": "Bonus",
        "to": "/bonus/"
      },
      "credits": {
        "logo": (<AiOutlineAlignCenter />),
        "text": "Credits",
        "to": "/credits/"
      }
    }

    return(
      <Navbar id="menu-bar" className="justify-content-center py-0" variant="dark">
        <Nav className="m-2" style={{borderRadius: 10}} fill>
          <Nav.Item className="p-1 my-1">
            <MenuWindow menuItems={menuItems} pageID={pageID} />
          </Nav.Item>
          <Nav.Item className="p-1 my-1">
            <SearchBox />
          </Nav.Item>
        </Nav>
      </Navbar>
    )
}