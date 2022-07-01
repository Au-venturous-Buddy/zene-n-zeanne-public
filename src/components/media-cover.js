import React, {useState} from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Button, Modal, Badge } from "react-bootstrap"
import CloseButton from "./close-button";
import ResponsiveHeader from "./responsive-header";
import {QRCodeSVG} from 'qrcode.react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function MediaCover({title, cover, synopsis, slug, showBadge, badgeItem}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const domain = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          domain
        }
      }
    }
  `)

    return(
      <>
      <Button aria-label={`${title} - ${badgeItem}`} className="view img-button media-preview m-2" onClick={handleShow}>
        <div aria-hidden={true}>
          <GatsbyImage
            className="d-block w-100 media-preview-image"
            image={getImage(cover)}
            alt={title}
          />
          <section className="m-3 media-preview-title">
            <ResponsiveHeader level={3} maxSize={1} minScreenSize={460}>
              {title} <br />
              <Badge className="mt-3 media-preview-badge" hidden={!showBadge}>{badgeItem}</Badge>
            </ResponsiveHeader>
          </section>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <div style={{color: "#017BFF"}}>
              <ResponsiveHeader level={1}>{title}</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "justify", color: "#017BFF"}}>
          <section>
            <GatsbyImage
              className="hover-shadow-card d-block w-100 mb-3"
              image={getImage(cover)}
              alt={title}
            />
            {synopsis}
          </section>
          <section className="m-5" style={{textAlign: "center"}}>
            <ResponsiveHeader level={2}>Scan, Click, or Tap on the QR Code below to start:</ResponsiveHeader>
            <Button className="view img-button qr-code m-2 p-2" href={slug} target="_blank" rel="noreferrer">
              <QRCodeSVG value={domain.site.siteMetadata.domain + encodeURI(slug)} />
            </Button>
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
    )
  }