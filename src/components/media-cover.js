import React, {useState} from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Button, Modal, Badge } from "react-bootstrap"
import BackButton from "./back-button";
import ResponsiveHeader from "./responsive-header";
import {QRCodeSVG} from 'qrcode.react';

export default function MediaCover({categoryName, title, cover, synopsis, slug, showBadge, badgeItem}) {
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
      <Button aria-label={`${title} - ${badgeItem}`} className={`m-2 view img-button media-preview media-preview-${categoryName}`} onClick={handleShow}>
        <div aria-hidden={true}>
          <img
            className={`d-block w-100 media-preview-image`}
            src={cover.publicURL}
            alt={title}
          />
          <section className={`m-3 media-preview-title`}>
            <ResponsiveHeader level={3} maxSize={1} minScreenSize={460}>
              {title} <br />
              <Badge className={`mt-3 media-preview-badge`} hidden={!showBadge}>{badgeItem}</Badge>
            </ResponsiveHeader>
          </section>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose} centered scrollable fullscreen={true}>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
            <div style={{color: "#017BFF"}}>
              <ResponsiveHeader level={1}>Title Info</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={(!(['buddies-next-door', 'read-along'].includes(categoryName))) ? "px-0" : "p-0"} style={{textAlign: "justify", color: "#017BFF"}}>
          <div className={(!(['buddies-next-door', 'read-along', 'the-dream-begins'].includes(categoryName))) ? "table-background" : (['the-dream-begins'].includes(categoryName) ? "vr-background-sam p-3" : "tv-background")}>
          <div className={`p-3 m-3 media-preview-main-${categoryName}`}>
          <section>
            <div className="my-3">
              <ResponsiveHeader level={2}>{title}</ResponsiveHeader>
            </div>
            <img
              className={`hover-shadow-card d-block w-100 mb-3 media-preview-main-img-${categoryName}`}
              src={cover.publicURL}
              alt={title}
            />
            {synopsis}
          </section>
          <section className="m-5" style={{textAlign: "center"}}>
            <ResponsiveHeader level={3}>Scan, Click, or Tap on the QR Code below to start:</ResponsiveHeader>
            <Button className="view img-button qr-code m-2 p-2" style={{backgroundColor: "white"}} href={slug} target="_blank" rel="noreferrer">
              <QRCodeSVG value={domain.site.siteMetadata.domain + encodeURI(slug)} />
            </Button>
          </section>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <BackButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
    )
  }