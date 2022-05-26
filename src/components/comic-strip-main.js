import React from 'react';
import {Container, Button, Modal, OverlayTrigger, Tooltip, Form, Col} from 'react-bootstrap';
import Slider from "react-slick";
import ResponsiveSize from "../hooks/responsive-size";
import NextArrow from "./next-arrow";
import PrevArrow from "./prev-arrow";
import {GridList, GridListTile} from '@material-ui/core';
import CloseButton from "./close-button";
import ResponsiveHeader from "./responsive-header";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function SlideThumbnail({slide, index, goToPage, closeFunction}) {
  const changeSlide = () => {
    goToPage(index)
    closeFunction()
  }

  return(
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 330,
        paddingTop: `5%`,
        paddingBottom: `5%`
      }}
    >
      <Button aria-label={`Page ${index + 1}`} className="view img-button" onClick={changeSlide}>
        <div aria-hidden={true}>
          {slide}
        </div>
      </Button>
      <div aria-hidden={true} className="mt-2" style={{textAlign: "center", color: "#017BFF"}}>
        <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{index + 1}</ResponsiveHeader>
      </div>
    </div>
  )
}

class ComicStripDisplay extends React.Component {
  state = {
    slideIndex: 0,
    updateCount: 0,
    show: false,
  };
  
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  goToPage = (page) => {
    this.slider.slickGoTo(page);
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
        <section className="mb-5" style={{color: "#fff", textAlign: "center"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{this.props.title}</ResponsiveHeader>
        </section>
        <section lang={this.props.language} className="book-main">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {this.props.children}
          </Slider>
        </section>
        <section className='mt-3' style={{textAlign: 'center'}}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={helpTooltip("Toggle Page")}
          >
            <Button aria-label={`Toggle Page - Page ${this.state.slideIndex + 1} of ${this.props.total}`} style={{fontSize: this.props.fontButtonSize}} onClick={this.handleShow}>
              <span aria-hidden={true}>{this.state.slideIndex + 1} of {this.props.total}</span>
            </Button>
          </OverlayTrigger>
        </section>
      </div>
      <Modal show={this.state.show} onHide={this.handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Page</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridList cellHeight="auto" spacing={5} cols={1}>
          {this.props.children.map((currentValue, index) => (
            <GridListTile key={index}>
              <SlideThumbnail slide={currentValue} index={index} goToPage={this.goToPage} closeFunction={this.handleClose} />
            </GridListTile>
          ))}
        </GridList>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={this.handleClose} />
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

export default function ComicStripMain({title, language, scenes, dialogues, dialoguesAlt, callAt, size}) {
  var pages = [];
  var pageNum = 0;
  var maxPageNum = Math.max(parseInt(scenes[scenes.length - 1].name), parseInt(dialogues[dialogues.length - 1].name));
  var currentScene = null;
  var currentDialogue = null;
  var nextDialogueID = 0;
  var nextSceneID = 0;
  var callAtIndex = 0;
  while(pageNum <= maxPageNum && callAtIndex < callAt.length) {
    if(nextDialogueID < dialogues.length && parseInt(dialogues[nextDialogueID].name) === pageNum) {
      currentDialogue = dialogues[nextDialogueID];
      nextDialogueID++;
    }

    if(nextSceneID < scenes.length && parseInt(scenes[nextSceneID].name) === pageNum) {
      currentScene = scenes[nextSceneID];
      nextSceneID++;
    }

    if(callAt[callAtIndex] === pageNum) {
      pages.push(
        <div aria-label={dialoguesAlt[pageNum]} key={pageNum.toString()}>
          <Page scene={currentScene} dialogue={currentDialogue} keyID={pageNum.toString()} />
        </div>
      )
      callAtIndex++;
    }

    pageNum++;
  }

  return (
    <Container className="my-5" style={{width: size.toString() + "%"}}>
      <ComicStripDisplay language={language} total={pages.length} title={title} fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)}>
          {pages}
      </ComicStripDisplay>
    </Container>
  )
}