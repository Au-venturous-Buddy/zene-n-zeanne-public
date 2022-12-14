import React, {useState} from "react"
import ResponsiveSize from "../hooks/responsive-size";
import { Button, Modal, Badge } from "react-bootstrap"
import { BsCaretRightFill } from "react-icons/bs";
import CloseButton from "./close-button";

export default function SearchResultPreview({title, synopsis, category, slug}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <section className="my-4 px-2 preview-section">
        <h3 className="m-1" style={{fontSize: ResponsiveSize(1, "rem", 0.001, 500)}}>
          {title}
        </h3>
        <div className="mt-3">
          <Badge>{category}</Badge>
        </div>
        <div className="mt-3">
          <Button className="preview-section-button" onClick={handleShow} style={{border: `none`, fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}}>View Synopsis</Button>
          <Button className="preview-section-button ms-2" href={slug} style={{border: `none`, fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} target="_blank" rel="noreferrer">Go <BsCaretRightFill aria-hidden={true} /></Button>
        </div>
    </section>
    <Modal size="md" show={show} onHide={handleClose} centered scrollable>
        <Modal.Header aria-label={`Synopsis - ${title}`} className="justify-content-center bold-text">
          <Modal.Title aria-hidden={true}>
            <h1 style={{fontSize: ResponsiveSize(2, "rem", 0.001, 500), color: "#017BFF"}}>Synopsis</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{textAlign: "justify", color: "#017BFF"}}>
            {synopsis}
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  )
}