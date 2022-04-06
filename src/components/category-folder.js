import React from "react"
import ResponsiveGridColumns from "../hooks/responsive-grid-columns";
import { Accordion, Card, Button, Modal } from "react-bootstrap"
import CloseButton from "../components/close-button";
import {GridList, GridListTile} from '@material-ui/core';
import ResponsiveHeader from "./responsive-header";

function DisplayItems(props) {
  return(
    <GridList cellHeight="auto" spacing={5} cols={ResponsiveGridColumns(3, [1030, 730])}>
      {props.children}
    </GridList>
  )
}

export default class CategoryFolder extends React.Component {
  state = {
    show: false
  };

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  render() {
    var subCategories = Object.keys(this.props.contents).sort(function(a, b){return b-a})
  
    return(
      <>
      <Button aria-label={this.props.category} className={this.props.buttonClassName} onClick={this.handleShow} style={this.props.buttonStyle}>
        {this.props.children}
      </Button>
      <Modal size="xl" show={this.state.show} onHide={this.handleClose} centered scrollable>
          <Modal.Header className="justify-content-center bold-text">
            <Modal.Title>
              <div style={{color: "#017BFF"}}>
                <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>{this.props.category}</ResponsiveHeader>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <section className="py-3 mx-3">
            <Accordion className="mb-3">
              {
                subCategories.map((currentSubCategory) => (
                  <div className="my-3" key={currentSubCategory}>
                    <Card>
                      <Card.Header className="hover-shadow-card bold-text accordion-header" style={{textAlign: "center"}}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={currentSubCategory}>
                          <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                            {`${this.props.subcategoryName} ${currentSubCategory}`}
                          </ResponsiveHeader>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={currentSubCategory}>
                        <Card.Body>
                          <DisplayItems>
                            {this.props.contents[currentSubCategory].map((value, index) => (
                              <GridListTile key={index}>
                                {value}
                              </GridListTile>
                            ))}
                          </DisplayItems>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </div>
                ))
              }
            </Accordion>
          </section>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <CloseButton handleClose={this.handleClose} />
          </Modal.Footer>
        </Modal>
      </>
      )
    }
  }