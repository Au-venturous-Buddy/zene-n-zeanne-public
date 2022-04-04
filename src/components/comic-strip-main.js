import React from 'react';
import {Container, Button, Modal, OverlayTrigger, Tooltip, Form, Col} from 'react-bootstrap';
import {FaWindowClose} from "react-icons/fa";
import Slider from "react-slick";
import ResponsiveSize from "../hooks/get-window-dimensions";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

class ComicStripDisplay extends React.Component {
  state = {
    slideIndex: 0,
    updateCount: 0,
    show: false,
  };
  
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  goToPage = () => {
    var page = Number(document.getElementById("pageInput").value);
    this.slider.slickGoTo((page % this.props.total) - 1);
    this.handleClose();
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      fade: true,
      centerPadding: "60px",
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };
    return (
      <>
      <div>
        <h1 className="mb-5" style={{color: "#fff", textAlign: "center"}}>{this.props.title}</h1>
        <div className="book-main">
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          {this.props.children}
        </Slider>
        </div>
        <div className='mt-3' style={{textAlign: 'center'}}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={helpTooltip("Toggle Page")}
          >
          <Button style={{fontSize: this.props.fontButtonSize}} onClick={this.handleShow}>{this.state.slideIndex + 1} of {this.props.total}</Button>
          </OverlayTrigger>
        </div>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center"}}>Toggle Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-0" onSubmit={e => e.preventDefault()}> 
          <Form.Row className="align-items-center">
            <Form.Control id="pageInput" className="hover-shadow" style={{textAlign: "center"}} type="text" placeholder={`Enter page number from 1 to ${this.props.total}.`} />
          </Form.Row>
          <Form.Row className="align-items-center mt-3">
            <Col></Col>
            <Col style={{textAlign: "center"}}>
            <Button onClick={this.goToPage}>
              Go
            </Button>
            </Col>
            <Col></Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button onClick={this.handleClose}>
          <FaWindowClose /> Close
        </Button>
      </Modal.Footer>
      </Modal>
      </>
    );
  }
}

class TextLayer extends React.Component {
  render() {
    return(
      <div className="mask flex-center">
        {this.props.children}
      </div>
    )
  }
}

function Page({scene, dialogue, keyID}) {
  var dialogueRender = (
    <div></div>
  )
  if(dialogue) {
    dialogueRender = (
      <img
        className="d-block w-100"
        src={dialogue.publicURL}
        alt={keyID}
      />
    )
  }

  return(
  <div aria-hidden={true} className="view">
    <img
      className="d-block w-100"
      src={scene.publicURL}
      alt={keyID}
    />
    <TextLayer>
      {dialogueRender}
    </TextLayer>
  </div>
  )
}

export default function ComicStripMain({title, scenes, dialogues, dialoguesAlt, size}) {
  var pages = [];
  var pageNum = 0;
  var maxPageNum = Math.max(parseInt(scenes[scenes.length - 1].name), parseInt(dialogues[dialogues.length - 1].name));
  var currentScene = null;
  var nextDialogueID = 0;
  var nextSceneID = 0;
  while(pageNum <= maxPageNum) {
    var currentDialogue = null;
    if(nextDialogueID < dialogues.length && parseInt(dialogues[nextDialogueID].name) === pageNum) {
      currentDialogue = dialogues[nextDialogueID];
      nextDialogueID++;
    }

    if(nextSceneID < scenes.length && parseInt(scenes[nextSceneID].name) === pageNum) {
      currentScene = scenes[nextSceneID];
      nextSceneID++;
    }

    pages.push(
      <div aria-label={dialoguesAlt[pageNum]} key={pageNum.toString()}>
        <Page scene={currentScene} dialogue={currentDialogue} keyID={pageNum.toString()} />
      </div>
    )

    pageNum++;
  }

  return (
    <Container className="my-5" style={{width: size.toString() + "%"}}>
      <ComicStripDisplay total={pages.length} title={title} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)}>
          {pages}
      </ComicStripDisplay>
    </Container>
  )
}