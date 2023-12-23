import React, {useState} from "react"
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { GiHamburgerMenu } from "react-icons/gi";
import CloseButton from "./close-button";
import ResponsiveHeader from "./responsive-header";
import {ImageList, ImageListItem} from '@mui/material';
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import { IoHome } from "react-icons/io5";
import { ImFilm } from "react-icons/im";
import {FaBook} from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import {AiOutlineAlignCenter, AiFillHeart} from "react-icons/ai"
import ResponsiveSize from "../hooks/responsive-size";
import { useStaticQuery, graphql } from "gatsby"

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function MenuWindowMain({menuItems, pageID}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const baseURL = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              domain
            }
          }
        }
      `
    )
  
    var menuLinks = []
    Object.keys(menuItems).forEach((value, index) => {
      if(!(pageID === null) && value === pageID) {
        menuLinks.push(
          <Button style={{fontSize: "0.9rem"}} className="p-3 m-3 page-link current-page-link" href={baseURL.site.siteMetadata.domain + menuItems[value]["to"]}>
            <b className="m-0">
              {menuItems[value]["logo"]} <br /> <span className="menu-item-text">{menuItems[value]["text"]}</span>
            </b>
          </Button>
        )
      }
      else {
        menuLinks.push(
          <Button style={{fontSize: "0.9rem"}} className="p-3 m-3 page-link" href={baseURL.site.siteMetadata.domain + menuItems[value]["to"]}>
            <b className="m-0">
              {menuItems[value]["logo"]} <br /> <span className="menu-item-text">{menuItems[value]["text"]}</span>
            </b>
          </Button>
        )
      }
    })
  
    return(
      <>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Main Menu")}
        >
        <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} aria-label={"Menu" + ((!(pageID === null)) ? (" - " + menuItems[pageID]["text"]) : "")} onClick={handleShow}>
          {
            (pageID) ?
            (<span aria-hidden>{menuItems[pageID]['logo']} {menuItems[pageID]['text']}</span>) :
            (<span aria-hidden><GiHamburgerMenu /> Menu</span>)
          }
        </Button>
        </OverlayTrigger>
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
              <ImageList rowHeight="auto" gap={5} cols={ResponsiveGridColumns(3, menuLinks.length, [860, 560])}>
                {menuLinks.map((value, index) => (
                  <ImageListItem key={index}>
                    {value}
                  </ImageListItem>
                ))}
              </ImageList>
            </section>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <CloseButton handleClose={handleClose} />
          </Modal.Footer>
        </Modal>
        </>
    )
  }

export default function MenuWindow({ pageID }) {
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
        <MenuWindowMain menuItems={menuItems} pageID={pageID} />
      )
}