import React from "react"
import { Button, Modal, Container, Row } from "react-bootstrap"
import CloseButton from "./close-button";
import {BsCaretDownFill} from "react-icons/bs";
import {GridList, GridListTile} from '@material-ui/core';
import CategoryFolder from "./category-folder";
import ResponsiveHeader from "./responsive-header"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function VersionSelector({version, stateChangeFunction, closeFunction}) {
    const changeState = () => {
      stateChangeFunction(version)
      closeFunction()
    }
  
    return(
      <Button style={{border: `none`, backgroundColor: "white", color: "#017BFF"}} onClick={changeState}>
        {`Version ${version}`}
      </Button>
    )
  }
  
export default class MediaLibrary extends React.Component {
    state = {
      currentVersion: this.props.defaultVersion,
      show: false
    };
  
    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })
    
    changeVersion = (version) => {
      this.setState({currentVersion: version});
    }
  
    render() {
      var mediaCurrentVersion = this.props.mediaItems[this.state.currentVersion];
  
      var mediaCategoriesItems = [];
      for(var i = 0; i < this.props.mediaCategories.allFile.edges.length; i++) {
        var currentValue = this.props.mediaCategories.allFile.edges[i].node;
        if(Object.keys(mediaCurrentVersion).includes(currentValue.name)) {
          mediaCategoriesItems.push(
              <div
                style={{
                  margin: `0 auto`,
                  maxWidth: 230,
                  paddingTop: `5%`,
                  paddingBottom: `5%`
                }}
              >
                <CategoryFolder buttonClassName="view category-button p-3 m-3" buttonStyle={{color: "#FFF"}} maxColumns={4} columnBreakpoints={[1200, 990, 520]} category={currentValue.name} contents={mediaCurrentVersion[currentValue.name]} subcategoryName={this.props.mediaSubCategoryName}>
                  <div aria-hidden={true}>
                    <GatsbyImage
                      className="d-block w-100"
                      style={{border: "4px solid #017BFF", borderRadius: "20%"}}
                      image={getImage(currentValue)}
                      alt={currentValue.name}
                    />
                    <div className="m-1 bold-text category-caption" style={{textAlign: "center"}}>
                      <ResponsiveHeader level={3} maxSize={0.9} minScreenSize={330}>{currentValue.name}</ResponsiveHeader>
                    </div>
                  </div>
                </CategoryFolder>
              </div>
          )
        }
      }
  
      return(
        <>
        <section className="py-3 mx-3" style={{textAlign: "center"}}>
          <Button aria-label={`Select Version - Version ${this.state.currentVersion}`} onClick={this.handleShow} style={{border: `none`, color: "white", backgroundColor: "rgba(0, 0, 0, 0)", fontSize: this.props.headerSize}}>
            <div aria-hidden={true}>
              <ResponsiveHeader level={2} maxSize={2} minScreenSize={800}>
                Version {this.state.currentVersion} <BsCaretDownFill />
              </ResponsiveHeader>
            </div>
          </Button>
          <section className="py-3 mx-3">
            <GridList cellHeight="auto" spacing={5} cols={this.props.grid}>
              {mediaCategoriesItems.map((value, index) => (
                <GridListTile key={index}>
                  {value}
                </GridListTile>
              ))}
            </GridList>
          </section>
        </section>
        <Modal size="sm" show={this.state.show} onHide={this.handleClose} centered scrollable>
          <Modal.Header className="justify-content-center bold-text">
            <Modal.Title>
              <div style={{color: "#017BFF"}}>
                <ResponsiveHeader level={1} maxSize={1.5} minScreenSize={500}>Select Version</ResponsiveHeader>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section>
              <Container>
                  {
                    Object.keys(this.props.mediaItems).map((currentValue, index) => (
                      <Row className="my-3 mx-1" style={{justifyContent: "center"}} key={index}>
                        <VersionSelector version={currentValue} stateChangeFunction={this.changeVersion} closeFunction={this.handleClose} />
                      </Row>
                    ))
                  }
                </Container>
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