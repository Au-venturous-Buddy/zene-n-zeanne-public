import React, {useState} from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby";
import { Container, Button, ButtonGroup, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import CloseButton from "../components/close-button";
import SettingsButton from "../components/settings-button";
import ResponsiveSize from "../hooks/responsive-size";
import SEO from "../components/seo";
import ResponsiveHeader from "../components/responsive-header";
import Slider from "react-slick";
import NextArrow from "../components/next-arrow";
import PrevArrow from "../components/prev-arrow";
import {GridList, GridListTile} from '@material-ui/core';

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

function SlideThumbnail({page, index, goToPage, closeFunction}) {
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
        <img
          className="d-block w-100"
          src={page.publicURL}
          alt={page.name}
          aria-hidden={true}
        />
      </Button>
      <div aria-hidden={true} className="mt-2" style={{textAlign: "center", color: "#017BFF"}}>
        <ResponsiveHeader level={2}>
          {index + 1}
        </ResponsiveHeader>
      </div>
    </div>
  )
}

function PreviousButton({goToPage, slideIndex, numPages}) {
  const previousSlide = () => {
    goToPage((slideIndex > 0) ? (slideIndex - 1) : (numPages - 1));
  }
  
  return(
    <PrevArrow onClick={previousSlide} />
  )
}

function NextButton({goToPage, slideIndex, numPages}) {
  const nextSlide = () => {
    goToPage((slideIndex + 1) % numPages);
  }
  
  return(
    <NextArrow onClick={nextSlide} />
  )
}

function CaptionSlideshowToggle(props) {  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ButtonGroup aria-label="Page Navigator">
        <PreviousButton goToPage={props.goToPage} slideIndex={props.state.slideIndex} numPages={props.children.length} />
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Toggle Page")}
        >
          <Button aria-label={`Toggle Page - Page ${props.state.slideIndex + 1} of ${props.children.length}`} style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} onClick={handleShow}>
            <span aria-hidden={true}>{props.state.slideIndex + 1} of {props.children.length}</span>
          </Button>
        </OverlayTrigger>
        <NextButton goToPage={props.goToPage} slideIndex={props.state.slideIndex} numPages={props.children.length} />
      </ButtonGroup>
      <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Toggle Page</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GridList cellHeight="auto" spacing={5} cols={1}>
          {props.children.map((currentValue, index) => (
            <GridListTile key={index}>
              <SlideThumbnail page={currentValue} index={index} goToPage={props.goToPage} closeFunction={handleClose} />
            </GridListTile>
          ))}
        </GridList>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
      </Modal>
      </>
    );
  }

function generatePages(images, captions, callAt) {
  var pages = [];
  var dialogue = [];
  var callAtIndex = 0;
  var imageIndex = 0;
  while(imageIndex < images.length && callAtIndex < callAt.length) {
    if(callAt[callAtIndex] === imageIndex) {
      pages.push(images[imageIndex])
      dialogue.push(captions[imageIndex]) 
      callAtIndex++;
    }
    imageIndex++;
  }

  return {"pages": pages, "dialogue": dialogue};
}

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
      <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Language</ResponsiveHeader>
          </div>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="language-selector" as="select" onChange={props.changeLanguage} value={props.state.currentLanguage}>
            {props.languageOptions}
          </Form.Control>
        </section>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>Mode</ResponsiveHeader>
          </div>
          <Form.Control style={{color: "#017BFF"}} className="hover-shadow" id="mode-selector" as="select" onChange={props.changeMode} value={props.state.currentMode}>
            {props.modeOptions}
          </Form.Control>
        </section>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>{`Page Size: ${props.state.currentSize}%`}</ResponsiveHeader>
          </div>
          <Form.Control className="hover-shadow custom-range" id="page-size" type="range" onInput={props.changePageSize} onChange={props.changePageSize} value={props.state.currentSize} />
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default class CaptionSlideshow extends React.Component {
  state = {
    currentLanguage: 'English',
    currentMode: 'Original',
    currentSize: 65,
    slideIndex: 0,
    updateCount: 0,
  }

  changeLanguage = () => {
    var language = document.getElementById("language-selector").value;
    this.setState({currentLanguage: language});
  }

  changeMode = () => {
    var mode = document.getElementById("mode-selector").value;
    this.setState({currentMode: mode});
  }

  changePageSize = () => {
    var size = document.getElementById("page-size").value;
    this.setState({currentSize: size})
  }

  goToPage = (page) => {
    this.slider.slickGoTo(page);
  }

  render() {
    var metadataItems = null;
    var images = [];
    var captions = [];
    var currentLanguageCode = `en`;
    var languages = new Set();
    for(var i = 0; i < this.props.data.allFile.edges.length; i++) {
      var nodeItem = this.props.data.allFile.edges[i].node
      if(nodeItem.relativeDirectory.includes("images") && nodeItem.ext === ".png") {
        images.push(nodeItem);
      }
      else if(nodeItem.ext === ".md" && nodeItem.relativeDirectory.includes("captions")) {
        languages.add(nodeItem.name)
        if(nodeItem.name === this.state.currentLanguage) {
          captions = nodeItem.childMarkdownRemark.frontmatter.captions
          currentLanguageCode = nodeItem.childMarkdownRemark.frontmatter.language_code
        }
      }
      else if(nodeItem.ext === ".md" && nodeItem.name === "index") {
        metadataItems = nodeItem;
      }
    }

    var languageOptions = []
    languages.forEach((value) => {
      languageOptions.push(<option key={value}>{value}</option>)
    })

    var modeOptions = []
    var callAt = []
    metadataItems.childMarkdownRemark.frontmatter.modes.forEach((mode) => {
      modeOptions.push(<option key={mode.mode_name}>{mode.mode_name}</option>)
      if(mode.mode_name === this.state.currentMode) {
        callAt = mode.call_at;
      }
    })

    var pagesDialogue = generatePages(images, captions, callAt);

    const settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      fade: true,
      centerPadding: "60px",
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    return(
    <Layout menuBarItems={[(<CaptionSlideshowToggle state={this.state} goToPage={this.goToPage}>{pagesDialogue["pages"]}</CaptionSlideshowToggle>), (<SettingsWindow state={this.state} languageOptions={languageOptions} modeOptions={modeOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changePageSize={this.changePageSize} />)]} showMenuBar={true}>
      <SEO title={metadataItems.childMarkdownRemark.frontmatter.title} />
      <div style={{textAlign: 'center'}}>
        <Container className="my-5" style={{width: this.state.currentSize.toString() + "%"}}>
        <section className="mb-5" style={{color: "#fff", textAlign: "center"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
        </section>
        <section className="book-main">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {pagesDialogue["pages"].map((page, index) => (
              <div className="view">
                <img
                  className="d-block w-100"
                    src={page.publicURL}
                    alt={page.name}
                />
              </div>
            ))}
          </Slider>
        </section>
        <section lang={currentLanguageCode} className='mt-3' style={{textAlign: 'justify'}}>
          <p dangerouslySetInnerHTML={{__html: pagesDialogue["dialogue"][this.state.slideIndex]}}>
          </p>
        </section>
        </Container>
      </div>
    </Layout>
    )
  }
}

export const query = graphql`
  query($pagePath: String!) {
    allFile(
      filter: {relativeDirectory: {regex: $pagePath}}
      sort: {fields: relativePath, order: ASC}
    ) {
      edges {
        node {
          name
          ext
          relativeDirectory
          publicURL
          childMarkdownRemark {
            frontmatter {
              title
              language_code
              captions
              modes {
                mode_name
                call_at
              }
            }
          }
        }
      }
    }
  }
`