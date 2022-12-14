import React, {useState} from "react"
import { Accordion, Button, Modal } from "react-bootstrap"
import BackButton from "./back-button";
import ResponsiveHeader from "./responsive-header";
import ResponsiveSizeMaxWidth from "../hooks/responsive-size-max-width";

export default function CategoryFolder(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  var subCategories = Object.keys(props.contents).sort(function(a, b){return b-a})
  
  return(
    <>
    <Button aria-label={props.category} className={props.buttonClassName} onClick={handleShow} style={{color: "#FFF", maxWidth: ResponsiveSizeMaxWidth(30, 90, 500)}}>
      {props.children}
    </Button>
    <Modal size="xl" show={show} onHide={handleClose} centered scrollable fullscreen={true}>
      <Modal.Header className="justify-content-center bold-text">
        <Modal.Title>
          <div style={{color: "#017BFF"}}>
            <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>{props.category}</ResponsiveHeader>
          </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={(!(['buddies-next-door', 'read-along'].includes(props.categoryName))) ? "px-0" : "p-0"}>
          <div className={(!(['buddies-next-door', 'read-along'].includes(props.categoryName))) ? "table-background" : "tv-background"}>
            <section className={`py-3 m-3 all-titles-main-${props.categoryName}`}>
              <section className="my-3">
                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Table of Contents</ResponsiveHeader>
              </section>
              <Accordion className="mb-3" flush>
                {
                  subCategories.map((currentSubCategory) => (
                    <div className="m-3" key={currentSubCategory}>
                      <Accordion.Item eventKey={currentSubCategory}>
                        <Accordion.Header className="hover-shadow-card bold-text justify-content-center" style={{textAlign: "center"}}>
                          <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                            {`${props.subcategoryName} ${currentSubCategory}`}
                          </ResponsiveHeader>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {props.contents[currentSubCategory].map((value, index) => (
                              <li style={{display: "inline"}} key={index}>
                                {value}
                              </li>
                            ))}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))
                }
              </Accordion>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <BackButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  )
}